import { FaCheckCircle } from "react-icons/fa";

const frontendSkills = [
  {
    title: "React",
    subtitle: "Dynamic, reusable, and maintainable UI components.",
  },
  {
    title: "TypeScript",
    subtitle: "Building robust, type-safe applications in JavaScript.",
  },
  {
    title: "Tailwind CSS",
    subtitle: "Utility-first CSS framework for building responsive UIs.",
  },
  // { title: "ShadCN UI", subtitle: "Accessible, elegant component library" },
  {
    title: "Redux Toolkit",
    subtitle: "Simplified and scalable state management.",
  },
  {
    title: "React Router",
    subtitle: "Page-based routing for modern React applications",
  },
  {
    title: "Axios",
    subtitle: "Promise-based HTTP client for API requests.",
  },
];

const backendSkills = [
  {
    title: "Node.js",
    subtitle: "JavaScript runtime for server-side development.",
  },
  { title: "Express.js", subtitle: "Minimalist web framework for APIs." },
  { title: "MongoDB", subtitle: "Flexible NoSQL database." },
  // { title: "Mongoose", subtitle: "Elegant MongoDB ODM for schemas" },
  { title: "JWT", subtitle: "Secure JSON Web Token authentication." },
  { title: "TypeScript", subtitle: "Typed backend code for scalability." },
  { title: "Zod", subtitle: "Type-safe schema validation." },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className=" text-white"
      style={{
        background: `linear-gradient(
          135deg,
          rgba(8, 13, 32, 0.85),
          rgba(5, 8, 24, 0.95),
          rgba(23, 37, 84, 0.85)
        )`,
      }}
    >
      <div className="w-full px-9 py-20 md:px-18 ">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 tracking-wide">
          My Skill Set
        </h2>
        <div className="h-1 w-28 bg-blue-500 mx-auto rounded-full mb-14 shadow-md" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 ">
          {/* Frontend */}
          <div className="bg-white/10 hover:bg-white/20 transition duration-400 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-blue-600/40 hover:shadow-blue-500/30">
            <h3 className="text-3xl font-semibold mb-8 text-blue-400 tracking-wide">
              Frontend Development
            </h3>
            <ul className="space-y-8 ">
              {frontendSkills.map(({ title, subtitle }, idx) => (
                <li
                  key={idx}
                  className="flex flex-col gap-2 text-gray-200 hover:bg-white/10 rounded-lg p-3 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <FaCheckCircle
                      className="w-6 h-6 text-blue-400"
                      aria-hidden="true"
                    />
                    <h4 className="font-semibold text-lg md:text-xl tracking-wide leading-tight text-white">
                      {title}
                    </h4>
                  </div>
                  <p className="text-sm text-left md:text-start text-gray-300 leading-relaxed max-w-md ml-8 md:ml-10">
                    {subtitle}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Backend */}
          <div className="bg-white/10 hover:bg-white/20 transition duration-400 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-purple-600/40 hover:shadow-purple-500/30">
            <h3 className="text-3xl font-semibold mb-8 text-purple-400 tracking-wide">
              Backend Development
            </h3>
            <ul className="space-y-8">
              {backendSkills.map(({ title, subtitle }, idx) => (
                <li
                  key={idx}
                  className="flex flex-col gap-2 text-gray-200 hover:bg-white/10 rounded-lg p-3 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <FaCheckCircle
                      className="w-6 h-6 text-purple-400"
                      aria-hidden="true"
                    />
                    <h4 className="font-semibold text-lg md:text-xl tracking-wide leading-tight text-white">
                      {title}
                    </h4>
                  </div>
                  <p className="text-sm text-left md:text-start text-gray-300 leading-relaxed max-w-md ml-8 md:ml-10">
                    {subtitle}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
