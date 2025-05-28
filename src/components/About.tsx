import React from "react";

const About = () => {
	const linkStyles =
		"text-white hover:text-accent transition-all duration-300 font-bold";
	return (
		<section className="text-foreground/70 text-justify scroll-mt-16 ">
			<div className="sticky md:hidden top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="md:hidden text-xl uppercase text-white ">About</h2>
			</div>
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
				<a href="https://gov.uz/en/digital" className={linkStyles}>
					The Ministry of Digital Technologies{" "}
				</a>
				, where I focus on building accessible, scalable UI components that
				power digital public services. My work ensures compliance with modern
				web accessibility standards, contributing to a more inclusive user
				experience. In addition to my development role, I actively mentor new
				developers—helping them master frontend fundamentals and grow into
				skilled, confident professionals.
			</p>
			<p className="mb-2">
				In the past, I&apos;ve built websites for various local{" "}
				<a href="https://jayxuninvest.uz/" className={linkStyles}>
					companies
				</a>{" "}
				and worked at{" "}
				<a href="https://www.wematchwell.com/" className={linkStyles}>
					US-based companies
				</a>{" "}
				on a wide range of web development projects. I&apos;ve also worked as a
				freelancer on{" "}
				<a
					href="https://www.upwork.com/freelancers/artikov"
					className={linkStyles}
				>
					Upwork
				</a>
				, delivering high-quality solutions to international{" "}
				<a href="https://www.sparkiq.io/" className={linkStyles}>
					clients
				</a>
				. Beyond client work, I contribute to
				<a href="https://github.com/Fechin/reference" className={linkStyles}>
					{" "}
					open-source
				</a>{" "}
				projects and actively share knowledge with the developer community.
			</p>

			<p className="mb-2">
				I&apos;m also the founder of{" "}
				<a href="https://artikov.tech" className={linkStyles}>
					Artikov Tech
				</a>
				, a development company I currently lead, focused on building impactful
				digital products and mentoring aspiring developers.
			</p>
			<p>
				In my free time, I enjoy reading non-fiction books, going for walks to
				recharge, or unwinding with a few rounds of{" "}
				<span className="group/cs font-bold inline-flex">
					<span className="group-hover/cs:text-white group-hover/cs:-translate-y-px transform transition-all delay-75 duration-100">
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
