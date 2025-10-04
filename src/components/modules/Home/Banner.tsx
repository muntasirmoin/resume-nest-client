"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { FaEnvelope, FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

// const resume_pdf = "http://localhost:5173/muntasir-resume-assignment.pdf";
const resume_pdf = "/Muntasir_Full_Stack_Developer.pdf";

// const socialLinks = [
//   { icon: FaFacebook, label: "Facebook", href: "#" },
//   { icon: FaInstagram, label: "Instagram", href: "#" },

//   { icon: FaGithub, label: "GitHub", href: "#" },
//   { icon: FaEnvelope, label: "Email", href: "#" },
// ];

const Banner = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const downloadPdf = (url: any) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  const viewResume = () => {
    window.open(resume_pdf, "_blank");
  };

  const titles = [
    "MERN Stack Developer",
    "TypeScript Full-Stack Developer (MERN)",
    "JavaScript Full-Stack Developer (MERN)",
  ];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [bubble, setBubble] = useState(false);
  console.log(index, visible, bubble);

  useEffect(() => {
    // Fade out after 3 seconds
    const fadeOutTimeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

    // Change title and fade in after fade out duration (500ms)
    const changeTitleTimeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % titles.length);
      setVisible(true);
    }, 3500); // 3000 + 500 fade out duration

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(changeTitleTimeout);
    };
  }, [index, titles.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBubble(true);
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section
        className="text-white px-6 md:px-10 py-20"
        style={{
          background: `linear-gradient(135deg, rgba(8,13,32,0.8), rgba(5,8,24,0.9), rgba(23,37,84,0.8))`,
          backdropFilter: "blur(4px)",
        }}
      >
        <div className=" w-full mx-auto flex flex-col md:flex-row items-center justify-around gap-10">
          {/* Text Content */}
          <div className="text-center md:text-left max-w-2xl">
            <h1 className="text-4xl md:text-4xl font-extrabold leading-tight mb-4">
              Hi,
              <br />
              I&apos;m{" "}
              <span className="text-blue-400">Muntasir Moin Chowdhury</span>
            </h1>

            <p className="text-lg md:text-xl text-white mb-6">
              I am a
              <strong
                className="text-blue-400 ml-2 transition-opacity duration-500"
                style={{ opacity: visible ? 1 : 0 }}
              >
                {titles[index]}
              </strong>
              <br />
              {/* Building modern, scalable web applications — with TypeScript,
              React, Tailwind CSS, Node.js, and Express.js. */}
              Building modern, scalable web applications with — <br />
              <span className="text-sm md:text-base">
                <strong className="text-blue-400">TypeScript</strong>,{" "}
                <strong className="text-blue-400">React</strong>,{" "}
                <strong className="text-blue-400">Tailwind CSS</strong>,{" "}
                <strong className="text-blue-400">Node.js</strong>,{" "}
                <strong className="text-blue-400">Express.js</strong> and{" "}
                <strong className="text-blue-400">MongoDB</strong>.
              </span>
            </p>
            {/* social link */}
            {/* <div className="flex items-center  mb-6 gap-4">
              {socialLinks.map(({ icon: Icon, label, href }, idx) => (
                <Button
                  key={idx}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary"
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                  >
                    <Icon className="size-5" />
                  </a>
                </Button>
              ))}
            </div> */}

            {/*  */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {/* <a
                href="#projects"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium transition"
              >
                Download Resume
              </a> */}
              <button
                onClick={() => downloadPdf(resume_pdf)}
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium transition"
              >
                Download Resume
              </button>
              {/* <a
                href="#contact"
                className="border border-white text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-white hover:text-black transition"
              >
                View Resume
              </a> */}
              <button
                onClick={viewResume}
                className="border cursor-pointer border-white text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-white hover:text-black transition"
              >
                View Resume
              </button>
            </div>
          </div>

          {/* Rounded Image with Gradient Border */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div
              className={`
        p-1 rounded-full
        bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-800
        transition-all duration-700 ease-in-out
        ${bubble ? "shadow-[0_0_15px_5px_rgba(139,92,246,0.7)] scale-105" : ""}
      `}
            >
              <Image
                src="https://res.cloudinary.com/dta2gcxsl/image/upload/v1756660008/Muntasir_Moin_Chowdhury_-_Copy-Photoroom_1_z0bji1.png"
                alt="Developer"
                width={288} // equivalent to w-72
                height={328} // closest to h-82 (since h-82 is ~328px in Tailwind)
                className="w-60 md:w-72 h-82 md:h-82 object-cover rounded-full border-4 border-background"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
