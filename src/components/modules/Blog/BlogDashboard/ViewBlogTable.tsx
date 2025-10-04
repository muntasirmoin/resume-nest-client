"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IBlog {
  id: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  page: number;
  limit: number;
  totalPage: number;
  total: number;
}

export default function BlogTable() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    limit: 10,
    totalPage: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (page: number = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
        params: { page, limit: meta.limit },
      });
      setBlogs(res.data.data);
      setMeta(res.data.meta);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(meta.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= meta.totalPage) {
      setMeta((prev) => ({ ...prev, page: newPage }));
      fetchBlogs(newPage);
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="max-w-2xl mx-auto text-center mb-2 text-white">
        <h2 className="text-3xl font-bold">Blog Table</h2>
        <p className="text-gray-300 mt-2">
          View all your blogs, their status, and publication time.
        </p>
      </div>

      <Table className="bg-slate-800 text-white rounded-xl shadow-2xl overflow-hidden">
        <TableHeader>
          <TableRow className="bg-slate-900">
            <TableHead className="w-[50px] text-gray-200 text-center font-medium uppercase text-sm py-3 px-4">
              #
            </TableHead>
            <TableHead className="text-gray-200 text-center font-medium uppercase text-sm py-3 px-4">
              Title
            </TableHead>
            <TableHead className="text-gray-200 text-center font-medium uppercase text-sm py-3 px-4">
              Content
            </TableHead>
            <TableHead className="text-gray-200 text-center font-medium uppercase text-sm py-3 px-4">
              Status
            </TableHead>
            <TableHead className="text-gray-200 text-center font-medium uppercase text-sm py-3 px-4">
              Published At
            </TableHead>
            <TableHead className="text-gray-200 text-center font-medium uppercase text-sm py-3 px-4">
              Updated At
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
          ) : blogs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-400">
                No blogs found.
              </TableCell>
            </TableRow>
          ) : (
            blogs.map((blog, idx) => (
              <TableRow
                key={blog.id}
                className="hover:bg-slate-700text-center  transition duration-200 ease-in-out cursor-pointer"
              >
                <TableCell className="text-center py-3 px-4">
                  {(meta.page - 1) * meta.limit + idx + 1}
                </TableCell>
                <TableCell className="text-center py-3 px-4 font-semibold">
                  {blog.title}
                </TableCell>
                <TableCell className="text-center py-3 px-4">
                  <span className="line-clamp-1">
                    {blog.content.slice(0, 10)}...
                  </span>
                </TableCell>
                <TableCell className="text-center py-3 px-4">
                  {blog.published ? (
                    <Badge className="bg-green-600 text-white">Published</Badge>
                  ) : (
                    <Badge className="bg-yellow-500 text-white">Draft</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center py-3 px-4">
                  {format(new Date(blog.createdAt), "dd MMM yyyy, hh:mm a")}
                </TableCell>
                <TableCell className="text-center py-3 px-4">
                  {format(new Date(blog.updatedAt), "dd MMM yyyy, hh:mm a")}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-2 text-gray-200">
        <button
          onClick={() => handlePageChange(meta.page - 1)}
          disabled={meta.page === 1}
          className="px-4 py-2 bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          Previous
        </button>
        <span className="text-gray-300">
          Page {meta.page} of {meta.totalPage}
        </span>
        <button
          onClick={() => handlePageChange(meta.page + 1)}
          disabled={meta.page === meta.totalPage}
          className="px-4 py-2 bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
