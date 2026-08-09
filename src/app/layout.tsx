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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${interSans.variable} antialiased`}>{children}</body>
		</html>
	);
}
