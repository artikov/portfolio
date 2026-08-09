import React from "react";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import { otherItemsData } from "@/data/projects";

const OtherItems = () => {
	return (
		<section
			id="writing"
			aria-labelledby="writing-heading"
			className="text-foreground/70 scroll-mt-16 mb-16"
		>
			<SectionHeading id="writing-heading">Writing</SectionHeading>

			<p className="mb-8">
				Visit my blog for more insights and tutorials.
			</p>

			<ol className="flex flex-col group/list transition-all duration-500 ">
				{otherItemsData.map((item) => (
					<ProjectCard key={item.id} {...item} />
				))}
			</ol>
		</section>
	);
};

export default OtherItems;
