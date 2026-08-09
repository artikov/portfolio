// DEAD CODE. Only the other src/data modules still import this; the site's
// types live in src/lib/content/schema.ts. Deleted at step 25 of
// docs/admin-panel-plan.md.
import type { StaticImageData } from "next/image";

export interface Project {
	id: number;
	title: string;
	description: string;
	tags: string[];
	/** `null` for private work with no public URL -- rendered as plain text. */
	url: string | null;
	image: StaticImageData;
}

/** Archive rows are listed in a table, so they carry no thumbnail. */
export interface ArchivedProject extends Omit<Project, "image"> {
	year: number;
	company: string;
	link: string;
}

export interface Experience {
	id: number;
	title: string;
	company: string;
	years: string;
	description: string;
	tags: string[];
	link: string;
}
