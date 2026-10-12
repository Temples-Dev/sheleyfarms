import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900">Page not found</h1>
      <p className="text-gray-600">
        The page you are looking for does not exist or was moved.
      </p>
      <Link
        to="/"
        className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
      >
        Back to home
      </Link>
    </main>
  );
}
