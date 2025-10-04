"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Minus,
  FileTextIcon,
  UserIcon,
  UserCog,
  ArrowLeft,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

// Nested sidebar structure
const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  {
    href: "/dashboard/projects",
    label: "Projects",
    icon: FolderKanban,
    children: [
      { href: "/dashboard/project/view-project", label: "View All Projects" },
      { href: "/dashboard/project/create-project", label: "Create Project" },
      { href: "/dashboard/project/delete-project", label: "Delete Project" },
      { href: "/dashboard/project/update-project", label: "Update Project" },
    ],
  },
  {
    href: "/dashboard/blog",
    label: "Blog",
    icon: FileTextIcon, // or another icon you prefer
    children: [
      { href: "/dashboard/blog/view-all-blog", label: "View All Blogs" },
      { href: "/dashboard/blog/create-blog", label: "Create Blog" },
      { href: "/dashboard/blog/delete-blog", label: "Delete Blog" },
      { href: "/dashboard/blog/update-blog", label: "Update Blog" },
    ],
  },
  {
    href: "/dashboard/about",
    label: "About",
    icon: UserIcon, // or any icon you prefer
    children: [
      { href: "/dashboard/about/view-about", label: "View About" },
      { href: "/dashboard/about/create-about", label: "Create About" },
      { href: "/dashboard/about/management-about", label: "Manage About" },
      // { href: "/dashboard/about/update", label: "Update About" },
    ],
  },
  // {
  //   href: "/dashboard/user",
  //   label: "User",
  //   icon: UserCog, // different icon for user management
  //   children: [{ href: "/dashboard/user/update", label: "Update User" }],
  // },
  // { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  console.log("session", session);
  const handleLogout = async () => {
    toast.success("Logging out...", { duration: 15000 });
    await signOut({ callbackUrl: "/login" });
  };

  const renderLinks = (links: typeof sidebarLinks) =>
    links.map(({ href, label, icon: Icon, children }) => {
      const isActive = pathname === href;
      const hasChildren = !!children?.length;
      const isDropdownOpen = openDropdown === href;

      return (
        <div key={href} className="flex flex-col">
          <button
            onClick={() =>
              hasChildren
                ? setOpenDropdown(isDropdownOpen ? null : href)
                : undefined
            }
            className={`flex items-center justify-between gap-2 px-3 py-2 rounded-md transition w-full ${
              isActive ? "bg-slate-700 font-semibold" : "hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon size={18} />
              {label}
            </div>
            {hasChildren &&
              (isDropdownOpen ? <Minus size={16} /> : <Plus size={16} />)}
          </button>

          {hasChildren && isDropdownOpen && (
            <div className="flex flex-col ml-6 mt-1 gap-1">
              {children!.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={`px-3 py-2 rounded-md transition ${
                    pathname === child.href
                      ? "bg-slate-700 font-semibold"
                      : "hover:bg-slate-800"
                  }`}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    });

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col backdrop-blur-sm shadow-sm bg-slate-900/80 text-white p-4">
        <h2 className="text-xl font-bold mb-6 mt-4 ml-2">Dashboard</h2>
        <nav className="flex flex-col gap-2">{renderLinks(sidebarLinks)}</nav>

        {/* <button
          className="mt-auto flex items-center gap-2 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button> */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition 
                         text-white font-medium shadow-md hover:shadow-lg active:scale-95"
          aria-label="Go back to home page"
        >
          <ArrowLeft size={20} className="text-white" />
          <span>Back to Home</span>
        </Link>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 text-white bg-slate-900/80 fixed top-4 left-4 rounded-lg z-50"
        >
          <Menu size={24} />
        </button>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 h-full w-64 backdrop-blur-sm shadow-sm bg-slate-900/80 text-white p-4 transform transition-transform duration-300 z-50 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <button onClick={() => setIsOpen(false)} className="text-white">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">{renderLinks(sidebarLinks)}</nav>

          {/* <button
            className="mt-auto flex items-center gap-2 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button> */}
        </aside>
      </div>
    </>
  );
}
