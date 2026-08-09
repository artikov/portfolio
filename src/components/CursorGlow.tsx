"use client";

import React from "react";
import { useRef } from "react";

/**
 * Writes the pointer position straight to a CSS custom property. Holding it in
 * React state re-rendered the whole page tree on every mousemove -- up to ~120
 * times a second -- to move one background gradient.
 */
const CursorGlow = ({ children }: { children: React.ReactNode }) => {
	const glowRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const el = glowRef.current;
		if (!el) return;
		// The overlay is `fixed`, so these are viewport coordinates: adding
		// scrollY would drift the glow away from the cursor as the page scrolls.
		el.style.setProperty("--cursor-x", `${e.clientX}px`);
		el.style.setProperty("--cursor-y", `${e.clientY}px`);
	};

	return (
		<div onMouseMove={handleMouseMove} className="relative">
			<div
				ref={glowRef}
				className="pointer-events-none fixed inset-0 z-40 transition duration-300"
				style={{
					background:
						"radial-gradient(600px at var(--cursor-x, -100%) var(--cursor-y, -100%), rgba(29, 78, 116, 0.15), transparent 80%)",
				}}
			></div>
			{children}
		</div>
	);
};

export default CursorGlow;
