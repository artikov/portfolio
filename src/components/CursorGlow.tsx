"use client";

import React from "react";
import { useState } from "react";

const CursorGlow = ({ children }: { children: React.ReactNode }) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		setPosition({ x: e.clientX, y: e.clientY });
	};

	return (
		<div onMouseMove={handleMouseMove} className="relative">
			<div
				className="pointer-events-none fixed inset-0 z-40 transition duration-300"
				style={{
					background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(29, 78, 116, 0.15), transparent 80%)`,
				}}
			></div>
			{children}
		</div>
	);
};

export default CursorGlow;
