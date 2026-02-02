"use client";

import { useEffect, useState } from "react";

const GRADE_OPTIONS = [
  { value: "", label: "— Nie wybrano —" },
  { value: "6sp", label: "Klasa 6 SP" },
  { value: "7sp", label: "Klasa 7 SP" },
  { value: "8sp", label: "Klasa 8 SP" },
  { value: "1lo", label: "Klasa 1 LO" },
  { value: "2lo", label: "Klasa 2 LO" },
  { value: "matura", label: "Klasa 3 LO / Matura" },
];

export default function ProfilPage() {
  const [name, setName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/profil")
      .then((r) => r.json())
      .then((data) => {
        setName(data.name ?? "");
        setGradeLevel(data.gradeLevel ?? "");
      })
      .catch(() => setMessage({ type: "err", text: "Nie udało się załadować profilu" }))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/profil", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || undefined,
          gradeLevel: gradeLevel || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Błąd");
      setMessage({ type: "ok", text: "Profil zapisany" });
    } catch {
      setMessage({ type: "err", text: "Nie udało się zapisać profilu" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8">
        <p className="text-slate-600">Ładowanie profilu...</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8">
      <h2 className="text-xl font-bold text-slate-800">Ustawienia profilu</h2>
      <p className="mt-1 text-slate-600">
        Wybierz klasę – materiały i zadania będą dopasowane do Twojego poziomu.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md">
        {message && (
          <div
            className={`rounded-lg px-4 py-3 text-sm ${
              message.type === "ok"
                ? "bg-mathly-50 text-mathly-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Imię
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-mathly-500 focus:border-mathly-500 outline-none"
            placeholder="np. Jan"
          />
        </div>
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-slate-700 mb-1">
            Klasa
          </label>
          <select
            id="grade"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-mathly-500 focus:border-mathly-500 outline-none"
          >
            {GRADE_OPTIONS.map((opt) => (
              <option key={opt.value || "empty"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-mathly-600 px-4 py-2 font-medium text-white hover:bg-mathly-700 disabled:opacity-60"
        >
          {saving ? "Zapisywanie..." : "Zapisz"}
        </button>
      </form>
    </div>
  );
}
