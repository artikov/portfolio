import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import SectionNav from "@/components/SectionNav";
import OtherItems from "@/components/OtherItems";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
	return (
		<CursorGlow>
			<div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0 md:flex">
				{/* Sidebar */}
				<aside className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
					<div className="flex flex-col gap-2 md:gap-4">
						<h1 className="md:text-5xl text-5xl font-bold dark:text-headings">
							Oybek Artikov
						</h1>
						<h2 className="text-xl font-medium dark:text-headings">
							Frontend Developer
						</h2>
						<p className="text-base text-foreground/80 max-w-xs">
							I craft modern, responsive user interfaces with clean code and
							great UX.
						</p>
						<SectionNav />
					</div>
					<SocialLinks />
				</aside>

				<main id="content" className="pt-24 lg:w-[52%] lg:py-24">
					<About />
					<Experience />
					<Projects />
					<OtherItems />
					<Footer />
				</main>
			</div>
		</CursorGlow>
	);
}
