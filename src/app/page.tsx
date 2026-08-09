import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import SectionNav from "@/components/SectionNav";
import OtherItems from "@/components/OtherItems";
import SocialLinks from "@/components/SocialLinks";
import { homepageProjects } from "@/lib/content/schema";
import { getContent } from "@/lib/content/store";

export default async function Home() {
	const content = await getContent();

	return (
		<CursorGlow>
			<div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0 md:flex">
				{/* Sidebar */}
				<aside className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
					<div className="flex flex-col gap-2 md:gap-4">
						<h1 className="md:text-5xl text-5xl font-bold dark:text-headings">
							{content.profile.name}
						</h1>
						<h2 className="text-xl font-medium dark:text-headings">
							{content.profile.role}
						</h2>
						<p className="text-base text-foreground/80 max-w-xs">
							{content.profile.tagline}
						</p>
						<SectionNav sections={content.nav} />
					</div>
					<SocialLinks links={content.socials} />
				</aside>

				<main id="content" className="pt-24 lg:w-[52%] lg:py-24">
					<About paragraphs={content.about.paragraphs} />
					<Experience
						items={content.experience}
						resumeUrl={content.settings.resumeUrl}
					/>
					<Projects projects={homepageProjects(content)} />
					<OtherItems writing={content.writing} />
					<Footer content={content.footer} />
				</main>
			</div>
		</CursorGlow>
	);
}
