"use client";

import { useEffect, useState } from "react";

const sections = [
	{ id: "about", label: "About" },
	{ id: "experience", label: "Experience" },
	{ id: "projects", label: "Projects" },
];

const SectionNav = () => {
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
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible[0]) setActive(visible[0].target.id);
			},
			{ rootMargin: "-45% 0px -45% 0px", threshold: 0 }
		);

		sections.forEach(({ id }) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<nav
			aria-label="Section"
			className="md:flex flex-col hidden gap-4 my-12 uppercase font-semibold tracking-wide text-foreground/70"
		>
			{sections.map(({ id, label }) => {
				const isActive = active === id;
				return (
					<a
						key={id}
						href={`#${id}`}
						aria-current={isActive ? "true" : undefined}
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
							{label.toUpperCase()}
						</span>
					</a>
				);
			})}
		</nav>
	);
};

export default SectionNav;
