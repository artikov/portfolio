import React from "react";
import type { IconType } from "react-icons";
import {
	FaSquareGithub,
	FaLinkedin,
	FaSquareInstagram,
	FaSquareXTwitter,
	FaSquareUpwork,
} from "react-icons/fa6";
import type { SocialIcon, SocialLink } from "@/lib/content/schema";

const iconStyles = "text-3xl hover:text-headings transition-all duration-400";

/**
 * A closed map, not a dynamic import: resolving a stored string to a module
 * would defeat tree-shaking and make stored content a code path. Adding a
 * network means adding a line here and a value to `SOCIAL_ICONS`.
 */
const icons: Record<SocialIcon, IconType> = {
	github: FaSquareGithub,
	linkedin: FaLinkedin,
	instagram: FaSquareInstagram,
	x: FaSquareXTwitter,
	upwork: FaSquareUpwork,
};

const SocialLinks = ({ links }: { links: SocialLink[] }) => (
	<ul className="flex gap-4 items-center text-foreground/70">
		{links.map(({ id, label, href, icon }) => {
			const Icon = icons[icon];
			return (
				<li key={id}>
					<a
						href={href}
						target="_blank"
						rel="noreferrer noopener"
						aria-label={label}
					>
						<Icon className={iconStyles} />
					</a>
				</li>
			);
		})}
	</ul>
);

export default SocialLinks;
