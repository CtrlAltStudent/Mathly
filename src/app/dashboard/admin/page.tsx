import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800">Panel admina</h2>
      <p className="mt-1 text-slate-600">Zarządzaj treścią platformy.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/admin/materialy"
          className="block rounded-xl border border-slate-200 bg-white p-6 hover:border-mathly-200 hover:shadow-sm"
        >
          <h3 className="font-semibold text-slate-800">Materiały</h3>
          <p className="mt-1 text-sm text-slate-600">
            Dodawaj i edytuj materiały edukacyjne.
          </p>
        </Link>
      </div>
    </div>
  );
}
