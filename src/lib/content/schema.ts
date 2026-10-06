/**
 * The shape of the single content document, plus a validator for it.
 *
 * `parseSiteContent` exists because the document is fetched from Blob storage
 * at runtime: it is JSON from outside the type system and must be checked
 * before the public site renders it. The checks are hand-rolled -- the shapes
 * are shallow and a validation library would be a new runtime dependency for
 * what amounts to a dozen field checks.
 */

export interface ContentImage {
	url: string;
	width: number;
	height: number;
	alt: string;
}

/** The fields the shared project card renders. */
export interface ProjectCardItem {
	id: string;
	title: string;
	description: string;
	tags: string[];
	/** `null` for private work with no public URL -- rendered as plain text. */
	url: string | null;
	image: ContentImage | null;
}

/**
 * Homepage projects and archive rows were two hand-synchronised lists that
 * duplicated title/description/tags for six projects verbatim. They are one
 * record now, with a flag and an order per surface -- the two surfaces sort the
 * same six projects differently, so one shared `order` would not reproduce
 * them.
 */
export interface Project extends ProjectCardItem {
	year: number;
	company: string;
	/** Label shown in the archive's Link column, e.g. `artikov.tech`. */
	link: string;
	onHomepage: boolean;
	homepageOrder: number;
	inArchive: boolean;
	archiveOrder: number;
}

export interface ExperienceItem {
	id: string;
	title: string;
	company: string;
	years: string;
	description: string;
	tags: string[];
	/** Null for employers with no public URL -- renders as plain text. */
	link: string | null;
}

/**
 * Icons are a closed set of components already imported by `SocialLinks`.
 * Storing a component name to resolve dynamically would defeat tree-shaking and
 * turn stored content into a code path.
 */
export const SOCIAL_ICONS = [
	"github",
	"linkedin",
	"instagram",
	"x",
	"upwork",
] as const;

export type SocialIcon = (typeof SOCIAL_ICONS)[number];

export interface SocialLink {
	id: string;
	label: string;
	href: string;
	icon: SocialIcon;
}

export interface NavSection {
	id: string;
	label: string;
}

export interface Profile {
	name: string;
	role: string;
	tagline: string;
}

export interface Seo {
	title: string;
	description: string;
	ogTitle: string;
	ogDescription: string;
	siteName: string;
	archiveTitle: string;
	archiveDescription: string;
	/** Null when there is no employer to publish -- the field is then omitted
	 * from the Person JSON-LD rather than emitted empty. */
	worksFor: { name: string; url: string } | null;
}

export interface Settings {
	siteUrl: string;
	resumeUrl: string;
	seo: Seo;
}

export interface WritingSection {
	heading: string;
	intro: string;
	items: ProjectCardItem[];
}

export interface Certificate {
	id: string;
	title: string;
	issuer: string;
	/** Null when there is no public credential URL -- renders as plain text. */
	url: string | null;
}

export interface FooterContent {
	prose: string;
	tagline: string;
	name: string;
}

export interface SiteContent {
	/** Bumped on every save; the basis of optimistic concurrency in step 10. */
	version: number;
	updatedAt: string;
	profile: Profile;
	about: { paragraphs: string[] };
	experience: ExperienceItem[];
	projects: Project[];
	writing: WritingSection;
	certificates: Certificate[];
	socials: SocialLink[];
	nav: NavSection[];
	footer: FooterContent;
	settings: Settings;
}

export class ContentValidationError extends Error {
	constructor(path: string, message: string) {
		super(`${path} ${message}`);
		this.name = "ContentValidationError";
	}
}

function asRecord(value: unknown, path: string): Record<string, unknown> {
	if (typeof value !== "object" || value === null || Array.isArray(value)) {
		throw new ContentValidationError(path, "must be an object");
	}
	return value as Record<string, unknown>;
}

function asString(value: unknown, path: string): string {
	if (typeof value !== "string") {
		throw new ContentValidationError(path, "must be a string");
	}
	return value;
}

function asNullableString(value: unknown, path: string): string | null {
	return value === null ? null : asString(value, path);
}

function asNumber(value: unknown, path: string): number {
	if (typeof value !== "number" || !Number.isFinite(value)) {
		throw new ContentValidationError(path, "must be a finite number");
	}
	return value;
}

function asBoolean(value: unknown, path: string): boolean {
	if (typeof value !== "boolean") {
		throw new ContentValidationError(path, "must be a boolean");
	}
	return value;
}

function asArray<T>(
	value: unknown,
	path: string,
	item: (value: unknown, path: string) => T
): T[] {
	if (!Array.isArray(value)) {
		throw new ContentValidationError(path, "must be an array");
	}
	return value.map((entry, i) => item(entry, `${path}[${i}]`));
}

function asStringArray(value: unknown, path: string): string[] {
	return asArray(value, path, asString);
}

function parseImage(value: unknown, path: string): ContentImage | null {
	if (value === null) return null;
	const image = asRecord(value, path);
	return {
		url: asString(image.url, `${path}.url`),
		width: asNumber(image.width, `${path}.width`),
		height: asNumber(image.height, `${path}.height`),
		alt: asString(image.alt, `${path}.alt`),
	};
}

function parseCardItem(value: unknown, path: string): ProjectCardItem {
	const item = asRecord(value, path);
	return {
		id: asString(item.id, `${path}.id`),
		title: asString(item.title, `${path}.title`),
		description: asString(item.description, `${path}.description`),
		tags: asStringArray(item.tags, `${path}.tags`),
		url: asNullableString(item.url, `${path}.url`),
		image: parseImage(item.image, `${path}.image`),
	};
}

