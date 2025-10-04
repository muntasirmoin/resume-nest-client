import AboutMeSection, {
  IAbout,
} from "@/components/modules/about/AboutMeSection";

// interface HomePageProps {
//   abouts: IAbout[];
// }

async function getAboutData(): Promise<IAbout> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about`, {
      cache: "force-cache", // Static Generation (SSG)
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();

    // If backend returns empty array, fallback to static content
    return (
      data?.data?.[0] || {
        authorId: "123",
        name: "Muntasir Moin",
        email: "muntasir@example.com",
        phone: "+880123456789",
        bio: "Frontend developer and tech enthusiast",
        skills: ["React", "Next.js", "TypeScript"],
      }
    );
  } catch (error) {
    console.error("Error fetching About data:", error);
    // Fallback static content if fetch fails
    return {
      authorId: "123",
      name: "Muntasir Moin",
      email: "muntasir@example.com",
      phone: "+880123456789",
      bio: "Frontend developer and tech enthusiast",
      skills: ["React", "Next.js", "TypeScript"],
    };
  }
}

export const revalidate = 600;

export default async function AboutPage() {
  const aboutData = await getAboutData();

  return (
    <div>
      <AboutMeSection about={aboutData} />
    </div>
  );
}

// SSG: Fetch all About data at build time
// export async function getStaticProps() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about`);
//     const data = await res.json();

//     return {
//       props: {
//         abouts: data.data ?? [],
//       },
//       revalidate: 60, // optional ISR
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         abouts: [],
//       },
//     };
//   }
// }
