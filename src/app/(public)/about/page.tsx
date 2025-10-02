import AboutMeSection, {
  IAbout,
} from "@/components/modules/about/AboutMeSection";

interface HomePageProps {
  abouts: IAbout[];
}

export default function AboutPage({ abouts }: HomePageProps) {
  return (
    <div>
      {abouts.map((about) => (
        <AboutMeSection key={about.id} about={about} />
      ))}
    </div>
  );
}

// SSG: Fetch all About data at build time
export async function getStaticProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about`);
    const data = await res.json();

    return {
      props: {
        abouts: data.data ?? [],
      },
      revalidate: 60, // optional ISR
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        abouts: [],
      },
    };
  }
}
