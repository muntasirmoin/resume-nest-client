/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Project = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  projectLink: string;
  liveSite: string;
  features: string[];
  createdAt: string;
};

type TMeta = {
  page: number;
  limit: number;
  totalPage: number;
  total: number;
};

export default function ProjectUpdateTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [meta, setMeta] = useState<TMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchProjects = async (page: number, limit: number) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}/project?page=${page}&limit=${limit}`
      );
      setProjects(res.data.data || []);
      setMeta(res.data.meta);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(page, limit);
  }, [page, limit]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`);
        toast.success("Project deleted successfully");
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to delete project");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Projects</h2>

      <div className="rounded-lg border border-slate-700 overflow-hidden bg-slate-900/90">
        <Table>
          <TableHeader className="bg-slate-800/90">
            <TableRow>
              <TableHead className="text-white text-center font-semibold">
                Thumbnail
              </TableHead>
              <TableHead className="text-white text-center font-semibold">
                Title
              </TableHead>
              <TableHead className="text-white text-center font-semibold">
                Description
              </TableHead>
              <TableHead className="text-white text-center font-semibold">
                Features
              </TableHead>
              <TableHead className="text-white text-center font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-400">
                  Loading...
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-400">
                  No projects found
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="flex justify-center items-center">
                    <div className="relative w-20 h-14 rounded-md overflow-hidden">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>

                  <TableCell className="font-semibold text-center">
                    {project.title}
                  </TableCell>

                  <TableCell className="max-w-xs text-center truncate text-gray-300">
                    {project.description}
                  </TableCell>

                  <TableCell>
                    <ul className="list-disc list-inside text-center text-gray-400 text-sm">
                      {project.features.slice(0, 3).map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                      {project.features.length > 3 && (
                        <li className="text-gray-500">+ more</li>
                      )}
                    </ul>
                  </TableCell>

                  <TableCell className="text-white-400 text-center text-sm">
                    <Link
                      href={`/dashboard/project/update-project/${project.id}`}
                    >
                      <Button
                        size="sm"
                        className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold transition shadow-lg disabled:opacity-50"
                      >
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta && meta.totalPage > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    setPage((p) => Math.max(p - 1, 1));
                  }}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {[...Array(meta.totalPage)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={page === i + 1}
                    onClick={(e: any) => {
                      e.preventDefault();
                      setPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {meta.totalPage > 1 && <PaginationEllipsis />}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    setPage((p) => Math.min(p + 1, meta.totalPage));
                  }}
                  className={
                    page === meta.totalPage
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
