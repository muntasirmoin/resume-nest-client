/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
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

export default function ViewProjectsTable() {
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Projects</h2>

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
                Created
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
                  <TableCell className="max-w-xs  text-center truncate text-gray-300">
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
                    <div className="flex justify-center items-center w-full h-full">
                      <div className="flex gap-2">
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
                    </div>
                  </TableCell>

                  <TableCell className="text-gray-400 text-center text-sm">
                    {new Date(project.createdAt).toLocaleDateString()}
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
