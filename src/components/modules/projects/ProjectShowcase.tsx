import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export interface IProject {
  title: string;
  subtitle: string;
  thumbnail: string;
  features: string[];
  description: string;
  liveSite: string;
  projectLink: string;

  details: string;
}

async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
    next: { revalidate: 60 }, // ISR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json(); // { meta, data }
}

export default async function ProjectShowcase() {
  const projectData = await getProjects();
  //   console.log(projectData.data);

  return (
    <section
      id="projects"
      className="w-full md:px-6 px-4 py-12 md:py-20"
      style={{
        background: `linear-gradient(
          135deg,
          rgba(8, 13, 32, 0.8),
          rgba(5, 8, 24, 0.9),
          rgba(23, 37, 84, 0.8)
        )`,
      }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
        Projects
      </h2>
      <div className="mt-4 h-1 w-20 mx-auto bg-blue-500 rounded-full mb-12"></div>

      <div className="space-y-20 px-6 md:px-12">
        {projectData.data
          ?.slice()
          .reverse()
          .map((project: IProject, idx: number) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-10`}
            >
              {/* Image with hover + overlay */}
              <div className="md:w-1/2 w-full rounded-2xl overflow-hidden shadow-xl relative group">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={600}
                  height={350}
                  className="w-full h-[300px] object-fill rounded-2xl transform transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Details */}
              <div className="md:w-1/2 w-full text-white space-y-4">
                <h3 className="text-3xl font-bold text-blue-400 tracking-tight">
                  {project.title}
                </h3>

                {/* Features */}
                <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1 text-sm md:text-base">
                  {project.features.map((feature, i) => (
                    <li key={i} className="leading-relaxed">
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={project.liveSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 font-semibold hover:from-blue-600 hover:to-blue-800 text-white rounded-lg text-sm shadow-md transition-all"
                  >
                    <Globe size={18} /> Live Site
                  </a>
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 font-semibold hover:from-gray-800 hover:to-black text-white rounded-lg text-sm shadow-md transition-all"
                  >
                    <FaGithub size={18} /> Github Code
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
