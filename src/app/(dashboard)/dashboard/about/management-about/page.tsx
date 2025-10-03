import ManagementAbout from "@/components/modules/about/AboutDashboard/ManagementAbout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Management ",
  description: "Welcome to About Management  Page",
};

export default function CreateAboutPage() {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-slate-950">
      <ManagementAbout />
    </div>
  );
}
