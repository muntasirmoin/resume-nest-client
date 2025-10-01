"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const aboutSchema = z.object({
  authorId: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  bio: z.string().min(10),
  skills: z.string().min(1),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  twitter: z.string().url().optional(),
});

type AboutFormData = z.infer<typeof aboutSchema>;

export default function CreateAboutForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      authorId: "",
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

  // Set authorId when session becomes available
  useEffect(() => {
    if (session?.user?.id) {
      reset({ authorId: session.user.id });
    }
  }, [session, reset]);

  const onSubmit = async (data: AboutFormData) => {
    try {
      const payload = {
        ...data,
        skills: data.skills.split(",").map((s) => s.trim()),
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}/about/create`,
        payload
      );
      toast.success("About created successfully!");
      reset();
      router.push("/dashboard/about/view-about");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create About");
    }
  };

  if (!session) return null;

  return (
    <>
      <div className="max-w-2xl mx-auto text-center mb-2 text-white">
        <h2 className="text-3xl font-bold">Create About</h2>
        <p className="text-gray-300 mt-2">
          Share your bio, showcase your skills, and connect through social
          links.
        </p>
      </div>
      <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.6)] border border-slate-700 bg-slate-900/90 backdrop-blur-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-5"
        >
          {/* Name */}
          <div>
            <label className="text-indigo-300 font-semibold text-sm md:text-base">
              Name
            </label>
            <Input
              {...register("name")}
              placeholder="Your full name"
              className="mt-1 w-full bg-slate-800/70 border border-slate-600 text-white placeholder-gray-400 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="text-red-400 text-xs md:text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-indigo-300 font-semibold text-sm md:text-base">
              Email
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder="Your email"
              className="mt-1 w-full bg-slate-800/70 border border-slate-600 text-white placeholder-gray-400 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-red-400 text-xs md:text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-indigo-300 font-semibold text-sm md:text-base">
              Phone
            </label>
            <Input
              {...register("phone")}
              placeholder="Phone number"
              className="mt-1 w-full bg-slate-800/70 border border-slate-600 text-white placeholder-gray-400 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:ring-2 focus:ring-indigo-500"
            />
            {errors.phone && (
              <p className="text-red-400 text-xs md:text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="text-indigo-300 font-semibold text-sm md:text-base">
              Bio
            </label>
            <Textarea
              {...register("bio")}
              rows={3}
              placeholder="Write something about yourself..."
              className="mt-1 w-full bg-slate-800/70 border border-slate-600 text-white placeholder-gray-400 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:ring-2 focus:ring-indigo-500"
            />
            {errors.bio && (
              <p className="text-red-400 text-xs md:text-sm mt-1">
                {errors.bio.message}
              </p>
            )}
          </div>

          {/* Skills */}
          <div>
            <label className="text-indigo-300 font-semibold text-sm md:text-base">
              Skills
            </label>
            <Input
              {...register("skills")}
              placeholder="e.g. React, Next.js, TypeScript"
              className="mt-1 w-full bg-slate-800/70 border border-slate-600 text-white placeholder-gray-400 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-gray-400 text-xs mt-1">
              Separate skills with commas
            </p>
            {errors.skills && (
              <p className="text-red-400 text-xs md:text-sm mt-1">
                {errors.skills.message}
              </p>
            )}
          </div>

          {/* Socials */}
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-indigo-300 font-semibold text-sm md:text-base">
                LinkedIn
              </label>
              <Input
                {...register("linkedin")}
                placeholder="LinkedIn URL"
                className="mt-1 w-full bg-slate-800/70 border border-slate-600 text-white placeholder-gray-400 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-indigo-300 font-semibold text-sm md:text-base">
                GitHub
              </label>
              <Input
                {...register("github")}
                placeholder="GitHub URL"
                className="mt-1 w-full bg-slate-800/70 border border-slate-600 text-white placeholder-gray-400 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Create About"}
          </Button>
        </form>
      </div>{" "}
    </>
  );
}
