"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Navbar = () => {
  const { data: session } = useSession();
  const loggedIn = !!session;

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="font-bold text-xl">My Portfolio</h1>
      </Link>
      <div className="space-x-4">
        <Link href="/blogs">Blogs</Link>
        <Link href="/projects">Projects</Link>
        {!loggedIn && <Link href="/login">Login</Link>}
        {loggedIn && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-red-500"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
