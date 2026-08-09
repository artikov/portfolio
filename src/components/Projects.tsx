import React from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import { ArrowRightIcon } from "./icons";
import type { Project } from "@/lib/content/schema";

const Projects = ({ projects }: { projects: Project[] }) => {
	return (
		<section
			id="projects"
			aria-labelledby="projects-heading"
			className="text-foreground/70 scroll-mt-16 mb-16"
		>
			<SectionHeading id="projects-heading">Projects</SectionHeading>

			<div>
				<ol className="flex flex-col group/list transition-all duration-500 ">
					{projects.map((project) => (
						<ProjectCard key={project.id} {...project} />
					))}
				</ol>
				<h3 className="font-medium leading-snug text-headings">
					<Link
						className="inline-flex items-center leading-tight text-headings font-medium group"
						aria-label="View Full Project Archive"
						href="/archive"
					>
						<span>
							<span className="border-b border-transparent pb-px transition group-hover:border-accent motion-reduce:transition-none">
								View Full Project{" "}
							</span>
							<span className="text-headings space-nowrap">
								<span className="border-b border-transparent pb-px transition group-hover:border-accent motion-reduce:transition-none">
									Archive
								</span>
								<ArrowRightIcon className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
							</span>
						</span>
					</Link>
				</h3>
			</div>
		</section>
	);
};

export default Projects;
