import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Home page",
};

export default async function HomePage() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div>
      <h2 className="text-center my-5 text-4xl">Start Pack Ui</h2>
      <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto my-5"></div>
    </div>
  );
}
