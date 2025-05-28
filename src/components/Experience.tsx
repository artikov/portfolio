import React from "react";

const Experience = () => {
	return (
		<section
			id="experience"
			className="text-foreground/70 text-justify scroll-mt-16 "
		>
			<div className="sticky md:hidden top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="md:hidden text-xl uppercase text-white ">Experience</h2>
			</div>
			<div className="display flex items-center gap-2">
				<div className="flex-1">
					<p>2024 -- Present</p>
				</div>
				<div className="flex-3">
					<h3>Title</h3>
					<p>
						Description - Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Dolorem ducimus tempore fugit repellat explicabo
						necessitatibus voluptates eius modi! Ex, alias!
					</p>
					<div>
						<span>HTML</span>
						<span>CSS</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Experience;
