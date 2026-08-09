import React from "react";
import CurrentYear from "./CurrentYear";
import ExternalLink from "./ExternalLink";

const Footer = () => {
	return (
		<footer>
			<p className="text-sm text-foreground/70 mt-8">
				Built with care and code in{" "}
				<ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{" "}
				<ExternalLink href="https://tailwindcss.com">Tailwind CSS</ExternalLink>
				, this site reflects my passion for clean design and performance.
				Deployed via{" "}
				<ExternalLink href="https://vercel.com">Vercel</ExternalLink>, crafted
				in{" "}
				<ExternalLink href="https://code.visualstudio.com">
					VS Code
				</ExternalLink>
				. <br />
				<span className="mt-2 block">
					Always evolving, just like my journey in tech.
				</span>
				<span className="text-accent font-semibold">
					&copy; <CurrentYear buildYear={new Date().getFullYear()} /> Oybek
					Artikov
				</span>
			</p>
		</footer>
	);
};

export default Footer;
