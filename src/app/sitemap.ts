import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();

	return [
		{ url: "https://artikov.tech", lastModified, priority: 1 },
		{ url: "https://artikov.tech/archive", lastModified, priority: 0.8 },
	];
}
