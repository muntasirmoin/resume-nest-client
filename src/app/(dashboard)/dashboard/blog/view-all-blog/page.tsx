import BlogTable from "@/components/modules/Blog/BlogDashboard/ViewBlogTable";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "All Blogs",
  description: "Welcome to All Blog Page",
};

const page = () => {
  return (
    <div
      className="w-full min-h-screen  md:px-5  md:py-5"
      style={{
        background: `linear-gradient(135deg, rgba(8,13,32,0.8), rgba(5,8,24,0.9), rgba(23,37,84,0.8))`,
        backdropFilter: "blur(4px)",
      }}
    >
      <BlogTable />
    </div>
  );
};

export default page;
