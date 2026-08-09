"use client";

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="min-h-screen max-w-screen-xl mx-auto px-6 py-24 font-sans md:px-12">
			<h1 className="text-5xl font-bold text-headings mb-4">
				Something went wrong
			</h1>
			<p className="text-foreground/70 mb-8">
				That page failed to load. Try again, or head back to the homepage.
			</p>
			<button
				type="button"
				onClick={reset}
				className="rounded bg-accent/10 px-4 py-2 font-semibold text-accent transition-all duration-300 hover:bg-accent/20"
			>
				Try again
			</button>
		</main>
	);
}
