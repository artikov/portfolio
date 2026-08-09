"use client";

import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import {
	FaSquareGithub,
	FaLinkedin,
	FaSquareInstagram,
	FaSquareXTwitter,
	FaSquareUpwork,
} from "react-icons/fa6";
import { useState, useEffect } from "react";
import OtherItems from "@/components/OtherItems";

const sectionIds = ["about", "experience", "projects"];

export default function Home() {
	const [active, setActive] = useState("about");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				// A thin band across the middle of the viewport: a section counts as
				// active once it crosses it, regardless of how tall the section is.
				// `isIntersecting` alone is not a threshold test, and `entries` only
				// carries sections whose visibility changed -- so pick the topmost one
				// by position rather than trusting document order.
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort(
						(a, b) => a.boundingClientRect.top - b.boundingClientRect.top
					);
				if (visible[0]) setActive(visible[0].target.id);
			},
			{ rootMargin: "-45% 0px -45% 0px", threshold: 0 }
		);

		sectionIds.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<CursorGlow>
			<div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0 md:flex">
				{/* Sidebar */}
				<aside className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
					<div className="flex flex-col gap-2 md:gap-4">
						<h1 className="md:text-5xl text-5xl font-bold dark:text-headings">
							Oybek Artikov
						</h1>
						<h2 className="text-xl font-medium dark:text-headings">
							Frontend Developer
						</h2>
						<p className="text-base text-foreground/80 max-w-xs">
							I craft modern, responsive user interfaces with clean code and
							great UX.
						</p>
						<nav className="md:flex flex-col hidden gap-4 my-12 uppercase font-semibold tracking-wide text-foreground/70">
							{sectionIds.map((section) => {
								const isActive = active === section;
								return (
									<a
										key={section}
										href={`#${section}`}
										className="group flex items-center transition-all duration-500"
									>
										{/* Line */}
										<span
											className={`block h-[2px] transition-all duration-500 ${
												isActive
													? "w-14 bg-headings h-[3px]"
													: "w-7 bg-foreground/70 group-hover:w-14 group-hover:bg-headings group-hover:h-[3px]"
											}`}
										></span>
										{/* Label */}
										<span
											className={`ml-3 transition-all duration-500 ${
												isActive
													? "text-headings"
													: "text-foreground/70 group-hover:text-headings"
											}`}
										>
											{section.toUpperCase()}
										</span>
									</a>
								);
							})}
						</nav>
					</div>
					<div className="flex gap-4 items-center text-foreground/70">
						<a
							href="https://github.com/artikov"
							target="_blank"
							rel="noreferrer noopener"
							aria-label="GitHub"
						>
							<FaSquareGithub className="text-3xl hover:text-headings transition-all duration-400" />
						</a>
						<a
							href="https://www.linkedin.com/in/artikov/"
							target="_blank"
							rel="noreferrer noopener"
							aria-label="LinkedIn"
						>
							<FaLinkedin className="text-3xl hover:text-headings transition-all duration-400" />
						</a>
						<a
							href="https://instagram.com/artikxv"
							target="_blank"
							rel="noreferrer noopener"
							aria-label="Instagram"
						>
							<FaSquareInstagram className="text-3xl hover:text-headings transition-all duration-400" />
						</a>
						<a
							href="https://x.com/artikov08"
							target="_blank"
							rel="noreferrer noopener"
							aria-label="X (formerly Twitter)"
						>
							<FaSquareXTwitter className="text-3xl hover:text-headings transition-all duration-400" />
						</a>
						<a
							href="https://www.upwork.com/freelancers/artikov"
							target="_blank"
							rel="noreferrer noopener"
							aria-label="Upwork"
						>
							<FaSquareUpwork className="text-3xl hover:text-headings transition-all duration-400" />
						</a>
					</div>
				</aside>

				<main className="pt-24 lg:w-[52%] lg:py-24">
					<About />
					<Experience />
					<Projects />
					<OtherItems />
					<Footer />
				</main>
			</div>
		</CursorGlow>
	);
}
