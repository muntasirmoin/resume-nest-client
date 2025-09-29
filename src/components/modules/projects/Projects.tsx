import Image from "next/image";
import Link from "next/link";
export const projectData = [
  {
    // e-wallet
    title: "E-Wallet",
    subtitle: "Digital Wallet Management System!",
    image:
      "https://res.cloudinary.com/dta2gcxsl/image/upload/v1756669596/e-wallet_afa9av.jpg",
    features: [
      "Role-based access (User, Agent, Admin)",
      "JWT Authentication & Authorization",
    ],
    overview:
      "It is a Digital Wallet Management System that enables users to securely manage their funds and perform financial transactions within a user-friendly interface.",
    live: "https://e-wallet-client.vercel.app",
    frontend:
      "https://github.com/muntasirmoin/L2-B5-Assignment-6-eWallet-client.git",
    backend:
      " https://github.com/muntasirmoin/L2-B5-Assignment-5-eWallet-server.git",
    details: "/wallet-details",
  },

  // SkillSet Academy
  {
    title: "SkillSet Academy",
    subtitle: "Course Enrollment System",
    image:
      "https://res.cloudinary.com/dta2gcxsl/image/upload/v1756671538/skillsetacademy_ff3pcv.jpg",
    features: ["User can enroll courses", "Admin can manage Courses"],
    overview:
      "It’s a system where users (students) can browse courses, enroll in them, and see their enrolled courses. Admins can add or manage courses, instructors.",
    live: "https://skillset-academy.web.app",
    frontend: "https://github.com/muntasirmoin/skillset-academy-client",
    backend: "https://github.com/muntasirmoin/skillset-server-render",
    details: "/academy-details",
  },
  // toy chamber
  {
    title: "Toy Chamber",
    subtitle: "Toy Chamber is a e-commerce shop for kid's",
    image:
      "https://res.cloudinary.com/dta2gcxsl/image/upload/v1756672796/toychamber_abjitr.jpg",
    features: [
      "Role-based access (User, Admin)",
      "Admin can manage Toy's data",
    ],
    overview:
      "Toy Chamber is a kid-focused e-commerce platform where users can explore and add toys to their cart, while admins manage toy inventory efficiently",
    live: "https://toy-chamber.web.app/",
    frontend: "https://github.com/muntasirmoin/toy-chamber-client",
    backend: "https://github.com/muntasirmoin/toy-chamber-server",
    details: "/toy-details",
  },
];

const Projects = () => {
  return (
    <>
      <section
        id="projects"
        className=" w-full md:px-6 px-4 py-12 md:py-20"
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

        <div className="space-y-16 px-6 md:px-12">
          {projectData.map((project, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12"
            >
              {/* Image */}
              <div className="md:w-1/2 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600} // give an approximate width
                  height={290} // set height close to your design
                  className="w-full h-[290px] object-cover transition-transform duration-500 hover:scale-105 rounded-md"
                />
              </div>

              {/* Details */}
              <div className="md:w-1/2 w-full text-white">
                <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-indigo-300 italic mb-3">
                  {project.subtitle}
                </p>

                {/* Features */}
                <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
                  {project.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>

                {/* Overview */}
                <p className="text-gray-400 leading-relaxed mb-4">
                  {project.overview}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap justify-between gap-3">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 font-bold hover:bg-blue-700 text-white rounded-md text-sm transition"
                  >
                    Live Site
                  </a>
                  <a
                    href={project.frontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-700 font-bold hover:bg-gray-800 text-white rounded-md text-sm transition"
                  >
                    Frontend Code
                  </a>
                  <a
                    href={project.backend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-700 font-bold hover:bg-gray-800 text-white rounded-md text-sm transition"
                  >
                    Backend Code
                  </a>
                  <Link
                    href={`${project.details}`}
                    className="px-4 py-2 bg-green-600 font-bold hover:bg-green-700 text-white rounded-md text-sm transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              <br />
              <br />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
