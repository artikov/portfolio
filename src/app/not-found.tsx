import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
	return (
		<main className="min-h-screen max-w-screen-xl mx-auto px-6 py-24 font-sans md:px-12">
			<h1 className="text-5xl font-bold text-headings mb-4">Page not found</h1>
			<p className="text-foreground/70 mb-8">
				That page doesn&apos;t exist. It may have moved, or the link may be
				wrong.
			</p>
			<Link
				href="/"
				className="group inline-flex items-center font-semibold leading-tight text-accent"
			>
				<ArrowRightIcon className="mr-1 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-2" />
				Back to homepage
			</Link>
		</main>
	);
}
