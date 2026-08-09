import React from "react";
import SectionHeading from "./SectionHeading";
import ExternalLink from "./ExternalLink";

const About = () => {
	return (
		<section
			id="about"
			aria-labelledby="about-heading"
			className="text-foreground/70 scroll-mt-16 mb-16"
		>
			<SectionHeading id="about-heading">About</SectionHeading>
			<p className="mb-2">
				I&apos;m a frontend developer with a strong passion for building
				accessible, pixel-perfect user interfaces that seamlessly bridge design
				and functionality. I specialize in crafting user experiences that are
				not only visually polished but also engineered for speed, scalability,
				and usability. Whether it&apos;s frontend finesse or backend logic, I
				thrive where design meets robust development—turning ideas into
				reliable, elegant solutions.
			</p>
			<p className="mb-2">
				I&apos;m a Frontend Developer at{" "}
				<ExternalLink href="https://gov.uz/en/digital">
					The Ministry of Digital Technologies{" "}
				</ExternalLink>
				, where I focus on building accessible, scalable UI components that
				power digital public services. My work ensures compliance with modern
				web accessibility standards, contributing to a more inclusive user
				experience. In addition to my development role, I actively mentor new
				developers—helping them master frontend fundamentals and grow into
				skilled, confident professionals.
			</p>
			<p className="mb-2">
				In the past, I&apos;ve built websites for various local{" "}
				<ExternalLink href="https://jayxuninvest.uz/">
					companies
				</ExternalLink>{" "}
				and worked at{" "}
				<ExternalLink href="https://www.wematchwell.com/">
					US-based companies
				</ExternalLink>{" "}
				on a wide range of web development projects. I&apos;ve also worked as a
				freelancer on{" "}
				<ExternalLink href="https://www.upwork.com/freelancers/artikov">
					Upwork
				</ExternalLink>
				, delivering high-quality solutions to international{" "}
				<ExternalLink href="https://www.sparkiq.io/">
					clients
				</ExternalLink>
				. Beyond client work, I contribute to
				<ExternalLink href="https://github.com/Fechin/reference">
					{" "}
					open-source
				</ExternalLink>{" "}
				projects and actively share knowledge with the developer community.
			</p>

			<p className="mb-2">
				I&apos;m also the founder of{" "}
				<ExternalLink href="https://artikov.tech">
					Artikov Tech
				</ExternalLink>
				, a development company I currently lead, focused on building impactful
				digital products and mentoring aspiring developers.
			</p>
			<p>
				In my free time, I enjoy reading non-fiction books, going for walks to
				recharge, or unwinding with a few rounds of{" "}
				<span className="group/cs font-bold inline-flex">
					<span className="group-hover/cs:text-headings group-hover/cs:-translate-y-px transform transition-all delay-75 duration-100">
						C
					</span>
					<span className="group-hover/cs:text-yellow-500 group-hover/cs:-translate-y-px transform transition-all duration-300">
						S
					</span>
					<span className="group-hover/cs:text-black group-hover/cs:-translate-y-[3px] transform transition-all duration-500">
						2
					</span>
				</span>{" "}
				with friends.
			</p>
		</section>
	);
};

export default About;
