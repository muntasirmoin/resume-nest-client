import About from "@/components/modules/about/About";

import Blog from "@/components/modules/Blog/Blog";
import Contact from "@/components/modules/contacts/Contacts";
import Education from "@/components/modules/education/Education";
import Banner from "@/components/modules/Home/Banner";

import ProjectShowcase from "@/components/modules/projects/ProjectShowcase";
import Skills from "@/components/modules/skills/Skills";
import type { Metadata } from "next";

import AboutMeSection, {
  IAbout,
} from "@/components/modules/about/AboutMeSection";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Home page",
};

export default async function HomePage() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const about = await getAboutData();
  return (
    <div>
      <Banner />
      <ProjectShowcase />
      <AboutMeSection about={about} />
      {/* <About /> */}

      <Education />
      <Skills />
      <Blog />

      <Contact />
    </div>
  );
}

async function getAboutData(): Promise<IAbout> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about`, {
    next: { revalidate: false }, // ssg
  });
  const data = await res.json();
  return data.data[0]; // assuming the first About record
}
