import React from "react";
import ExternalLink from "./ExternalLink";

/**
 * Renders a stored prose string.
 *
 * Stored prose is plain text with exactly three pieces of markup:
 *
 *   [label](https://example.com)  an external link
 *   **emphasis**                  bold, styled to match an inline link
 *   {cs2}                         the CS2 hover animation in the About section
 *
 * Everything else becomes a React text node, so it is escaped by React and can
 * never introduce markup. This is deliberately **not** `dangerouslySetInnerHTML`
 * and must not become it -- prose is editable content, and editable content is
 * untrusted input. The URL pattern only accepts http(s), which is what keeps
 * `javascript:` out; anything that fails to match is left as literal text.
 */
const TOKEN =
	/\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*\n]+)\*\*|\{cs2\}/g;

/** The hover animation is markup, not prose, so it stays a component. */
const Cs2 = () => (
	<span className="group/cs font-bold inline-flex">
		<span className="group-hover/cs:text-headings group-hover/cs:-translate-y-px transform transition-all delay-75 duration-100">
			C
		</span>
		<span className="group-hover/cs:text-yellow-500 group-hover/cs:-translate-y-px transform transition-all duration-300">
			S
		</span>
		<span className="group-hover/cs:text-black group-hover/cs:-translate-y-[3px] transform transition-all duration-500">
			2
		</span>
	</span>
);

export function renderProse(text: string): React.ReactNode[] {
	const nodes: React.ReactNode[] = [];
	let cursor = 0;
	let key = 0;

	for (const match of text.matchAll(TOKEN)) {
		if (match.index > cursor) nodes.push(text.slice(cursor, match.index));

		const [token, label, href, bold] = match;
		if (label) {
			nodes.push(
				<ExternalLink key={key++} href={href}>
					{label}
				</ExternalLink>
			);
		} else if (bold) {
			nodes.push(
				<strong key={key++} className="font-bold text-headings">
					{bold}
				</strong>
			);
		} else {
			nodes.push(<Cs2 key={key++} />);
		}

		cursor = match.index + token.length;
	}

	if (cursor < text.length) nodes.push(text.slice(cursor));

	return nodes;
}
