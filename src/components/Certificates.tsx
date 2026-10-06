import React from "react";
import SectionHeading from "./SectionHeading";
import { ExternalLinkIcon } from "./icons";
import type { Certificate } from "@/lib/content/schema";

const Certificates = ({ items }: { items: Certificate[] }) => {
	return (
		<section
			id="certificates"
			aria-labelledby="certificates-heading"
			className="text-foreground/70 scroll-mt-16 mb-16"
		>
			<SectionHeading id="certificates-heading">Certificates</SectionHeading>
			<ol className="flex flex-col group/list transition-all duration-500 ">
				{items.map(({ id, title, issuer, url }) => (
					<li className="mb-8" key={id}>
						<div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 duration-500">
							<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-headings/5 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg lg:group-hover:backdrop-blur-lg duration-500"></div>
							<header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-foreground/90 sm:col-span-2">
								{issuer}
							</header>
							<h3 className="z-10 font-medium leading-snug text-headings sm:col-span-6">
								{url ? (
									<a
										className="inline-flex items-baseline font-medium leading-tight text-headings hover:text-accent focus-visible:text-accent group/link text-base transition-all duration-500"
										href={url}
										target="_blank"
										rel="noreferrer noopener"
									>
										<span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
										<span>
											{title}
											<span className="inline-block">
												<ExternalLinkIcon />
											</span>
										</span>
									</a>
								) : (
									<span className="text-base leading-tight">{title}</span>
								)}
							</h3>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
};

export default Certificates;
