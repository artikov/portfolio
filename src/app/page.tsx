"use client";

import About from "@/components/About";
import Experience from "@/components/Experience";
import { FaSquareUpwork } from "react-icons/fa6";
import { useState } from "react";

export default function Home() {
	const [position, setPosition] = useState({ x: 0, y: 0 });

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
						<h1 className="md:text-5xl text-5xl font-bold dark:text-white">
							Oybek Artikov
						</h1>
						<h2 className="text-xl font-medium dark:text-white">
							Frontend Developer
						</h2>
						<p className="text-base text-foreground/80 max-w-xs">
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
					<div className="flex gap-4 items-center text-foreground/70">
						<a href="https://github.com/artikov" target="_blank">
							<i className="ri-github-fill text-3xl hover:text-white transition-all duration-400"></i>
						</a>
						<a href="https://www.linkedin.com/in/artikov/" target="_blank">
							<i className="ri-linkedin-box-fill text-3xl hover:text-white transition-all duration-400"></i>
						</a>
						<a href="https://instagram.com/artikxv" target="_blank">
							<i className="ri-instagram-fill text-3xl hover:text-white transition-all duration-400"></i>
						</a>
						<a href="https://x.com/artikov08" target="_blank">
							<i className="ri-twitter-x-fill text-3xl hover:text-white transition-all duration-400"></i>
						</a>
						<a
							href="https://www.upwork.com/freelancers/artikov"
							target="_blank"
						>
							<FaSquareUpwork className="text-3xl hover:text-white transition-all duration-400" />
						</a>
					</div>
				</aside>

				<main className="pt-24 lg:w-[52%] lg:py-24">
					<About />
					<Experience />
				</main>
			</div>
		</div>
	);
}
