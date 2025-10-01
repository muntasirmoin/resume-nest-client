import Sidebar from "@/components/shared/sidebar/Sidebar";
import Topbar from "@/components/shared/sidebar/Topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <div className="flex-1 p-1 bg-slate-100 dark:bg-slate-800">
          {children}
        </div>
      </div>
    </main>
  );
}
