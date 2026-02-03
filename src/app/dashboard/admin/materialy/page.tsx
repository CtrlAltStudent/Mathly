"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Material = {
  id: string;
  title: string;
  slug: string;
  gradeLevel: string;
  topic: string;
  order: number;
};

const GRADE_OPTIONS = [
  { value: "6sp", label: "Klasa 6 SP" },
  { value: "7sp", label: "Klasa 7 SP" },
  { value: "8sp", label: "Klasa 8 SP" },
  { value: "1lo", label: "Klasa 1 LO" },
  { value: "2lo", label: "Klasa 2 LO" },
  { value: "matura", label: "Klasa 3 LO / Matura" },
];

const TOPIC_OPTIONS = [
  { value: "algebra", label: "Algebra" },
  { value: "geometria", label: "Geometria" },
  { value: "statystyka", label: "Statystyka" },
];

export default function AdminMaterialyPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/materialy")
      .then((r) => r.json())
      .then((data) => setMaterials(data.materials ?? []))
      .catch(() => setMaterials([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-slate-600">Ładowanie...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Materiały</h2>
        <Link
          href="/dashboard/admin/materialy/nowy"
          className="rounded-lg bg-mathly-600 px-4 py-2 text-sm font-medium text-white hover:bg-mathly-700"
        >
          + Nowy materiał
        </Link>
      </div>
      <p className="mt-1 text-slate-600">Lista materiałów w bazie danych.</p>

      {materials.length === 0 ? (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">Brak materiałów. Dodaj pierwszy.</p>
          <Link
            href="/dashboard/admin/materialy/nowy"
            className="mt-4 inline-block text-mathly-600 hover:underline"
          >
            Dodaj materiał →
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-2">
          {materials.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4"
            >
              <div>
                <span className="font-medium text-slate-800">{m.title}</span>
                <span className="ml-2 text-sm text-slate-500">
                  {m.gradeLevel} / {m.topic}
                </span>
              </div>
              <Link
                href={`/dashboard/admin/materialy/${m.id}`}
                className="text-sm text-mathly-600 hover:underline"
              >
                Edytuj
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
