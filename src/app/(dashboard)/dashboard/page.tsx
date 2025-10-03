// import { getUserSession } from "@/helpers/getUserSession";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Welcome to your dashboard",
};

export default async function DashboardHome() {
  const quote = "The secret of getting ahead is getting started. – Mark Twain";

  //   const session = await getUserSession();
  //   console.log(session);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6 w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {/* Welcome, {session?.user?.name}! */} Welcome To Dashboard
      </h1>
      <p className="text-lg text-gray-600 italic text-center">
        {/* Email {session?.user?.email} */}
      </p>
      <p className="text-lg text-gray-600 italic text-center">{quote}</p>
    </div>
  );
}
