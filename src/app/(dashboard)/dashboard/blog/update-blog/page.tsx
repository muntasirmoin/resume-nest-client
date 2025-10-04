// "use client"; // must be client component

import UpdateBlogTable from "@/components/modules/Blog/BlogDashboard/UpdateBlogTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Blog",
  description: "Welcome to Update Blog Page",
};

export default function UpdateBlogPage() {
  return (
    <div
      className="min-h-[90vh] p-6 md:p-10"
      style={{
        background: `linear-gradient(135deg, rgba(8,13,32,0.8), rgba(5,8,24,0.9), rgba(23,37,84,0.8))`,
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="max-w-2xl mx-auto text-center mb-6 text-white">
        <h2 className="text-3xl font-bold">Update Blog</h2>
        <p className="text-gray-300 mt-2">
          Edit your blog content and control its publication status.
        </p>
      </div>

      <UpdateBlogTable />
    </div>
  );
}
