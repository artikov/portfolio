import React from "react";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import type { WritingSection } from "@/lib/content/schema";

const OtherItems = ({ writing }: { writing: WritingSection }) => {
	return (
		<section
			id="writing"
			aria-labelledby="writing-heading"
			className="text-foreground/70 scroll-mt-16 mb-16"
		>
			<SectionHeading id="writing-heading">
				{writing.heading}
			</SectionHeading>

			<p className="mb-8">{writing.intro}</p>

			<ol className="flex flex-col group/list transition-all duration-500 ">
				{writing.items.map((item) => (
					<ProjectCard key={item.id} {...item} />
				))}
			</ol>
		</section>
	);
};

export default OtherItems;
