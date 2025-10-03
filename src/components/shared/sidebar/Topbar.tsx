"use client";

import { useSession, signOut } from "next-auth/react";

import { LogOut, Mail, Shield, User } from "lucide-react";
import toast from "react-hot-toast";

export default function Topbar() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    toast.success("Logging out...", { duration: 15000 });
    await signOut({ callbackUrl: "/login" });
  };

  if (!session) return null; // hide if not logged in

  const { user } = session;
  console.log("TopBar user", user);
  return (
    <header className="flex items-center justify-between px-1 py-1 backdrop-blur-sm shadow-sm bg-slate-900/80 text-white">
      {/* Left: User Info*/}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-slate-800/60 backdrop-blur-sm p-4 rounded-lg shadow-md text-white w-full gap-4">
        {/* Left: User Info */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-6 w-full md:w-auto gap-2">
          <div className="flex items-center gap-2">
            <User size={18} className="text-blue-400" />
            <span className="font-semibold text-base md:text-lg truncate">
              {user?.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={18} className="text-green-400" />
            <span className="text-sm md:text-base text-gray-300 truncate">
              {user?.email}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Shield size={18} className="text-yellow-400" />
            <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Right: Logout */}
        <div className="flex items-center justify-end w-full md:w-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition w-full md:w-auto justify-center"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
