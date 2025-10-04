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

export default function DeleteProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [meta, setMeta] = useState<TMeta | null>(null);
  const [loading, setLoading] = useState(false);

  // pagination state
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

  // Delete project handler
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
        // Remove the deleted project from current list without refetching all
        setProjects((prev) => prev.filter((p) => p.id !== id));
        // Optionally, refetch if you want meta to update correctly
        // fetchProjects(page, limit);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to delete project");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <div className="max-w-2xl mx-auto text-center mb-6 text-white">
        <h2 className="text-3xl font-bold text-red-400">
          🗑️ Delete Project 🗑️
        </h2>
        <p className="text-gray-300 mt-2">
          Permanently remove this Project from your dashboard. This action
          cannot be undone.
        </p>
      </div>

      <div className="rounded-lg border border-slate-700 overflow-hidden bg-slate-900/90">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-indigo-300 text-center">
                Thumbnail
              </TableHead>
              <TableHead className="text-indigo-300 text-center">
                Title
              </TableHead>
              <TableHead className="text-indigo-300 text-center">
                Description
              </TableHead>
              <TableHead className="text-indigo-300 text-center">
                Features
              </TableHead>
              <TableHead className="text-indigo-300 text-center">
                Links
              </TableHead>
              <TableHead className="text-indigo-300 text-center">
                Action
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

                  <TableCell>
                    <div className="flex justify-center items-center w-full h-full gap-2">
                      <Link href={project.projectLink} target="_blank">
                        <Button
                          size="sm"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          Code
                        </Button>
                      </Link>
                      <Link href={project.liveSite} target="_blank">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Live
                        </Button>
                      </Link>
                    </div>
                  </TableCell>

                  <TableCell className="text-gray-400 text-center text-sm">
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </Button>
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
