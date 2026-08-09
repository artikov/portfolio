import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import CursorGlow from "@/components/CursorGlow";
import { archiveProjects } from "@/lib/content/schema";
import { getContent } from "@/lib/content/store";

export async function generateMetadata(): Promise<Metadata> {
	const { settings } = await getContent();

	return {
		title: settings.seo.archiveTitle,
		description: settings.seo.archiveDescription,
		alternates: { canonical: "/archive" },
	};
}

const ArchivePage = async () => {
	const content = await getContent();

	return (
		<CursorGlow>
			<div className="min-h-screen max-w-screen-xl mx-auto px-6 py-12 font-sans md:px-12 md:py-16 ">
				<Link
					href="/"
					className="group mb-2 inline-flex items-center font-semibold leading-tight text-accent"
				>
					<ArrowRightIcon className="mr-1 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-2" />
					{content.profile.name}
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
							{archiveProjects(content).map(
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
											{url ? (
												<a
													href={url}
													target="_blank"
													rel="noopener noreferrer"
													className="hover:underline hover:text-accent text-xs transition-all duration-200"
												>
													{link} ↗
												</a>
											) : (
												<span className="text-xs text-foreground/70">
													{link}
												</span>
											)}
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</div>
			</div>
		</CursorGlow>
	);
};

export default ArchivePage;
