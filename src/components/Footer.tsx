import React from "react";
import CurrentYear from "./CurrentYear";
import { renderProse } from "./Prose";
import type { FooterContent } from "@/lib/content/schema";

const Footer = ({ content }: { content: FooterContent }) => {
	return (
		<footer>
			<p className="text-sm text-foreground/70 mt-8">
				{renderProse(content.prose)}
				<br />
				<span className="mt-2 block">{content.tagline}</span>
				<span className="text-accent font-semibold">
					&copy; <CurrentYear buildYear={new Date().getFullYear()} />{" "}
					{content.name}
				</span>
			</p>
		</footer>
	);
};

export default Footer;
