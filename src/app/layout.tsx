import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interSans = Inter({
	variable: "--font-inter-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Oybek Artikov - Frontend Developer",
	description:
		"I build pixel-perfect, responsive, and accessible web experiences.",
	metadataBase: new URL("https://artikov.tech"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Oybek Artikov - Frontend Developer",
		description: "Portfolio site showcasing work, experience, and projects.",
		url: "https://artikov.tech",
		siteName: "artikov.tech",
		type: "website",
	},
	icons: {
		icon: "/favicon.ico",
	},
};

const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Oybek Artikov",
	url: "https://artikov.tech",
	jobTitle: "Frontend Developer",
	description:
		"I build pixel-perfect, responsive, and accessible web experiences.",
	worksFor: {
		"@type": "Organization",
		name: "The Ministry of Digital Technologies",
		url: "https://gov.uz/en/digital",
	},
	sameAs: [
		"https://github.com/artikov",
		"https://www.linkedin.com/in/artikov/",
		"https://x.com/artikov08",
		"https://instagram.com/artikxv",
		"https://www.upwork.com/freelancers/artikov",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${interSans.variable} antialiased`}>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
				/>
				{children}
			</body>
		</html>
	);
}
