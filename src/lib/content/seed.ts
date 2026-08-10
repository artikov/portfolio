import type { StaticImageData } from "next/image";

import artikovTechImage from "../../../public/projects/artikov-tech.png";
import samanidImage from "../../../public/projects/samanid.png";
import crmImage from "../../../public/projects/crm.png";
import referenceImage from "../../../public/projects/reference.png";
import optimumImage from "../../../public/projects/optimum.png";
import sparkImage from "../../../public/projects/spark.png";
import jayxunImage from "../../../public/projects/jayxun.png";
import ilhomImage from "../../../public/projects/ilhom.png";
import blogImage from "../../../public/projects/blog.png";
import type { ContentImage, SiteContent } from "./schema";

/**
 * The content the site shipped with, in the new schema. `getContent()` returns
 * this whenever the store holds nothing, so until the first save this *is* the
 * live site -- it has to stay a field-for-field transcription of the old
 * `src/data` modules, not a paraphrase.
 *
 * The images are still static imports here. That is the one thing a stored
 * record cannot be: the bundler resolves them at build time. `toImage` reduces
 * each to the plain `{ url, width, height }` an uploaded image will also have,
 * so the renderer only ever sees one shape.
 */
function toImage(image: StaticImageData, alt: string): ContentImage {
	return {
		url: image.src,
		width: image.width,
		height: image.height,
		alt,
	};
}

