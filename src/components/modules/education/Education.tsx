import { GraduationCap } from "lucide-react";

const educationData = [
  {
    degree: "Bachelor of Science in Computer Science & Engineering",
    institution: "Metropolitan University, Sylhet",
    year: "2017 - 2021",
    gpa: "3.82",
    description: "",
  },
];

export default function Education() {
  return (
    <section
      className="py-16 px-4 md:px-8"
      style={{
        background: `linear-gradient(
          135deg,
          rgba(8, 13, 32, 0.8),
          rgba(5, 8, 24, 0.9),
          rgba(23, 37, 84, 0.8)
        )`,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
          <GraduationCap className="w-12 h-12 text-indigo-400" />
          Education
        </h2>
        <div className="mt-2 h-1 w-20 mx-auto bg-blue-500 rounded-full mb-10 "></div>

        <div className="flex flex-col gap-6">
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className="relative rounded-xl p-6 md:p-8 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 border border-indigo-700 shadow-md hover:shadow-indigo-600 transition-shadow duration-300"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                {edu.degree}
              </h3>
              <p className="text-indigo-300 italic mb-1">{edu.institution}</p>
              <p className="text-indigo-400 text-sm md:text-base mb-2">
                {edu.year}
              </p>
              <p className="text-indigo-400 text-sm md:text-base mb-4">
                CGPA: {edu.gpa}/4
              </p>
              <p className="text-indigo-200 leading-relaxed text-left md:text-center">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
