import Contact from "@/components/modules/contacts/Contacts";
import Education from "@/components/modules/education/Education";
import Banner from "@/components/modules/Home/Banner";

import ProjectShowcase from "@/components/modules/projects/ProjectShowcase";
import Skills from "@/components/modules/skills/Skills";
import type { Metadata } from "next";

import AboutMeSection, {
  IAbout,
} from "@/components/modules/about/AboutMeSection";
import BlogManagement, {
  IBlog,
} from "@/components/modules/Blog/BlogManagement";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Home page",
};

export default async function HomePage() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const about = await getAboutData();
  const blogs = await getBlogs();
  // await new Promise((resolve) => setTimeout(resolve, 20000));

  // const forceError = true; // toggle this to true/false

  // if (forceError) {
  //   throw new Error("Forced error for testing!");
  // }

  return (
    <div>
      <Banner />
      <ProjectShowcase />
      <AboutMeSection about={about} />

      <Education />
      <Skills />
      <section id="blog">
        <BlogManagement blogs={blogs} />
      </section>

      <Contact />
    </div>
  );
}

// ssg get all about data
async function getAboutData(): Promise<IAbout> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about`, {
    next: { revalidate: false }, // ssg
  });
  const data = await res.json();
  return data.data[0]; // assuming the first About record
}

// ISR get all blog data
async function getBlogs(): Promise<IBlog[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog?page=1&limit=10`,
    {
      next: { revalidate: 60 }, // ISR: regenerate page every 60 seconds
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();
  return data.data || [];
}
