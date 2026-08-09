import React from "react";
import { inlineLinkStyles } from "@/lib/styles";

/** Inline prose link to another site: always a new tab, never `next/link`. */
const ExternalLink = ({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) => (
	<a
		href={href}
		target="_blank"
		rel="noreferrer noopener"
		className={inlineLinkStyles}
	>
		{children}
	</a>
);

export default ExternalLink;
