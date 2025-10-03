"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardPageProps {
  totalBlogs: number;
  totalProjects: number;
}

export default function DashboardOverview({
  totalBlogs = 5,
  totalProjects = 10,
}: DashboardPageProps) {
  const data = {
    labels: ["Blogs", "Projects"],
    datasets: [
      {
        label: "Content Overview",
        data: [totalBlogs, totalProjects],
        backgroundColor: ["#4ade80", "#60a5fa"],
        borderColor: ["#16a34a", "#1e40af"],
        borderWidth: 2,
        hoverOffset: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { color: "#ffffff", font: { size: 16, weight: 500 } },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* Header */}
      {/* <h3 className="text-white text-3xl font-bold mb-6 text-center">
        Welcome To Dashboard
      </h3> */}

      {/* Pie Chart Container */}
      <div className="w-full max-w-md h-96">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
