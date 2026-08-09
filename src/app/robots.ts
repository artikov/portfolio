import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content/store";

export default async function robots(): Promise<MetadataRoute.Robots> {
	const { settings } = await getContent();

	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: new URL("/sitemap.xml", settings.siteUrl).toString(),
	};
}
