import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="w-full px-9 md:px-18 py-12 md:py-20"
      style={{
        background: `linear-gradient(135deg, rgba(8,13,32,0.8), rgba(5,8,24,0.9), rgba(23,37,84,0.8))`,
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Centered Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          About Me
        </h2>
        <div className="mt-2 h-1 w-20 mx-auto bg-blue-500 rounded-full"></div>
      </div>

      {/* Flex Layout: Image + Text */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-12">
        {/* Left: Image */}
        <div className="relative w-full md:w-1/3 group">
          <div className="p-1 rounded-xl bg-gradient-to-br from-gray-700 via-gray-900 to-black shadow-[0_0_20px_rgba(0,0,0,0.6)]">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              {/* Image */}
              <Image
                src="https://res.cloudinary.com/dta2gcxsl/image/upload/v1756659787/68621_1_1_-Photoroom_gtfbgx.png"
                alt="Muntasir Moin Chowdhury"
                width={500} // pick approximate width
                height={500} // pick approximate height
                className="w-full h-full object-cover rounded-lg transition-transform duration-700 ease-in-out group-hover:scale-105"
              />

              {/* Overlay Blur - 90% visibility */}
              <div className="absolute inset-0 z-10 bg-black/5 backdrop-blur-[1px] transition-all duration-700 ease-in-out group-hover:backdrop-blur-0 group-hover:bg-transparent" />

              {/* TV Border Frame */}
              <div className="absolute inset-0 z-20 rounded-lg border-4 border-gray-800 shadow-inner shadow-black pointer-events-none" />

              {/* Live Dot Indicator on Hover */}
              <div className="absolute top-2 left-2 w-3 h-3 bg-red-600 rounded-full shadow-[0_0_8px_rgba(255,0,0,0.8)] opacity-0 group-hover:opacity-100 z-30 transition-opacity duration-500" />
            </div>
          </div>
        </div>

        {/* Right: Text */}
        <div className="w-full md:w-2/3 text-left">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            So, Who Am I?
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            I am a passionate and goal-driven{" "}
            <strong className="text-white">MERN stack developer </strong> with a
            strong foundation in building full-stack web applications. I hold a{" "}
            <strong className="text-white">
              Bachelor of Science in Computer Science & Engineering
            </strong>
            , which has equipped me with solid technical knowledge and
            problem-solving skills.
            <br />
            <br />I specialize in creating scalable and maintainable backend
            services using <strong className="text-white">Node.js</strong>,{" "}
            <strong className="text-white">Express.js</strong>, and{" "}
            <strong className="text-white">TypeScript</strong>, as well as
            managing data effectively with{" "}
            <strong className="text-white">MongoDB</strong> and{" "}
            <strong className="text-white">Mongoose</strong>. On the frontend, I
            build responsive, accessible, and user-friendly interfaces using{" "}
            <strong className="text-white">React</strong>,{" "}
            <strong className="text-white">Tailwind CSS</strong>. <br />{" "}
            I&apos;m always eager to learn and collaborate on impactful
            projects.
            <br />
            <br />
          </p>

          <div className="flex justify-between align-center max-w-md text-white">
            {/* Email Block */}
            <div className="flex flex-col items-start text-left">
              <strong className="text-sm md:text-base mb-1">Email</strong>
              <span className="text-xs md:text-sm break-all">
                muntasirmoinchowdhury099@gmail.com
              </span>
            </div>

            {/* Location Block */}
            <div className="flex flex-col items-start">
              <strong className="text-sm md:text-base mb-1">Location</strong>
              <span className="text-xs md:text-sm">Sylhet, Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
