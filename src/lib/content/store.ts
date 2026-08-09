import "server-only";

import { BlobNotFoundError, head, put } from "@vercel/blob";
import { unstable_cache, updateTag } from "next/cache";

import { optionalEnv } from "@/lib/env";
import { parseSiteContent, type SiteContent } from "./schema";
import { SEED_CONTENT } from "./seed";

/**
 * The only place that knows where content is stored. Everything else calls
 * `getContent()`. Swapping Blob for Postgres later is this file and nothing
 * else.
 */

const BLOB_PATHNAME = "content/site.json";
const CACHE_TAG = "site-content";

/**
 * The token is optional on purpose: without it the store serves the seed and
 * refuses writes, which is what lets CI and a fresh clone build with no
 * secrets. In production it must be set -- otherwise the site quietly serves
 * seed content instead of whatever was last saved.
 */
function blobToken(): string | null {
	return optionalEnv("BLOB_READ_WRITE_TOKEN");
}

async function readContent(): Promise<SiteContent> {
	const token = blobToken();
	if (!token) return SEED_CONTENT;

	// `head` throws BlobNotFoundError rather than returning null, and "nothing
	// saved yet" is the normal state before the first admin edit -- not an
	// error. Anything else is: falling back to the seed on a network blip would
	// silently roll the live site back to its pre-admin content.
	let url: string;
	try {
		const blob = await head(BLOB_PATHNAME, { token });
		url = blob.url;
	} catch (error) {
		if (error instanceof BlobNotFoundError) return SEED_CONTENT;
		throw error;
	}

	// Blob URLs are immutable per upload, so this is safe to fetch uncached;
	// `unstable_cache` above is what keeps it off the hot path.
	const response = await fetch(url, { cache: "no-store" });
	if (!response.ok) {
		throw new Error(
			`Failed to read site content: ${response.status} ${response.statusText}`
		);
	}

	return parseSiteContent(await response.json());
}

/**
 * Cached so the public pages stay ISR-cached rather than fetching Blob on every
 * request. `revalidateContent()` is the only thing that busts it.
 */
const getCachedContent = unstable_cache(readContent, ["site-content"], {
	tags: [CACHE_TAG],
});

export async function getContent(): Promise<SiteContent> {
	return getCachedContent();
}

export async function saveContent(content: SiteContent): Promise<void> {
	const token = blobToken();
	if (!token) {
		throw new Error(
			"Cannot save content: BLOB_READ_WRITE_TOKEN is not set. See .env.example."
		);
	}

	// Validate on the way out too: a bad write is what would take the public
	// site down, and it is cheaper to reject here than to serve it.
	const validated = parseSiteContent(content);

	await put(BLOB_PATHNAME, JSON.stringify(validated), {
		access: "public",
		contentType: "application/json",
		addRandomSuffix: false,
		allowOverwrite: true,
		token,
	});
}

/**
 * `updateTag`, not `revalidateTag`: in Next 16 `revalidateTag` takes a
 * `cacheLife` profile and expires lazily, while `updateTag` expires immediately
 * and gives the admin read-your-own-writes. It may only be called from a Server
 * Action, which is where every write lives.
 */
export async function revalidateContent(): Promise<void> {
	updateTag(CACHE_TAG);
}
