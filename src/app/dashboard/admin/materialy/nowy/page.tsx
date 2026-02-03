"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MaterialEditor } from "@/app/components/MaterialEditor";

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

export default function NowyMaterialPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [gradeLevel, setGradeLevel] = useState("6sp");
  const [topic, setTopic] = useState("algebra");
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/materialy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, gradeLevel, topic, order }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Błąd");
      router.push("/dashboard/admin/materialy");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Link
        href="/dashboard/admin/materialy"
        className="text-sm text-mathly-600 hover:underline"
      >
        ← Wróć do listy
      </Link>
      <h2 className="mt-4 text-xl font-bold text-slate-800">Nowy materiał</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-4xl">
        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-red-600">{error}</div>
        )}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tytuł</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Klasa</label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            >
              {GRADE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Dział</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            >
              {TOPIC_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Kolejność</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Treść</label>
          <MaterialEditor content={content} onChange={setContent} />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-mathly-600 px-6 py-2 font-medium text-white hover:bg-mathly-700 disabled:opacity-60"
          >
            {saving ? "Zapisywanie..." : "Zapisz"}
          </button>
          <Link
            href="/dashboard/admin/materialy"
            className="rounded-lg border border-slate-300 px-6 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            Anuluj
          </Link>
        </div>
      </form>
    </div>
  );
}
