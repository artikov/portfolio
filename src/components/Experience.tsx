import React from "react";
import { experienceData } from "../../data/experience";

const Experience = () => {
	return (
		<section
			id="experience"
			className="text-foreground/70 text-justify scroll-mt-16 "
		>
			<div className="sticky md:hidden top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="md:hidden text-xl uppercase text-white font-semibold">
					Experience
				</h2>
			</div>
			<ol className="flex flex-col group/list transition-all duration-500 ">
				{experienceData.map(
					({ id, title, description, company, years, tags, link }) => (
						<li className="mb-12" key={id}>
							<div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 duration-500">
								<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-white/5 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg lg:group-hover:backdrop-blur-lg duration-500"></div>
								<header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-foreground/90 sm:col-span-2">
									{years}
								</header>
								<div className="z-10 sm:col-span-6">
									<h3 className="font-medium leading-snug text-white">
										<div>
											<a
												className="inline-flex items-baseline font-medium leading-tight text-white hover:text-accent focus-visible:text-accent group/link text-base transition-all duration-500"
												href={link}
												target="_blank"
												rel="noreferrer noopener"
											>
												<span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
												<span>
													{title} @{" "}
													<span className="inline-block">
														{company}
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 20 20"
															fill="currentColor"
															className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
															aria-hidden="true"
														>
															<path
																fill-rule="evenodd"
																d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
																clip-rule="evenodd"
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
					)
				)}
			</ol>
		</section>
	);
};

export default Experience;
