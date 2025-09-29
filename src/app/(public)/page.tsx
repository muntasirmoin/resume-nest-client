import About from "@/components/modules/about/About";
import Blog from "@/components/modules/Blog/Blog";
import Contact from "@/components/modules/contacts/Contacts";
import Education from "@/components/modules/education/Education";
import Banner from "@/components/modules/Home/Banner";
import Projects from "@/components/modules/projects/Projects";
import Skills from "@/components/modules/skills/Skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Home page",
};

export default async function HomePage() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div>
      <Banner />
      <Projects />
      <About />
      <Education />
      <Skills />
      <Blog />

      <Contact />
    </div>
  );
}
