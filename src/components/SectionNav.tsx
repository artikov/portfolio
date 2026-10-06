"use client";

import { useEffect, useState } from "react";
import type { NavSection } from "@/lib/content/schema";

const SectionNav = ({ sections }: { sections: NavSection[] }) => {
	const [active, setActive] = useState(sections[0]?.id ?? "");

	useEffect(() => {
		const elements = sections
			.map(({ id }) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		if (elements.length === 0) return;

		let frame = 0;

		const update = () => {
			frame = 0;
			// The active section is the last one whose top has crossed a reference
			// line 40% down the viewport. This reads absolute geometry every frame
			// rather than reacting to intersection deltas: an IntersectionObserver
			// only reports sections whose visibility *changed*, so a section that
			// stays in view while its neighbour leaves is never in the callback and
			// silently never becomes active -- which is how Experience got skipped
			// on tall viewports.
			const line = window.innerHeight * 0.4;
			let current = elements[0];
			for (const el of elements) {
				if (el.getBoundingClientRect().top <= line) current = el;
			}
			// A short last section (Contact) can't scroll far enough to reach the
			// line on a tall viewport, so at the bottom of the page it wins outright.
			const atBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 2;
			if (atBottom) current = elements[elements.length - 1];
			setActive(current.id);
		};

		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [sections]);

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
