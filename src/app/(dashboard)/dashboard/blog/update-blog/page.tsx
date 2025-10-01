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
      className="min-h-screen p-6 md:p-10"
      style={{
        background: `linear-gradient(135deg, rgba(8,13,32,0.8), rgba(5,8,24,0.9), rgba(23,37,84,0.8))`,
        backdropFilter: "blur(4px)",
      }}
    >
      <h1 className="text-4xl font-extrabold text-white mb-6">
        Blog Management
      </h1>
      <p className="text-gray-300 mb-8">
        Manage your blogs: edit, delete, or view publication status.
      </p>

      <UpdateBlogTable />
    </div>
  );
}
