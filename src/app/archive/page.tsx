"use client";

import React from "react";
import Link from "next/link";
import { archivedProjectsData } from "../../../data/projects";
import { useState } from "react";

const ArchivePage = () => {
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
			<div className="min-h-screen max-w-screen-xl mx-auto px-6 py-12 font-sans md:px-12 md:py-16 ">
				<Link
					href="/"
					className="group mb-2 inline-flex items-center font-semibold leading-tight text-accent"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="mr-1 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-2"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
							clipRule="evenodd"
						></path>
					</svg>
					Oybek Artikov
				</Link>
				<h1 className="text-5xl font-bold mt-4 mb-8">All Projects</h1>
				<div className="overflow-x-auto">
					<table className="w-full text-left text-foreground">
						<thead className="text-headings font-semibold uppercase tracking-wider text-xs h-12">
							<tr>
								<th className="pr-4">Year</th>
								<th className="pr-4">Project</th>
								<th className="pr-4 hidden md:table-cell">Made at</th>
								<th className="pr-4">Built with</th>
								<th className="pr-4">Link</th>
							</tr>
						</thead>
						<tbody className="">
							{archivedProjectsData.map(
								({ id, title, tags, url, year, company, link }) => (
									<tr key={id} className="border-t border-foreground/20 h-16">
										<td className="pr-4 text-sm">{year}</td>
										<td className="pr-4 font-semibold text-headings">
											{title}
										</td>
										<td className="pr-4 hidden md:table-cell">{company}</td>
										<td className="flex flex-wrap gap-2 py-4">
											{tags.map((t) => (
												<span
													key={t}
													className="text-sm rounded-lg bg-accent/10 text-accent px-2 py-1 font-medium"
												>
													{t}
												</span>
											))}
										</td>
										<td className="pr-4">
											<Link
												href={url}
												target="_blank"
												rel="noopener noreferrer"
												className="hover:underline hover:text-accent text-xs transition-all duration-200"
											>
												{link} ↗
											</Link>
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ArchivePage;
