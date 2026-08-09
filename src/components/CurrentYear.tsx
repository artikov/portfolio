"use client";

import { useEffect, useState } from "react";

/**
 * The page is statically prerendered, so a `new Date()` in the server tree is
 * frozen at build time and would still read the build year well into the next
 * one. Start from the prerendered value so hydration matches, then correct it
 * on mount.
 */
const CurrentYear = ({ buildYear }: { buildYear: number }) => {
	const [year, setYear] = useState(buildYear);

	useEffect(() => {
		const current = new Date().getFullYear();
		if (current !== buildYear) setYear(current);
	}, [buildYear]);

	return <>{year}</>;
};

export default CurrentYear;
