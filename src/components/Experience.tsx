import React from "react";
import SectionHeading from "./SectionHeading";
import { ExternalLinkIcon } from "./icons";
import type { ExperienceItem } from "@/lib/content/schema";

const Experience = ({
	items,
	resumeUrl,
}: {
	items: ExperienceItem[];
	resumeUrl: string;
}) => {
	return (
		<section
			id="experience"
			aria-labelledby="experience-heading"
			className="text-foreground/70 scroll-mt-16 mb-16"
		>
			<SectionHeading id="experience-heading">Experience</SectionHeading>
			<ol className="flex flex-col group/list transition-all duration-500 ">
				{items.map(
					({ id, title, description, company, years, tags, link }) => (
						<li className="mb-12" key={id}>
							<div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 duration-500">
								<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-headings/5 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg lg:group-hover:backdrop-blur-lg duration-500"></div>
								<header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-foreground/90 sm:col-span-2">
									{years}
								</header>
								<div className="z-10 sm:col-span-6">
									<h3 className="font-medium leading-snug text-headings">
										<div>
											{link ? (
												<a
													className="inline-flex items-baseline font-medium leading-tight text-headings hover:text-accent focus-visible:text-accent group/link text-base transition-all duration-500"
													href={link}
													target="_blank"
													rel="noreferrer noopener"
												>
													<span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
													<span>
														{title} @{" "}
														<span className="inline-block">
															{company}
															<ExternalLinkIcon />
														</span>
													</span>
												</a>
											) : (
												<span className="inline-flex items-baseline font-medium leading-tight text-headings text-base">
													<span>
														{title} @{" "}
														<span className="inline-block">
															{company}
														</span>
													</span>
												</span>
											)}
										</div>
									</h3>
									<p className="mt-2 text-sm leading-normal">
										{description}
									</p>
									<ul
										className="mt-2 flex flex-wrap"
										aria-label="Technologies used"
									>
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
					)
				)}
			</ol>
			<h3 className="font-medium leading-snug text-headings">
				<div>
					<a
						className="inline-flex items-baseline font-medium leading-tight text-headings hover:text-accent focus-visible:text-accent group/link text-base transition-all duration-500"
						href={resumeUrl}
						target="_blank"
						rel="noreferrer noopener"
					>
						<span>
							View full resume
							<span className="inline-block">
								<ExternalLinkIcon />
							</span>
						</span>
					</a>
				</div>
			</h3>
		</section>
	);
};

export default Experience;
