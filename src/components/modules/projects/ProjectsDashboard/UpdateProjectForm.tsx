/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
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

// Zod schema for update (partial)
const updateProjectSchema = z.object({
  title: z.string().min(2, "Project title is required").optional(),
  description: z.string().min(10, "Description is required").optional(),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
  projectLink: z.string().url("Project link must be a valid URL").optional(),
  liveSite: z.string().url("Live site must be a valid URL").optional(),
  features: z.string().min(1, "At least one feature is required").optional(),
  authorId: z.string().uuid().optional(),
});

type UpdateProjectFormData = z.infer<typeof updateProjectSchema>;

type UpdateProjectFormProps = {
  projectId: string;
};

export default function UpdateProjectForm({
  projectId,
}: UpdateProjectFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProjectFormData>({
    resolver: zodResolver(updateProjectSchema),
  });

  // Fetch existing project data
  const fetchProject = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`
      );
      const project = res.data.data;

      // Transform features array to comma-separated string
      const featuresString = project.features.join(", ");

      reset({ ...project, features: featuresString });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) fetchProject();
  }, [projectId]);

  // set authorId from session if needed
  useEffect(() => {
    if (session?.user?.id) {
      reset((prev) => ({ ...prev, authorId: session.user.id }));
    }
  }, [session, reset]);

  const onSubmit = async (data: UpdateProjectFormData) => {
    try {
      const payload = {
        ...data,
        features: data.features?.split(",").map((f) => f.trim()), // convert to array
      };

      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`,
        payload
      );

      toast.success("Project updated successfully!");
      router.push("/dashboard/project/view-project");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update project");
    }
  };

  if (!session) return null;
  if (loading)
    return <p className="text-white text-center">Loading project data...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.6)] border border-slate-700 bg-slate-900/90 backdrop-blur-md">
      <h2 className="text-3xl font-bold text-center text-white mb-4">
        Update Project
      </h2>

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
            <p className="text-red-400 text-xs">{errors.title.message}</p>
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
            <p className="text-red-400 text-xs">{errors.description.message}</p>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="text-indigo-300 font-semibold">Thumbnail URL</label>
          <Input
            {...register("thumbnail")}
            placeholder="https://example.com/thumbnail.jpg"
            className="mt-1 w-full bg-slate-800/70 border border-slate-600 text-white"
          />
          {errors.thumbnail && (
            <p className="text-red-400 text-xs">{errors.thumbnail.message}</p>
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
              <p className="text-red-400 text-xs">
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
              <p className="text-red-400 text-xs">{errors.liveSite.message}</p>
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
            <p className="text-red-400 text-xs">{errors.features.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Update Project"}
        </Button>
      </form>
    </div>
  );
}
