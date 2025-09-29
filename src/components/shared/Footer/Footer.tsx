import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-6 px-4 sm:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-blue-500">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-blue-500">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-blue-500">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
