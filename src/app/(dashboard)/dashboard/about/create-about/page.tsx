import CreateAboutForm from "@/components/modules/about/AboutDashboard/CreateAboutForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create About",
  description: "Welcome to Create About Page",
};

export default function CreateAboutPage() {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-slate-950">
      <CreateAboutForm />
    </div>
  );
}
