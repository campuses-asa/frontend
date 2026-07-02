import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold text-gray-400">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 max-w-md text-gray-600">
        The page you're looking for doesn't exist or may have moved.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-full bg-gray-400 px-6 py-3 text-white transition hover:bg-gray-700"
      >
        Return to Home
      </Link>
    </div>
  );
}