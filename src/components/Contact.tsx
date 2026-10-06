import React from "react";
import SectionHeading from "./SectionHeading";
import { ExternalLinkIcon } from "./icons";
import type { ContactContent } from "@/lib/content/schema";

const linkClass =
	"inline-flex items-baseline font-medium leading-tight text-headings hover:text-accent focus-visible:text-accent text-base transition-all duration-500";

const Contact = ({ content }: { content: ContactContent }) => {
	const rows = [
		{
			label: "Email",
			value: content.email,
			href: `mailto:${content.email}`,
			external: false,
		},
		{
			label: "Telegram",
			value: `@${content.telegram}`,
			href: `https://t.me/${content.telegram}`,
			external: true,
		},
	];

	return (
		<section
			id="contact"
			aria-labelledby="contact-heading"
			className="text-foreground/70 scroll-mt-16 mb-16"
		>
			<SectionHeading id="contact-heading">Contact</SectionHeading>

			<p className="mb-8">{content.intro}</p>

			<dl className="flex flex-col gap-4">
				{rows.map(({ label, value, href, external }) => (
					<div
						key={label}
						className="grid sm:grid-cols-8 sm:gap-8 md:gap-4"
					>
						<dt className="mb-1 mt-1 text-xs font-semibold uppercase tracking-wide text-foreground/90 sm:col-span-2">
							{label}
						</dt>
						<dd className="sm:col-span-6">
							{external ? (
								<a
									className={linkClass}
									href={href}
									target="_blank"
									rel="noreferrer noopener"
								>
									<span>
										{value}
										<span className="inline-block">
											<ExternalLinkIcon />
										</span>
									</span>
								</a>
							) : (
								<a className={linkClass} href={href}>
									{value}
								</a>
							)}
						</dd>
					</div>
				))}
			</dl>
		</section>
	);
};

export default Contact;
