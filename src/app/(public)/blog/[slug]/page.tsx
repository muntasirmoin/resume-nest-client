/* eslint-disable @typescript-eslint/no-explicit-any */
interface BlogPageProps {
  params: { slug: string };
}

export const metadata: Metadata = {
  title: "Blog Details",
  description: "Welcome to Blog Details Page",
};

import { Metadata } from "next";
import Link from "next/link";
async function getBlog(id: string) {
  console.log(id);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
    next: { revalidate: 60 },
  });

  console.log(res);
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`);
  const data = await res.json();

  return data?.data?.map((blog: any) => ({
    id: blog.id,
  }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlog(params.slug);
  console.log(blog, params);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center px-4 py-12"
      style={{
        background: `linear-gradient(135deg, rgba(8,13,32,0.8), rgba(5,8,24,0.9), rgba(23,37,84,0.8))`,
      }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight">
        Blog Details
      </h2>
      <article className="w-full max-w-5xl bg-white/5 border border-white/8 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <header className="px-6 md:px-12 py-8 md:py-10">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
            {blog.title}
          </h1>
          <p className="mt-3 text-sm text-gray-300">
            {new Date(blog.createdAt!).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </header>

        {/* Content */}
        <div className="px-6 md:px-12 pb-10">
          <div
            className="prose prose-invert max-w-none text-gray-100 leading-7"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Footer actions */}
          <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <Link
              href="/#blog"
              className="inline-flex items-center justify-center rounded-xl px-5 py-2 text-sm md:text-base font-medium bg-white/10 text-white hover:bg-white/20 transition-transform transform hover:scale-105 shadow-sm"
              aria-label="Back to blogs"
            >
              ← Back to Blogs
            </Link>

            {/* small actions area (share/save) */}
            <div className="ml-auto hidden md:flex items-center gap-3 text-sm text-gray-300"></div>
          </div>
        </div>
      </article>
    </section>
  );
}