function parseProject(value: unknown, path: string): Project {
	const project = asRecord(value, path);
	return {
		...parseCardItem(value, path),
		year: asNumber(project.year, `${path}.year`),
		company: asString(project.company, `${path}.company`),
		link: asString(project.link, `${path}.link`),
		onHomepage: asBoolean(project.onHomepage, `${path}.onHomepage`),
		homepageOrder: asNumber(project.homepageOrder, `${path}.homepageOrder`),
		inArchive: asBoolean(project.inArchive, `${path}.inArchive`),
		archiveOrder: asNumber(project.archiveOrder, `${path}.archiveOrder`),
	};
}

function parseExperience(value: unknown, path: string): ExperienceItem {
	const item = asRecord(value, path);
	return {
		id: asString(item.id, `${path}.id`),
		title: asString(item.title, `${path}.title`),
		company: asString(item.company, `${path}.company`),
		years: asString(item.years, `${path}.years`),
		description: asString(item.description, `${path}.description`),
		tags: asStringArray(item.tags, `${path}.tags`),
		link: asNullableString(item.link, `${path}.link`),
	};
}

function parseCertificate(value: unknown, path: string): Certificate {
	const item = asRecord(value, path);
	return {
		id: asString(item.id, `${path}.id`),
		title: asString(item.title, `${path}.title`),
		issuer: asString(item.issuer, `${path}.issuer`),
		url: asNullableString(item.url, `${path}.url`),
	};
}

function parseSocial(value: unknown, path: string): SocialLink {
	const item = asRecord(value, path);
	const icon = asString(item.icon, `${path}.icon`);
	if (!(SOCIAL_ICONS as readonly string[]).includes(icon)) {
		throw new ContentValidationError(
			`${path}.icon`,
			`must be one of ${SOCIAL_ICONS.join(", ")}`
		);
	}
	return {
		id: asString(item.id, `${path}.id`),
		label: asString(item.label, `${path}.label`),
		href: asString(item.href, `${path}.href`),
		icon: icon as SocialIcon,
	};
}

function parseNavSection(value: unknown, path: string): NavSection {
	const item = asRecord(value, path);
	return {
		id: asString(item.id, `${path}.id`),
		label: asString(item.label, `${path}.label`),
	};
}

function parseSettings(value: unknown, path: string): Settings {
	const settings = asRecord(value, path);
	const seo = asRecord(settings.seo, `${path}.seo`);
	const worksFor =
		seo.worksFor === null
			? null
			: asRecord(seo.worksFor, `${path}.seo.worksFor`);
	return {
		siteUrl: asString(settings.siteUrl, `${path}.siteUrl`),
		resumeUrl: asString(settings.resumeUrl, `${path}.resumeUrl`),
		seo: {
			title: asString(seo.title, `${path}.seo.title`),
			description: asString(seo.description, `${path}.seo.description`),
			ogTitle: asString(seo.ogTitle, `${path}.seo.ogTitle`),
			ogDescription: asString(
				seo.ogDescription,
				`${path}.seo.ogDescription`
			),
			siteName: asString(seo.siteName, `${path}.seo.siteName`),
			archiveTitle: asString(
				seo.archiveTitle,
				`${path}.seo.archiveTitle`
			),
			archiveDescription: asString(
				seo.archiveDescription,
				`${path}.seo.archiveDescription`
			),
			worksFor: worksFor && {
				name: asString(worksFor.name, `${path}.seo.worksFor.name`),
				url: asString(worksFor.url, `${path}.seo.worksFor.url`),
			},
		},
	};
}

export function parseSiteContent(value: unknown): SiteContent {
	const content = asRecord(value, "content");
	const profile = asRecord(content.profile, "content.profile");
	const about = asRecord(content.about, "content.about");
	const writing = asRecord(content.writing, "content.writing");
	const footer = asRecord(content.footer, "content.footer");

	return {
		version: asNumber(content.version, "content.version"),
		updatedAt: asString(content.updatedAt, "content.updatedAt"),
		profile: {
			name: asString(profile.name, "content.profile.name"),
			role: asString(profile.role, "content.profile.role"),
			tagline: asString(profile.tagline, "content.profile.tagline"),
		},
		about: {
			paragraphs: asStringArray(
				about.paragraphs,
				"content.about.paragraphs"
			),
		},
		experience: asArray(
			content.experience,
			"content.experience",
			parseExperience
		),
		projects: asArray(content.projects, "content.projects", parseProject),
		writing: {
			heading: asString(writing.heading, "content.writing.heading"),
			intro: asString(writing.intro, "content.writing.intro"),
			items: asArray(
				writing.items,
				"content.writing.items",
				parseCardItem
			),
		},
		certificates: asArray(
			content.certificates,
			"content.certificates",
			parseCertificate
		),
		socials: asArray(content.socials, "content.socials", parseSocial),
		nav: asArray(content.nav, "content.nav", parseNavSection),
		footer: {
			prose: asString(footer.prose, "content.footer.prose"),
			tagline: asString(footer.tagline, "content.footer.tagline"),
			name: asString(footer.name, "content.footer.name"),
		},
		settings: parseSettings(content.settings, "content.settings"),
	};
}

/** Projects shown on the homepage, in homepage order. */
export function homepageProjects(content: SiteContent): Project[] {
	return content.projects
		.filter((project) => project.onHomepage)
		.sort((a, b) => a.homepageOrder - b.homepageOrder);
}

/** Projects listed in the archive table, in archive order. */
export function archiveProjects(content: SiteContent): Project[] {
	return content.projects
		.filter((project) => project.inArchive)
		.sort((a, b) => a.archiveOrder - b.archiveOrder);
}
