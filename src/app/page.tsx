"use client";

import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { FaSquareUpwork } from "react-icons/fa6";
import { useState, useEffect } from "react";
import OtherItems from "@/components/OtherItems";

const sectionIds = ["about", "experience", "projects"];

export default function Home() {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [active, setActive] = useState("about");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visibleSection = entries.find((entry) => entry.isIntersecting);
				if (visibleSection?.target?.id) {
					setActive(visibleSection.target.id);
				}
			},
			{
				threshold: 0.6, // section 60% visible
			}
		);

		sectionIds.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		setPosition({ x: e.clientX, y: e.clientY + window.scrollY });
	};

	return (
		<div onMouseMove={handleMouseMove} className="relative">
			<div
				className="pointer-events-none fixed inset-0 z-40 transition duration-300 lg:absolute"
				style={{
					background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(29, 78, 116, 0.15), transparent 80%)`,
				}}
			></div>

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
						<a href="https://github.com/artikov" target="_blank">
							<i className="ri-github-fill text-3xl hover:text-headings transition-all duration-400"></i>
						</a>
						<a href="https://www.linkedin.com/in/artikov/" target="_blank">
							<i className="ri-linkedin-box-fill text-3xl hover:text-headings transition-all duration-400"></i>
						</a>
						<a href="https://instagram.com/artikxv" target="_blank">
							<i className="ri-instagram-fill text-3xl hover:text-headings transition-all duration-400"></i>
						</a>
						<a href="https://x.com/artikov08" target="_blank">
							<i className="ri-twitter-x-fill text-3xl hover:text-headings transition-all duration-400"></i>
						</a>
						<a
							href="https://www.upwork.com/freelancers/artikov"
							target="_blank"
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
		</div>
	);
}
