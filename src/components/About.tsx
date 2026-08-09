import React from "react";
import SectionHeading from "./SectionHeading";
import { renderProse } from "./Prose";

const About = ({ paragraphs }: { paragraphs: string[] }) => {
	return (
		<section
			id="about"
			aria-labelledby="about-heading"
			className="text-foreground/70 scroll-mt-16 mb-16"
		>
			<SectionHeading id="about-heading">About</SectionHeading>
			{paragraphs.map((paragraph, index) => (
				<p
					key={index}
					className={
						index < paragraphs.length - 1 ? "mb-2" : undefined
					}
				>
					{renderProse(paragraph)}
				</p>
			))}
		</section>
	);
};

export default About;
