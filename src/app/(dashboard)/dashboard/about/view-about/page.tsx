import ViewAbout from "@/components/modules/about/AboutDashboard/ViewAbout";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Details",
  description: "Welcome to About Page",
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
      <ViewAbout />
    </div>
  );
};

export default page;
