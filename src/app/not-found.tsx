import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <h1 className="text-6xl font-bold text-slate-300">404</h1>
      <p className="mt-4 text-slate-600">Strona nie została znaleziona.</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-mathly-600 px-6 py-3 font-medium text-white hover:bg-mathly-700"
      >
        Strona główna
      </Link>
    </div>
  );
}
