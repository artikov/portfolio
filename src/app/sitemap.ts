import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const { settings } = await getContent();
	const lastModified = new Date();

	return [
		{ url: settings.siteUrl, lastModified, priority: 1 },
		{
			url: new URL("/archive", settings.siteUrl).toString(),
			lastModified,
			priority: 0.8,
		},
	];
}
