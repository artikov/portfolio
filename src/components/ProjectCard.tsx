import React from "react";
import Image from "next/image";
import { ExternalLinkIcon } from "./icons";
import type { ProjectCardItem } from "@/lib/content/schema";

const ProjectCard = ({
	title,
	description,
	image,
	tags,
	url,
}: ProjectCardItem) => (
	<li className="mb-12">
		<div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 duration-500">
			<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-headings/5 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg lg:group-hover:backdrop-blur-lg duration-500"></div>
			{/* Archive-only records carry no thumbnail, so the whole cell goes. */}
			{image && (
				<header className="z-10 mb-2 mt-1 sm:col-span-2 ">
					<Image
						src={image.url}
						alt={image.alt}
						width={image.width}
						height={image.height}
						sizes="(min-width: 640px) 140px, 100vw"
						className="w-full h-auto border-2 rounded-lg border-transparent group-hover:border-accent/30 transition-all duration-500"
					/>
				</header>
			)}
			<div className="z-10 sm:col-span-6">
				<h3 className="font-medium leading-snug text-headings">
					<div>
						{url ? (
							<a
								className="inline-flex items-baseline font-medium leading-tight text-headings hover:text-accent focus-visible:text-accent group/link text-base transition-all duration-500"
								href={url}
								target="_blank"
								rel="noreferrer noopener"
							>
								<span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
								<span>
									{title}{" "}
									<span className="inline-block">
										<ExternalLinkIcon />
									</span>
								</span>
							</a>
						) : (
							<span className="inline-flex items-baseline font-medium leading-tight text-headings text-base">
								{title}
							</span>
						)}
					</div>
				</h3>
				<p className="mt-2 text-sm leading-normal">{description}</p>
				<ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
					{tags.map((tag) => (
						<li className="mr-1.5 mt-2" key={tag}>
							<div className="flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium leading-5 text-accent	">
								{tag}
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	</li>
);

export default ProjectCard;
