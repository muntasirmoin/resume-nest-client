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

// Zod schema
const projectSchema = z.object({
  title: z.string().min(2, "Project title is required"),
  description: z.string().min(10, "Description is required"),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  projectLink: z.string().url("Project link must be a valid URL"),
  liveSite: z.string().url("Live site must be a valid URL"),
  features: z.string().min(1, "At least one feature is required"), // comma separated string (we'll transform later)
  authorId: z.string().uuid(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function CreateProjectForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      projectLink: "",
      liveSite: "",
      features: "",
      authorId: "",
    },
  });

  // set authorId from session
  useEffect(() => {
    if (session?.user?.id) {
      reset((prev) => ({ ...prev, authorId: session.user.id }));
    }
  }, [session, reset]);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const payload = {
        ...data,
        features: data.features.split(",").map((f) => f.trim()), // convert to array
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}/project/create`,
        payload
      );

      toast.success("Project created successfully!");
      reset();
      router.push("/dashboard/project/view-project");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create project");
    }
  };

  if (!session) return null;

  return (
    <>
      <div className="max-w-2xl mx-auto text-center mb-4 text-white">
        <h2 className="text-3xl font-bold">Create Project</h2>
        <p className="text-gray-300 mt-2">
          Add details about your project, links, and its features.
        </p>
      </div>

      <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.6)] border border-slate-700 bg-slate-900/90 backdrop-blur-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-5"
        >
          {/* Title */}
          <div>
            <label className="text-indigo-300 font-semibold">Title</label>
            <Input
              {...register("title")}
              placeholder="Project title"
              className="mt-1 w-full bg-slate-800/70 border border-slate-600 text-white"
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-2">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-indigo-300 font-semibold">Description</label>
            <Textarea
              {...register("description")}
              rows={4}
              placeholder="Brief project description"
              className="mt-1 w-full bg-slate-800/70 border border-slate-600 text-white"
            />
            {errors.description && (
              <p className="text-red-400 text-xs mt-2">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Thumbnail */}
          <div>
            <label className="text-indigo-300 font-semibold">
              Thumbnail URL
            </label>
            <Input
              {...register("thumbnail")}
              placeholder="https://example.com/thumbnail.jpg"
              className="mt-1 w-full bg-slate-800/70 border border-slate-600 text-white"
            />
            {errors.thumbnail && (
              <p className="text-red-400 text-xs mt-2">
                {errors.thumbnail.message}
              </p>
            )}
          </div>

          {/* Links */}
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-indigo-300 font-semibold">
                Project Link
              </label>
              <Input
                {...register("projectLink")}
                placeholder="GitHub or repo URL"
                className="mt-1 w-full bg-slate-800/70 border border-slate-600 text-white"
              />
              {errors.projectLink && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.projectLink.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-indigo-300 font-semibold">Live Site</label>
              <Input
                {...register("liveSite")}
                placeholder="Deployed app URL"
                className="mt-1 w-full bg-slate-800/70 border border-slate-600 text-white"
              />
              {errors.liveSite && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.liveSite.message}
                </p>
              )}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="text-indigo-300 font-semibold">Features</label>
            <Input
              {...register("features")}
              placeholder="e.g. Authentication, Dashboard, API integration"
              className="mt-1 w-full bg-slate-800/70 border border-slate-600 text-white"
            />
            <p className="text-gray-400 text-xs mt-1">
              Separate features with commas
            </p>
            {errors.features && (
              <p className="text-red-400 text-xs mt-2">
                {errors.features.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Create Project"}
          </Button>
        </form>
      </div>
    </>
  );
}
