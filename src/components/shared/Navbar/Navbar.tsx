"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md px-4 sm:px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        MyApp
      </Link>

      {/* Desktop links */}
      <div className="hidden sm:flex gap-6">
        <Link href="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link href="/about" className="hover:text-blue-500">
          About
        </Link>
        <Link href="/services" className="hover:text-blue-500">
          Services
        </Link>
        <Link href="/contact" className="hover:text-blue-500">
          Contact
        </Link>
        <Button variant="outline" size="sm">
          Login
        </Button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="sm:hidden focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <span className="block w-6 h-0.5 bg-black my-1 dark:bg-white"></span>
        <span className="block w-6 h-0.5 bg-black my-1 dark:bg-white"></span>
        <span className="block w-6 h-0.5 bg-black my-1 dark:bg-white"></span>
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center py-4 gap-4">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-500">
            About
          </Link>
          <Link href="/services" className="hover:text-blue-500">
            Services
          </Link>
          <Link href="/contact" className="hover:text-blue-500">
            Contact
          </Link>
          <Button variant="outline" size="sm">
            Login
          </Button>
        </div>
      )}
    </nav>
  );
}
