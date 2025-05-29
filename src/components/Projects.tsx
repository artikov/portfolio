import React from "react";
import Link from "next/link";
import { projectsData } from "../../data/projects";

const Projects = () => {
	return (
		<section
			id="about"
			className="text-foreground/70 text-justify scroll-mt-16 mb-16"
		>
			<div className="sticky md:hidden top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="md:hidden text-xl uppercase text-white font-semibold">
					Projects
				</h2>
			</div>

			<div>
				<ol className="flex flex-col group/list transition-all duration-500 ">
					{projectsData.map(({ id, title, description, image, tags, url }) => (
						<li className="mb-12" key={id}>
							<div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 duration-500">
								<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-white/5 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg lg:group-hover:backdrop-blur-lg duration-500"></div>
								<header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-foreground/90 sm:col-span-2">
									{image}
								</header>
								<div className="z-10 sm:col-span-6">
									<h3 className="font-medium leading-snug text-white">
										<div>
											<a
												className="inline-flex items-baseline font-medium leading-tight text-white hover:text-accent focus-visible:text-accent group/link text-base transition-all duration-500"
												href={url}
												target="_blank"
												rel="noreferrer noopener"
											>
												<span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
												<span>
													{title}{" "}
													<span className="inline-block">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 20 20"
															fill="currentColor"
															className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
															aria-hidden="true"
														>
															<path
																fillRule="evenodd"
																d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
																clipRule="evenodd"
															></path>
														</svg>
													</span>
												</span>
											</a>
										</div>
									</h3>
									<p className="mt-2 text-sm leading-normal">{description}</p>
									<ul
										className="mt-2 flex flex-wrap"
										aria-label="Technologies used"
									>
										{tags.map((tag, index) => (
											<li className="mr-1.5 mt-2" key={index}>
												<div className="flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium leading-5 text-accent	">
													{tag}
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>
						</li>
					))}
				</ol>
				<h3 className="font-medium leading-snug text-white">
					<Link
						className="inline-flex items-center leading-tight text-slate-200 font-medium group"
						aria-label="View Full Project Archive"
						href="/archive"
					>
						<span>
							<span className="border-b border-transparent pb-px transition group-hover:border-accent motion-reduce:transition-none">
								View Full Project{" "}
							</span>
							<span className="whitespace-nowrap">
								<span className="border-b border-transparent pb-px transition group-hover:border-accent motion-reduce:transition-none">
									Archive
								</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
										clipRule="evenodd"
									></path>
								</svg>
							</span>
						</span>
					</Link>
				</h3>
			</div>
		</section>
	);
};

export default Projects;
