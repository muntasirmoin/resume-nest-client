/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";

type UpdateAboutFormData = {
  name: string;
  email: string;
  phone: string;
  bio: string;
  skills: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
};

type AboutData = {
  authorId: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  linkedin?: string;
  github?: string;
  twitter?: string;
};

export default function ManagementAbout() {
  const { data: session } = useSession();
  const router = useRouter();
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, formState } =
    useForm<UpdateAboutFormData>({
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        bio: "",
        skills: "",
        linkedin: "",
        github: "",
        twitter: "",
      },
    });

  const { isSubmitting } = formState;
  const authorId = session?.user?.id || "";

  // Fetch About data
  useEffect(() => {
    if (!authorId) return;

    const fetchAbout = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}/about/${authorId}`
        );
        const data: AboutData = res.data.data;

        setAbout(data);

        reset({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          bio: data.bio || "",
          skills: (data.skills || []).join(", "),
          linkedin: data.linkedin || "",
          github: data.github || "",
          twitter: data.twitter || "",
        });
      } catch (err: any) {
        toast.error(
          err.response?.data?.message || "Failed to fetch About info"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, [authorId, reset]);

  if (!session) return null;
  if (loading) return <p className="text-white text-center mt-6">Loading...</p>;
  if (!about)
    return (
      <p className="text-red-400 text-center mt-6">No About info found.</p>
    );

  const onSubmit: SubmitHandler<UpdateAboutFormData> = async (data) => {
    try {
      const payload = {
        ...data,
        skills: data.skills
          ? data.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      };
      // if (data.linkedin?.trim()) payload.linkedin = data.linkedin.trim();
      // if (data.github?.trim()) payload.github = data.github.trim();
      // if (data.twitter?.trim()) payload.twitter = data.twitter.trim();

      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_API}/about/${authorId}`,
        payload
      );

      toast.success("About updated successfully!");
      router.push("/dashboard/about/view-about");
      setAbout({ ...about, ...payload, skills: payload.skills });
    } catch (err: any) {
      // Show backend validation messages
      if (
        err.response?.data?.errors &&
        Array.isArray(err.response.data.errors)
      ) {
        err.response.data.errors.forEach((e: any) => toast.error(e.message));
      } else {
        toast.error(err.response?.data?.message || "Failed to update About");
      }
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your About information!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_API}/about/${authorId}`
        );
        toast.success("About deleted successfully!");
        router.push("/dashboard");
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to delete About");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl shadow-lg border border-slate-700 bg-slate-900/90 backdrop-blur-md text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Update About</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <Input {...register("name")} placeholder="Name" className="w-full" />

        {/* Email & Phone */}
        <div className="flex gap-4">
          <div className="flex-1 flex items-center gap-3 bg-slate-800/70 p-3 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-indigo-500 transition">
            <FaEnvelope className="text-indigo-400 text-lg" />
            <Input
              {...register("email")}
              placeholder="Email"
              className="w-full bg-transparent border-none"
            />
          </div>
          <div className="flex-1 flex items-center gap-3 bg-slate-800/70 p-3 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-indigo-500 transition">
            <FaPhone className="text-indigo-400 text-lg" />
            <Input
              {...register("phone")}
              placeholder="Phone"
              className="w-full bg-transparent border-none"
            />
          </div>
        </div>

        {/* Bio */}
        <Textarea
          {...register("bio")}
          rows={4}
          placeholder="Bio"
          className="w-full rounded-xl p-4 bg-slate-800/70 shadow-inner focus:ring-2 focus:ring-indigo-500 transition"
        />

        {/* Skills */}
        <Input
          {...register("skills")}
          placeholder="Skills (comma separated)"
          className="w-full"
        />

        {/* LinkedIn & GitHub */}
        <div className="flex gap-4">
          <div className="flex-1 flex items-center gap-3 bg-slate-800/70 p-3 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-blue-500 transition">
            <FaLinkedin className="text-blue-500 text-lg" />
            <Input
              {...register("linkedin")}
              placeholder="LinkedIn URL"
              className="w-full bg-transparent border-none"
            />
          </div>

          <div className="flex-1 flex items-center gap-3 bg-slate-800/70 p-3 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-gray-500 transition">
            <FaGithub className="text-gray-400 text-lg" />
            <Input
              {...register("github")}
              placeholder="GitHub URL"
              className="w-full bg-transparent border-none"
            />
          </div>
        </div>

        {/* Submit & Delete */}
        <div className="flex gap-4 mt-4">
          <Button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update About"}
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Delete About
          </Button>
        </div>
      </form>
    </div>
  );
}
