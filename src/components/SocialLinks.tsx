import React from "react";
import {
	FaSquareGithub,
	FaLinkedin,
	FaSquareInstagram,
	FaSquareXTwitter,
	FaSquareUpwork,
} from "react-icons/fa6";

const iconStyles = "text-3xl hover:text-headings transition-all duration-400";

const links = [
	{ label: "GitHub", href: "https://github.com/artikov", Icon: FaSquareGithub },
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/artikov/",
		Icon: FaLinkedin,
	},
	{
		label: "Instagram",
		href: "https://instagram.com/artikxv",
		Icon: FaSquareInstagram,
	},
	{
		label: "X (formerly Twitter)",
		href: "https://x.com/artikov08",
		Icon: FaSquareXTwitter,
	},
	{
		label: "Upwork",
		href: "https://www.upwork.com/freelancers/artikov",
		Icon: FaSquareUpwork,
	},
];

const SocialLinks = () => (
	<ul className="flex gap-4 items-center text-foreground/70">
		{links.map(({ label, href, Icon }) => (
			<li key={label}>
				<a
					href={href}
					target="_blank"
					rel="noreferrer noopener"
					aria-label={label}
				>
					<Icon className={iconStyles} />
				</a>
			</li>
		))}
	</ul>
);

export default SocialLinks;
