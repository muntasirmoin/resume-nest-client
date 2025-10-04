import DashboardOverview from "@/components/ui/DashboardPieChart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Welcome to Dashboard Page",
};

export default function DashboardHome() {
  return (
    <div
      className="min-h-[90vh] flex flex-col items-center py-4 px-4"
      style={{
        background: `linear-gradient(135deg, rgba(8,13,32,0.9), rgba(5,8,24,0.95), rgba(23,37,84,0.85))`,
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Motivational Quote */}
      {/* <h2 className="text-white text-xl md:text-2xl font-semibold mb-8 text-center max-w-2xl"></h2> */}
      <h3 className="text-white text-3xl font-bold mb-6 text-center">
        Portfolio Overview
      </h3>
      <div className="w-full max-w-6xl p-6">
        <DashboardOverview />
      </div>
    </div>
  );
}
