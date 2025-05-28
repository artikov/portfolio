import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FaSquareUpwork } from "react-icons/fa6";

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
		images: [
			{
				url: "/og-image.png", // Add this later to /public
				width: 1200,
				height: 630,
				alt: "Oybek Artikov - Portfolio",
			},
		],
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
			<body
				className={`${interSans.variable} antialiased max-w-screen-xl mx-auto px-4 sm:px-12 lg:px-32 min-h-screen`}
			>
				<div className="flex flex-col md:flex-row h-screen">
					{/* Sidebar */}
					<aside className="md:flex-1 flex flex-col md:justify-between gap-6 py-12 md:py-24 w-[48%] md:w-full">
						<div className="flex flex-col gap-2 md:gap-6">
							<h1 className="text-4xl font-bold dark:text-white">
								Oybek Artikov
							</h1>
							<h2 className="text-xl font-semibold dark:text-white">
								Frontend Developer
							</h2>
							<p className="text-base text-foreground/80">
								I craft modern, responsive user interfaces with clean code and
								great UX.
							</p>
							<nav className="md:flex flex-col hidden gap-4 my-12 uppercase font-semibold tracking-wide text-foreground/70">
								{["about", "experience", "projects"].map((section) => (
									<a
										key={section}
										href={`#${section}`}
										className="group flex items-center transition-all duration-500"
									>
										{/* Line */}
										<span className="block h-[2px] w-7 group-hover:bg-white group-hover:h-[3px] bg-foreground/70 transition-all duration-500 group-hover:w-14"></span>

										{/* Label */}
										<span className="ml-3 text-foreground/70 group-hover:text-white transition-all duration-500">
											{section.toUpperCase()}
										</span>
									</a>
								))}
							</nav>
						</div>
						<div className="flex gap-4 items-center ">
							<a href="https://github.com/artikov" target="_blank">
								<i className="ri-github-fill text-xl hover:text-white transition-all duration-400"></i>
							</a>
							<a href="https://www.linkedin.com/in/artikov/" target="_blank">
								<i className="ri-linkedin-box-fill text-xl hover:text-white transition-all duration-400"></i>
							</a>
							<a href="https://instagram.com/artikxv" target="_blank">
								<i className="ri-instagram-fill text-xl hover:text-white transition-all duration-400"></i>
							</a>
							<a href="https://x.com/artikov08" target="_blank">
								<i className="ri-twitter-x-fill text-xl hover:text-white transition-all duration-400"></i>
							</a>
							<a
								href="https://www.upwork.com/freelancers/artikov"
								target="_blank"
							>
								<FaSquareUpwork className="text-xl hover:text-white transition-all duration-400" />
							</a>
						</div>
					</aside>

					<main className="md:flex-2 overflow-y-scroll h-screen">
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
