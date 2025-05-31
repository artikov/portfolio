import React from "react";
import Link from "next/link";

const Footer = () => {
	const linkStyles =
		"text-headings hover:text-accent transition-all duration-300 font-bold";

	return (
		<div>
			<p className="text-sm text-foreground/70 mt-8">
				Built with care and code in{" "}
				<Link href="https://www.nextjs.org" className={linkStyles}>
					Next.js
				</Link>{" "}
				and{" "}
				<Link href="https://www.tailwindcss.com" className={linkStyles}>
					Tailwind CSS
				</Link>
				, this site reflects my passion for clean design and performance.
				Deployed via{" "}
				<Link href="https://www.vercel.com" className={linkStyles}>
					Vercel
				</Link>
				, crafted in{" "}
				<Link href="https://code.visualstudio.com" className={linkStyles}>
					VS Code
				</Link>
				. <br />
				<span className="mt-2 block">
					Always evolving, just like my journey in tech.
				</span>
				<span className="text-accent font-semibold">
					&copy; {new Date().getFullYear()} Oybek Artikov
				</span>
			</p>
		</div>
	);
};

export default Footer;
