import Link from "next/link";

export default function PublicNotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Home
      </Link>
    </div>
  );
}
