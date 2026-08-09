"use client";

import { useSyncExternalStore } from "react";

/** The year never changes while the page is open, so nothing to subscribe to. */
const subscribe = () => () => {};
const getCurrentYear = () => new Date().getFullYear();

/**
 * The page is statically prerendered, so a `new Date()` in the server tree is
 * frozen at build time and would still read the build year well into the next
 * one. `buildYear` is what the prerendered HTML contains, so hydration matches;
 * the client snapshot then corrects it.
 */
const CurrentYear = ({ buildYear }: { buildYear: number }) => {
	const year = useSyncExternalStore(
		subscribe,
		getCurrentYear,
		() => buildYear
	);

	return <>{year}</>;
};

export default CurrentYear;
