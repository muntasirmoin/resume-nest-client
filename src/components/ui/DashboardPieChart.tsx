"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Meta } from "../modules/Blog/BlogDashboard/ViewBlogTable";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardOverview() {
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    limit: 10,
    totalPage: 1,
    total: 0,
  });

  const [metaProject, setMetaProject] = useState<Meta>({
    page: 1,
    limit: 10,
    totalPage: 1,
    total: 0,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const fetchBlogsMeta = async (page: number = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
        params: { page, limit: meta.limit },
      });

      setMeta(res.data.meta);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectsMeta = async (page: number = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}/project`,
        {
          params: { page, limit: meta.limit },
        }
      );

      setMetaProject(res.data.meta);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogsMeta(); // fetch meta on mount
    fetchProjectsMeta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(meta);

  const data = {
    labels: ["Blogs", "Projects"],
    datasets: [
      {
        label: "Total",
        data: [meta.total, metaProject.total],
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
