import React from "react";

/**
 * Sticky translucent header on mobile; visually hidden but still announced from
 * `md` up, where the sidebar nav carries the same labels. It was previously
 * `md:hidden`, which took the headings out of the accessibility tree entirely
 * and left every <section> unnamed on desktop.
 */
const SectionHeading = ({
	id,
	children,
}: {
	id: string;
	children: React.ReactNode;
}) => (
	<div className="sticky md:sr-only top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur">
		<h2 id={id} className="text-xl uppercase text-headings font-semibold">
			{children}
		</h2>
	</div>
);

export default SectionHeading;
