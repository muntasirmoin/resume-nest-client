/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RiLoader2Line } from "react-icons/ri";

const updateBlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  published: z.boolean().optional(),
});

type UpdateBlogFormData = z.infer<typeof updateBlogSchema>;

export default function UpdateBlogForm() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdateBlogFormData>({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: {
      title: "",
      content: "",
      published: false,
    },
  });

  // Fetch current blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`
        );

        const blog = res.data.data;

        reset({
          title: blog.title,
          content: blog.content,
          published: blog.published ?? false, // ✅ ensure boolean
        });
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch blog data");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, reset]);

  const onSubmit = async (data: UpdateBlogFormData) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, data);
      toast.success("Blog updated successfully!");
      router.push("/dashboard/blog/update-blog"); // redirect back to dashboard
    } catch (err: any) {
      toast.error(err.message || "Failed to update blog");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center gap-2 text-white text-lg font-semibold">
        <RiLoader2Line className="text-2xl animate-spin" />
        <span>Loading...</span>
        <RiLoader2Line className="text-2xl animate-spin" />
      </div>
    );

  return (
    <>
      <div className="max-w-2xl mx-auto text-center mb-6 text-white">
        <h2 className="text-3xl font-bold">Update Blog</h2>
        <p className="text-gray-300 mt-2">
          Edit your blog content and control its publication status.
        </p>
      </div>

      <div
        className="max-w-3xl mx-auto p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.6)] 
        bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90
        backdrop-blur-md border border-slate-700/50"
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div>
            <label className="block mb-1 font-semibold text-indigo-400 uppercase">
              Blog Title
            </label>
            <Input
              {...register("title")}
              placeholder="Enter blog title"
              className="bg-slate-800/70 border border-slate-700 focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
            />
            {errors.title && (
              <p className="text-red-400 mt-1 text-sm">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block mb-1 font-semibold text-indigo-400 uppercase">
              Blog Content
            </label>
            <Textarea
              {...register("content")}
              rows={6}
              placeholder="Write your blog content..."
              className="bg-slate-800/70 border border-slate-700 focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
            />
            {errors.content && (
              <p className="text-red-400 mt-1 text-sm">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Published */}
          <div className="flex items-center gap-3 mt-4">
            <Checkbox
              id="published"
              className="text-white"
              checked={!!watch("published")}
              onCheckedChange={(val) => setValue("published", val as boolean)}
            />
            <label
              htmlFor="published"
              className="font-semibold text-indigo-300 tracking-wide cursor-pointer select-none hover:text-indigo-400 transition"
            >
              Publish Immediately
            </label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Blog"}
          </Button>
        </form>
      </div>
    </>
  );
}
