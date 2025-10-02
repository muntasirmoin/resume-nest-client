import UpdateProjectForm from "@/components/modules/projects/ProjectsDashboard/UpdateProjectForm";
import { Metadata } from "next";

interface PageProps {
  params: { id: string };
}
export const metadata: Metadata = {
  title: "Single Project Update",
  description: "Welcome to Update Project Page",
};

const Page = ({ params }: PageProps) => {
  return (
    <div
      className="w-full min-h-screen md:px-5 md:py-5"
      style={{
        background: `linear-gradient(135deg, rgba(8,13,32,0.8), rgba(5,8,24,0.9), rgba(23,37,84,0.8))`,
        backdropFilter: "blur(4px)",
      }}
    >
      <UpdateProjectForm projectId={params.id} />
    </div>
  );
};

export default Page;
