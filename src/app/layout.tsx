import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content/store";

const interSans = Inter({
	variable: "--font-inter-sans",
	subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
	const { settings } = await getContent();
	const { seo } = settings;

	return {
		title: seo.title,
		description: seo.description,
		metadataBase: new URL(settings.siteUrl),
		alternates: {
			canonical: "/",
		},
		openGraph: {
			title: seo.ogTitle,
			description: seo.ogDescription,
			url: settings.siteUrl,
			siteName: seo.siteName,
			type: "website",
		},
	};
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const content = await getContent();
	const { profile, settings } = content;

	const personJsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: profile.name,
		url: settings.siteUrl,
		jobTitle: profile.role,
		description: settings.seo.description,
		// Spread, not a null value: schema.org consumers should see no employer
		// claim at all rather than an empty one.
		...(settings.seo.worksFor && {
			worksFor: {
				"@type": "Organization",
				name: settings.seo.worksFor.name,
				url: settings.seo.worksFor.url,
			},
		}),
		// Derived from the social links so the two can never disagree.
		sameAs: content.socials.map((social) => social.href),
	};

	return (
		<html lang="en">
			<body className={`${interSans.variable} antialiased`}>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
				/>
				<a
					href="#content"
					className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface focus:px-4 focus:py-2 focus:text-headings"
				>
					Skip to content
				</a>
				{children}
			</body>
		</html>
	);
}
