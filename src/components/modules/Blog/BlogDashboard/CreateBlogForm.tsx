"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface BlogFormData {
  title: string;
  content: string;
  published: boolean;
}

export default function CreateBlogForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BlogFormData>({
    defaultValues: {
      published: false,
    },
  });

  const { data: session } = useSession();
  if (!session) return null;
  const { user } = session;

  const onSubmit: SubmitHandler<BlogFormData> = async (data) => {
    console.log(data, user.id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blog/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, authorId: user.id }),
        }
      );

      const result = await res.json(); // parse response

      if (!res.ok) {
        // Check if backend returned field errors (Zod validation)
        if (result.errors && Array.isArray(result.errors)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          result.errors.forEach((err: any) => toast.error(` ${err.message}`));
        } else {
          toast.error(result.message || "Failed to create blog");
        }
        return;
      }

      // Success
      toast.success("Blog created successfully!");
      reset();
      router.push("/dashboard/create-blog");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // network error or unexpected error
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto text-center mb-2 text-white">
        <h2 className="text-3xl font-bold">Create Blog</h2>
        <p className="text-gray-300 mt-2">
          Fill out the form below to add a new blog post!
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-blue-900/80 shadow-xl rounded-3xl p-8 space-y-6 backdrop-blur-md"
      >
        {/* Title */}
        <div>
          <label className="block font-bold text-indigo-400 uppercase mb-2">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Enter blog title"
            className="w-full border border-gray-600 rounded-xl px-4 py-3 bg-gray-900 text-white placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block font-bold text-indigo-400 uppercase mb-2">
            Content
          </label>
          <textarea
            {...register("content", { required: "Content is required" })}
            rows={6}
            placeholder="Write your blog content here..."
            className="w-full border border-gray-600 rounded-xl px-4 py-3 bg-gray-900 text-white placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
          {errors.content && (
            <p className="text-sm text-red-500 mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Published */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("published")}
            id="published"
            className="w-5 h-5 accent-indigo-500"
          />
          <label htmlFor="published" className="text-gray-300 font-medium">
            Publish immediately
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Create Blog"}
        </button>
      </form>
    </>
  );
}
