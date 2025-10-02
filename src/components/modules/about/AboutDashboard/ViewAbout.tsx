"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";

type AboutData = {
  id: string;
  authorId: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  linkedin?: string;
  github?: string;
  twitter?: string;
  createdAt: string;
  updatedAt: string;
};

export default function ViewAbout() {
  const { data: session, status } = useSession();
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  const authorId = session?.user?.id;

  const fetchAbout = async () => {
    if (!authorId) return;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}/about/${authorId}`
      );
      setAbout(res.data.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch About info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, [authorId]);

  if (status === "loading")
    return <p className="text-white text-center mt-6">Loading session...</p>;
  if (!session)
    return (
      <p className="text-red-400 text-center mt-6">
        You must be logged in to view this page.
      </p>
    );

  if (loading) return <p className="text-white text-center mt-6">Loading...</p>;

  if (!about)
    return (
      <p className="text-red-400 text-center mt-6">No about info found.</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-8 rounded-3xl shadow-xl bg-slate-900/70 backdrop-blur-lg border border-slate-700 text-white transition-transform transform hover:scale-105">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold flex items-center justify-center gap-2 animate-fade-in">
          {about.name}
        </h1>
      </div>

      {/* Bio */}
      <div className="mb-8 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
          About Me
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-4"></div>

        <p className="text-gray-300 leading-relaxed text-base md:text-lg bg-slate-800/40 p-5 rounded-xl shadow-inner hover:shadow-lg transition duration-300 text-left md:text-center">
          {about.bio}
        </p>
      </div>

      {/* Skills */}
      <div className="mb-8">
        {/* Title */}
        <div className="text-center mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            Skills
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
        </div>

        {/* Skills inside shadow box */}
        <div className="bg-slate-800/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition">
          <div className="flex flex-wrap justify-evenly gap-3">
            {about.skills.map((skill) => (
              <span
                key={skill}
                className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 rounded-full text-white font-medium text-sm flex items-center gap-2 hover:scale-105 transform transition shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Row */}
      <div className="mb-10">
        {/* Title Centered */}
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            Contact
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
        </div>

        {/* Contact Items */}
        <div className="bg-slate-800/70 p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col md:flex-row gap-6">
          {/* Email */}
          <div className="flex-1 flex items-center gap-3 mr-5 ">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/20">
              <FaEnvelope className="text-indigo-400 text-lg" />
            </div>
            <p className="text-gray-300 text-sm md:text-base">{about.email}</p>
          </div>

          {/* Phone */}
          <div className="flex-1 flex items-center gap-3 ml-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/20">
              <FaPhone className="text-indigo-400 text-lg" />
            </div>
            <p className="text-gray-300 text-sm md:text-base">{about.phone}</p>
          </div>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        {about.linkedin && (
          <a
            href={about.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 py-3 rounded-xl font-semibold transition shadow-lg transform hover:-translate-y-1"
          >
            <FaLinkedin className="text-white text-lg" />
            LinkedIn
          </a>
        )}
        {about.github && (
          <a
            href={about.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 py-3 rounded-xl font-semibold transition shadow-lg transform hover:-translate-y-1"
          >
            <FaGithub className="text-white text-lg" />
            GitHub
          </a>
        )}
        {about.twitter && (
          <a
            href={about.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 py-3 rounded-xl font-semibold transition shadow-lg transform hover:-translate-y-1"
          >
            <FaTwitter className="text-white text-lg" />
            Twitter
          </a>
        )}
      </div>

      {/* Edit Button */}
      {/* <div className="text-center">
        <Link
          href="/dashboard/about/edit"
          className="inline-block bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-3 px-8 rounded-2xl font-semibold transition shadow-lg hover:-translate-y-1 transform"
        >
          Edit About
        </Link>
      </div> */}
    </div>
  );
}
