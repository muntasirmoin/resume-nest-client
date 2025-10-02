import Image from "next/image";

export interface IAbout {
  id?: string;
  authorId: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  linkedin?: string | null;
  github?: string | null;
  twitter?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AboutProps {
  about: IAbout;
}

// Fully static component (SSG), no "use client"
export default function AboutMeSection({ about }: AboutProps) {
  if (!about) return null;

  return (
    <section
      id="about"
      className="w-full px-6 md:px-18 py-12 md:py-20"
      style={{
        background: `linear-gradient(135deg, rgba(8,13,32,0.8), rgba(5,8,24,0.9), rgba(23,37,84,0.8))`,
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          About Me
        </h2>
        <div className="mt-2 h-1 w-20 mx-auto bg-blue-500 rounded-full"></div>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between gap-12">
        {/* Left: Profile Image */}
        <div className="relative w-full md:w-1/3 group">
          <div className="p-1 rounded-xl bg-gradient-to-br from-gray-700 via-gray-900 to-black shadow-[0_0_20px_rgba(0,0,0,0.6)]">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dta2gcxsl/image/upload/v1756659787/68621_1_1_-Photoroom_gtfbgx.png"
                alt={about.name}
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-lg transition-transform duration-700 ease-in-out group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-2/3 text-left">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            So, Who Am I?
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {about.bio}
          </p>

          <div className="mb-8">
            <h4 className="text-2xl font-semibold text-white mb-4">Skills</h4>
            <div className="flex flex-wrap gap-3">
              {about.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gray-800/60 backdrop-blur-sm text-gray-200 font-medium rounded-full shadow-md hover:bg-gray-700/70 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between max-w-lg text-white mb-6">
            <div>
              <strong className="text-sm md:text-base">Email</strong>
              <p className="text-xs md:text-sm break-all">{about.email}</p>
            </div>
            <div>
              <strong className="text-sm md:text-base">Phone</strong>
              <p className="text-xs md:text-sm">{about.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