export const SEED_CONTENT: SiteContent = {
	version: 1,
	updatedAt: "1970-01-01T00:00:00.000Z",

	profile: {
		name: "Oybek Artikov",
		role: "Frontend Developer",
		tagline:
			"I craft modern, responsive user interfaces with clean code and great UX.",
	},

	about: {
		paragraphs: [
			"I'm a frontend developer with a strong passion for building accessible, pixel-perfect user interfaces that seamlessly bridge design and functionality. I specialize in crafting user experiences that are not only visually polished but also engineered for speed, scalability, and usability. Whether it's frontend finesse or backend logic, I thrive where design meets robust development—turning ideas into reliable, elegant solutions.",
			"I'm currently a **Lead Frontend Developer** at an early-stage startup based in the Netherlands, building a SaaS platform that lets Shopify store owners manage their customers over WhatsApp. I work in TypeScript and React with Radix UI and Tailwind CSS, and build the React Flow canvas where merchants design their own messaging automations—shipping alongside Claude Code as part of my daily workflow. Before that, I spent two years at [The Ministry of Digital Technologies](https://gov.uz/en/digital), building accessible, scalable UI components that power digital public services and mentoring new developers as they grew into skilled, confident professionals.",
			"In the past, I've built websites for various local [companies](https://jayxuninvest.uz/) and worked at [US-based companies](https://www.wematchwell.com/) on a wide range of web development projects. I've also worked as a freelancer on [Upwork](https://www.upwork.com/freelancers/artikov), delivering high-quality solutions to international [clients](https://www.sparkiq.io/). Beyond client work, I contribute to[ open-source](https://github.com/Fechin/reference) projects and actively share knowledge with the developer community.",
			"I'm also the founder of [Artikov Tech](https://artikov.tech), a development company I currently lead, focused on building impactful digital products and mentoring aspiring developers.",
			"In my free time, I enjoy reading non-fiction books, going for walks to recharge, or unwinding with a few rounds of {cs2} with friends.",
		],
	},

	experience: [
		{
			id: "stealth-startup-netherlands",
			title: "Lead Frontend Developer",
			company: "Stealth Startup (Netherlands)",
			years: "2026 — Present",
			description:
				"I build the frontend of a SaaS platform that lets Shopify store owners manage their customers over WhatsApp. The interface is TypeScript and React on Next.js, with Radix UI primitives and Tailwind CSS, and a React Flow canvas where merchants design their own messaging automations. Claude Code is part of my day-to-day workflow, which keeps delivery fast without loosening review discipline.",
			tags: [
				"TypeScript",
				"React",
				"Next.js",
				"Radix UI",
				"Tailwind CSS",
				"React Flow",
				"Shopify",
				"WhatsApp API",
				"Claude Code",
			],
			link: null,
		},
		{
			id: "ministry-of-digital-technologies",
			title: "Frontend Developer & Mentor",
			company: "The Ministry of Digital Technologies",
			years: "2024 — 2026",
			description:
				"At The Ministry of Digital Technologies, I served a dual role as both a mentor and a full-stack developer specializing in the MERN stack. I worked closely with aspiring developers, guiding them through practical projects and hands-on training in frontend development and full-stack application building using React, Node.js, Express, and MongoDB. This experience kept me current with the latest development trends while strengthening my leadership, communication, and full-stack development skills.",
			tags: [
				"HTML",
				"CSS",
				"JavaScript",
				"React",
				"MongoDB",
				"Node.js",
				"Express",
			],
			link: "https://gov.uz/en/digital",
		},
		{
			id: "next-level-group",
			title: "Frontend Developer",
			company: "Next Level Group",
			years: "2023 — 2025",
			description:
				"At Next Level, I worked as a Frontend Developer for 1.5 years, focusing on building and maintaining scalable user interfaces for web applications. This role sharpened my technical skills in React, CSS frameworks, and performance tuning, while enhancing collaboration in an agile, fast-paced environment.",
			tags: ["HTML", "CSS", "JavaScript", "React", "Accessibility"],
			link: "https://nlg.uz",
		},
		{
			id: "techspot",
			title: "MERN Stack Developer",
			company: "Techspot",
			years: "2022 — 2023",
			description:
				"At Techspot, I began as a Frontend Developer and later transitioned into a Full Stack Developer role over the course of a year. I contributed to multiple client projects, focusing on delivering high-quality, user-centered web applications. This role strengthened my expertise across the entire MERN stack and allowed me to handle both frontend and backend development independently.",
			tags: [
				"HTML",
				"CSS",
				"JavaScript",
				"React",
				"MongoDB",
				"Node.js",
				"Express",
			],
			link: "https://www.techspot.com/",
		},
		{
			id: "itransition",
			title: "Frontend Developer",
			company: "Itransition",
			years: "Sep — Dec 2022",
			description:
				"I completed a React Frontend Developer internship at ITransition, Belarus, where I focused on practical learning and hands-on development using modern frontend technologies. This internship gave me real-world exposure to production-grade code and development processes in a professional team environment.",
			tags: ["HTML", "CSS", "JavaScript", "React"],
			link: "https://www.itransition.com/",
		},
	],

	projects: [
		{
			id: "samanid",
			title: "Samanid",
			description:
				"Samanid is a US-based logistics company. The site pairs their public presence with a custom admin panel for managing content, shipments, and day-to-day operations.",
			tags: ["Next.js", "TypeScript", "Tailwind CSS", "Postgres"],
			url: "https://samanid.us/",
			image: toImage(samanidImage, "Samanid screenshot"),
			year: 2026,
			company: "Artikov Tech",
			link: "samanid.us",
			onHomepage: true,
			homepageOrder: 2,
			inArchive: true,
			archiveOrder: 1,
		},
		{
			id: "skillproof",
			title: "Skillproof",
			description:
				"A quiz application that tests and validates knowledge through an interactive interface, with real-time results and progress tracking.",
			tags: ["JavaScript", "HTML", "CSS"],
			url: "https://skillproof-quiz.vercel.app/",
			image: null,
			year: 2026,
			company: "Personal",
			link: "skillproof-quiz",
			onHomepage: false,
			homepageOrder: 0,
			inArchive: true,
			archiveOrder: 3,
		},
		{
			id: "wedding-invitation",
			title: "Wedding Invitation",
			description:
				"A single-page digital wedding invitation, giving couples an elegant and interactive way to share their day with guests online.",
			tags: ["React.js", "JavaScript", "Tailwind CSS"],
			url: "https://oybek-charos-invitation.vercel.app/",
			image: null,
			year: 2026,
			company: "Personal",
			link: "oybek-charos-invitation",
			onHomepage: false,
			homepageOrder: 0,
			inArchive: true,
			archiveOrder: 4,
		},
		{
			id: "artikov-tech",
			title: "Artikov Tech",
			description:
				"Artikov Tech is a development company I founded, focused on building impactful digital products and mentoring aspiring developers.",
			tags: [
				"Next.js",
				"TypeScript",
				"Tailwind CSS",
				"Aceternity Ui",
				"Shadcn UI",
			],
			url: "https://artikov.tech",
			image: toImage(artikovTechImage, "Artikov Tech screenshot"),
			year: 2025,
			company: "Artikov Tech",
			link: "artikov.tech",
			onHomepage: true,
			homepageOrder: 1,
			inArchive: true,
			archiveOrder: 5,
		},
		{
			id: "reference",
			title: "Reference",
			description:
				"A curated collection of resources for developers, including articles, tools, and libraries to enhance productivity and knowledge.",
			tags: ["JavaScript", "TypeScript", "MD"],
			url: "https://cheatsheets.zip/",
			image: toImage(referenceImage, "Reference screenshot"),
			year: 2024,
			company: "Github",
			link: "cheatsheets.zip",
			onHomepage: true,
			homepageOrder: 4,
			inArchive: true,
			archiveOrder: 8,
		},
		{
			id: "optimum",
			title: "Optimum",
			description:
				"Website for Optimum hair removal clinic, showcasing their services, team, and client testimonials.",
			tags: ["Next.js", "TypeScript", "Tailwind CSS"],
			url: "https://optimumlaserhairremoval.com/",
			image: toImage(optimumImage, "Optimum screenshot"),
			year: 2025,
			company: "Upwork",
			link: "optimumlaserhairremoval.com",
			onHomepage: true,
			homepageOrder: 5,
			inArchive: true,
			archiveOrder: 6,
		},
		{
			id: "sparkiq",
			title: "SparkIQ",
			description:
				"SparkIQ is a platform that provides AI-driven insights and analytics for businesses, helping them make data-driven decisions.",
			tags: ["React.js", "TypeScript", "Tailwind CSS", "Animations"],
			url: "https://www.sparkiq.io/",
			image: toImage(sparkImage, "SparkIQ screenshot"),
			year: 2024,
			company: "Upwork",
			link: "sparkiq.io",
			onHomepage: true,
			homepageOrder: 6,
			inArchive: true,
			archiveOrder: 9,
		},
		{
			id: "jayxun-invest",
			title: "Jayxun Invest",
			description:
				"Jayxun Invest is a pharmacological company that specializes in the development and distribution of innovative healthcare solutions.",
			tags: ["React.js", "TypeScript", "Tailwind CSS"],
			url: "https://jayxuninvest.uz/",
			image: toImage(jayxunImage, "Jayxun Invest screenshot"),
			year: 2024,
			company: "NLG",
			link: "jayxuninvest.uz",
			onHomepage: true,
			homepageOrder: 7,
			inArchive: true,
			archiveOrder: 10,
		},
		{
			id: "ilhom-market",
			title: "Ilhom Market",
			description:
				"Ilhom Market is a local marketplace that connects buyers and sellers, offering a wide range of products and services.",
			tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vuexy UI"],
			url: null,
			image: toImage(ilhomImage, "Ilhom Market screenshot"),
			year: 2025,
			company: "NLG",
			link: "Private Project",
			onHomepage: true,
			homepageOrder: 8,
			inArchive: true,
			archiveOrder: 7,
		},
		{
			id: "student-management-crm",
			title: "Student Management CRM",
			description:
				"A CRM built for local education centers in Uzbekistan, bringing student tracking, attendance, payments, and group management into one platform.",
			tags: ["React.js", "TypeScript", "Recharts", "Postgres"],
			url: "https://crm-student-management.vercel.app/",
			image: toImage(crmImage, "Student Management CRM screenshot"),
			year: 2026,
			company: "Artikov Tech",
			link: "crm-student-management",
			onHomepage: true,
			homepageOrder: 3,
			inArchive: true,
			archiveOrder: 2,
		},
		{
			id: "uchqur-distribution",
			title: "Uchqur Distribution",
			description:
				"Uchqur distribution is a company that specializes in the distribution of high-quality products, ensuring timely delivery and customer satisfaction.",
			tags: ["React.js", "Tailwind CSS", "HTML", "CSS"],
			url: "https://uchqur.uz",
			image: null,
			year: 2023,
			company: "NLG",
			link: "uchqur.uz",
			onHomepage: false,
			homepageOrder: 0,
			inArchive: true,
			archiveOrder: 11,
		},
		{
			id: "xestfolio",
			title: "Xestfolio",
			description:
				"Xestfolio is a portfolio website that showcases the work and achievements of a web designer, highlighting his skills and projects in web development.",
			tags: ["React.js", "Tailwind CSS", "HTML", "CSS"],
			url: "https://simplex-portfolio.vercel.app/",
			image: null,
			year: 2023,
			company: "Personal",
			link: "simplex-portfolio",
			onHomepage: false,
			homepageOrder: 0,
			inArchive: true,
			archiveOrder: 12,
		},
		{
			id: "hoobank",
			title: "Hoobank",
			description:
				"Modern banking website that provides a seamless user experience for managing finances, with features like account management, transactions, and customer support.",
			tags: ["React.js", "Tailwind CSS", "TypeScript"],
			url: "https://artikov-bank.netlify.app/",
			image: null,
			year: 2023,
			company: "Personal",
			link: "hoobank",
			onHomepage: false,
			homepageOrder: 0,
			inArchive: true,
			archiveOrder: 13,
		},
		{
			id: "broshop",
			title: "Broshop",
			description:
				"A full-stack e-commerce platform for technology products, built on the MERN stack, with dynamic product listings, a cart, and secure checkout.",
			tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
			// The deployed demo is a suspended free-tier Render service, so the
			// archive links the repository rather than a dead page.
			url: "https://github.com/artikov/broshop",
			image: null,
			year: 2023,
			company: "Personal",
			link: "broshop",
			onHomepage: false,
			homepageOrder: 0,
			inArchive: true,
			archiveOrder: 14,
		},
		{
			id: "personal-portfolio",
			title: "Personal Portfolio",
			description:
				"A personal portfolio website that showcases the skills, projects, and achievements of a web developer, designed to attract potential clients and employers.",
			tags: ["React.js", "Tailwind CSS", "JavaScript", "HTML", "CSS"],
			url: "https://artikov-gh.netlify.app/",
			image: null,
			year: 2022,
			company: "Personal",
			link: "artikov-gh",
			onHomepage: false,
			homepageOrder: 0,
			inArchive: true,
			archiveOrder: 15,
		},
		{
			id: "memories-web-app",
			title: "Memories Web App",
			description:
				"A web application that allows users to create, share, and manage their memories through photos and stories, with features like user authentication and social sharing.",
			tags: [
				"React.js",
				"MongoDB",
				"Express.js",
				"Tailwind CSS",
				"Node.js",
			],
			url: "https://memories-artikov.netlify.app/",
			image: null,
			year: 2022,
			company: "Personal",
			link: "memories-artikov",
			onHomepage: false,
			homepageOrder: 0,
			inArchive: true,
			archiveOrder: 16,
		},
		{
			id: "web-developer-portfolio",
			title: "Web Developer Portfolio",
			description:
				"A portfolio website that showcases the work and skills of a web developer, featuring projects, testimonials, and contact information.",
			tags: ["React.js", "Tailwind CSS", "JavaScript", "HTML", "CSS"],
			url: "https://illustrious-moxie-79ffc4.netlify.app/",
			image: null,
			year: 2022,
			company: "Techspot",
			link: "developer-jamal",
			onHomepage: false,
			homepageOrder: 0,
			inArchive: true,
			archiveOrder: 17,
		},
		{
			id: "keeper-clone",
			title: "Keeper Clone",
			description:
				"A clone of the popular note-taking app, allowing users to create, edit, and delete notes with a simple and intuitive interface.",
			tags: [
				"React.js",
				"Node.js",
				"Express.js",
				"MongoDB",
				"Tailwind CSS",
			],
			url: "https://github.com/artikov/keeper-clone",
			image: null,
			year: 2022,
			company: "Personal",
			link: "keeper-clone",
			onHomepage: false,
			homepageOrder: 0,
			inArchive: true,
			archiveOrder: 18,
		},
		{
			id: "arabic-flashcards",
			title: "Arabic Flashcards",
			description:
				"An educational web application that helps users learn Arabic vocabulary through interactive flashcards, quizzes, and progress tracking.",
			tags: ["Python"],
			url: "https://github.com/artikov/arabic-flash-card-app",
			image: null,
			year: 2022,
			company: "Personal",
			link: "arabic-flash-card-app",
			onHomepage: false,
			homepageOrder: 0,
			inArchive: true,
			archiveOrder: 19,
		},
		{
			id: "weather-app",
			title: "Weather App",
			description:
				"A simple weather application that provides real-time weather information for any location, including temperature, humidity, and forecasts.",
			tags: ["JavaScript", "HTML", "CSS"],
			url: "https://artikov.github.io/weather-app-js/",
			image: null,
			year: 2022,
			company: "Personal",
			link: "weather-app-js",
			onHomepage: false,
			homepageOrder: 0,
			inArchive: true,
			archiveOrder: 20,
		},
	],

	writing: {
		heading: "Writing",
		intro: "Visit my blog for more insights and tutorials.",
		items: [
			{
				id: "artikovs-blog",
				title: "Artikov's Blog",
				description:
					"Explore my thoughts, tutorials, and insights on web development, design, and technology.",
				tags: ["WordPress", "PHP", "MySQL"],
				// The blog URL lives here and nowhere else. It used to be a
				// separate `site.ts` export whose only consumer was this
				// record. TODO: this WP Engine staging domain currently 404s --
				// repoint it once the blog has a permanent home.
				url: "https://artikov-1144079.ingress-daribow.ewp.live/",
				image: toImage(blogImage, "Artikov's Blog screenshot"),
			},
		],
	},

	socials: [
		{
			id: "github",
			label: "GitHub",
			href: "https://github.com/artikov",
			icon: "github",
		},
		{
			id: "linkedin",
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/artikov/",
			icon: "linkedin",
		},
		{
			id: "instagram",
			label: "Instagram",
			href: "https://instagram.com/artikxv",
			icon: "instagram",
		},
		{
			id: "x",
			label: "X (formerly Twitter)",
			href: "https://x.com/artikov08",
			icon: "x",
		},
		{
			id: "upwork",
			label: "Upwork",
			href: "https://www.upwork.com/freelancers/artikov",
			icon: "upwork",
		},
	],

	nav: [
		{ id: "about", label: "About" },
		{ id: "experience", label: "Experience" },
		{ id: "projects", label: "Projects" },
	],

	footer: {
		// The trailing space is load-bearing: it is the gap before the <br/>.
		prose: "Built with care and code in [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com), this site reflects my passion for clean design and performance. Deployed via [Vercel](https://vercel.com), crafted in [VS Code](https://code.visualstudio.com). ",
		tagline: "Always evolving, just like my journey in tech.",
		name: "Oybek Artikov",
	},

	settings: {
		siteUrl: "https://artikov.tech",
		resumeUrl: "/cv.pdf",
		seo: {
			title: "Oybek Artikov - Frontend Developer",
			description:
				"I build pixel-perfect, responsive, and accessible web experiences.",
			ogTitle: "Oybek Artikov - Frontend Developer",
			ogDescription:
				"Portfolio site showcasing work, experience, and projects.",
			siteName: "artikov.tech",
			archiveTitle: "Project Archive - Oybek Artikov",
			archiveDescription:
				"A complete list of the web projects I've built, from client work to personal experiments.",
			// The current employer is undisclosed and has no public URL, so the
			// site publishes no employer rather than a stale one.
			worksFor: null,
		},
	},
};
