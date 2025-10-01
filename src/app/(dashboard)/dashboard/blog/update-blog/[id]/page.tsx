"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import UpdateBlogForm from "@/components/modules/Blog/BlogDashboard/UpdateBlogForm";

interface IBlog {
  id: string;
  title: string;
  content: string;
  published: boolean;
}

export default function UpdateBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`
        );
        setBlog(res.data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!blog) return <p className="text-white">Blog not found.</p>;

  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{
        background: `linear-gradient(135deg, rgba(8,13,32,0.8), rgba(5,8,24,0.9), rgba(23,37,84,0.8))`,
        backdropFilter: "blur(4px)",
      }}
    >
      <UpdateBlogForm />
    </div>
  );
}
