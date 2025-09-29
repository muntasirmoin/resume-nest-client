"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  HouseIcon,
  InboxIcon,
  AtSignIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
  FileTextIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import toast from "react-hot-toast";

const baseNavigationLinks = [
  { href: "/", label: "Home", icon: HouseIcon, active: true },
  { href: "#projects", label: "Project's", icon: InboxIcon },
  { href: "#blog", label: "Blog", icon: FileTextIcon },
  { href: "#about", label: "About", icon: AtSignIcon },
];

export default function Navbar() {
  const { data: session } = useSession();
  const loggedIn = !!session;

  // Dynamically add login/dashboard/logout links
  const navigationLinks = [
    ...baseNavigationLinks,
    !loggedIn
      ? { href: "/login", label: "Login", icon: LogInIcon }
      : { href: "/dashboard", label: "Dashboard", icon: UserIcon },
  ];

  const handleLogout = async () => {
    // Show toast immediately
    toast.success("Logging out...", { duration: 15000 });

    // Trigger signOut and redirect
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm shadow-sm bg-slate-900/80 px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4 w-[95%] mx-auto">
        {/* Left: Mobile Menu + Logo */}
        <div className="flex flex-1 items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden bg-white hover:bg-gray-100"
                aria-label="Toggle Menu"
              >
                <svg
                  width={24}
                  height={24}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2 md:hidden bg-slate-800 rounded-md shadow-lg">
              <nav className="flex flex-col gap-2">
                {navigationLinks.map((link, i) => {
                  const Icon = link.icon;
                  // Special case for Logout
                  if (link.label === "Dashboard" && loggedIn) {
                    return (
                      <div key={i} className="flex flex-col gap-2">
                        <Link
                          href={link.href}
                          className="relative flex items-center gap-2 py-2 px-3 rounded-md text-white font-medium
                                    after:block after:w-0 after:h-[2px] after:bg-white after:absolute after:bottom-1 after:left-0
                                    hover:after:w-full after:transition-all after:duration-300"
                        >
                          <Icon
                            size={18}
                            className="text-white/80"
                            aria-hidden="true"
                          />
                          <span>{link.label}</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 text-white text-lg font-medium py-2 px-3 rounded-md 
             hover:bg-red-900/20 hover:text-red-400 transition-colors duration-200"
                        >
                          Logout
                        </button>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={i}
                      href={link.href}
                      className="relative flex items-center gap-2 py-2 px-3 rounded-md text-white font-medium
                                after:block after:w-0 after:h-[2px] after:bg-white after:absolute after:bottom-1 after:left-0
                                hover:after:w-full after:transition-all after:duration-300"
                    >
                      <Icon
                        size={18}
                        className="text-white/80"
                        aria-hidden="true"
                      />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </PopoverContent>
          </Popover>

          {/* Logo */}
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/dta2gcxsl/image/upload/v1756668189/namelogo-Photoroom_uhrowv.png"
              alt="Logo"
              width={128}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex flex-1 justify-center gap-6 items-center">
          {navigationLinks.map((link, i) => {
            const Icon = link.icon;
            if (link.label === "Dashboard" && loggedIn) {
              return (
                <div key={i} className="flex items-center gap-2">
                  <Link
                    href={link.href}
                    className="relative flex items-center gap-2 py-2 px-3 rounded-md text-white font-medium
                               after:block after:w-0 after:h-[2px] after:bg-white after:absolute after:bottom-0 after:left-0
                               hover:after:w-full after:transition-all after:duration-300"
                  >
                    <Icon
                      size={18}
                      className="text-white/80"
                      aria-hidden="true"
                    />
                    <span>{link.label}</span>
                  </Link>
                  <button
                    // onClick={() => signOut({ callbackUrl: "/login" })}
                    onClick={handleLogout}
                    className="cursor-pointer relative flex items-center gap-2 py-2 px-3 rounded-md text-white font-medium
             after:block after:w-0 after:h-[2px] after:bg-white after:absolute after:bottom-0 after:left-0
             hover:after:w-full after:transition-all after:duration-300"
                  >
                    <LogOutIcon
                      size={18}
                      className="text-white/80"
                      aria-hidden="true"
                    />
                    Logout
                  </button>
                </div>
              );
            }

            return (
              <Link
                key={i}
                href={link.href}
                className="relative flex items-center gap-2 py-2 px-3 rounded-md text-white font-medium
                           after:block after:w-0 after:h-[2px] after:bg-white after:absolute after:bottom-0 after:left-0
                           hover:after:w-full after:transition-all after:duration-300"
              >
                <Icon size={18} className="text-white/80" aria-hidden="true" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side placeholder */}
        <div className="flex flex-1 justify-end"></div>
      </div>
    </header>
  );
}
