"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MarkdownRenderer } from "@/app/components/MarkdownRenderer";

type Task = {
  id: string;
  title: string;
  content: string;
  solution: string;
  topic: string;
  difficulty: number;
};

export default function ZadaniePage() {
  const params = useParams();
  const id = params.id as string;
  const [task, setTask] = useState<Task | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/zadania/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setTask)
      .catch(() => setTask(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8">
        <p className="text-slate-600">Ładowanie...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8">
        <p className="text-slate-600">Nie znaleziono zadania.</p>
        <Link href="/dashboard/zadania" className="mt-4 inline-block text-mathly-600 hover:underline">
          ← Wróć do zadań
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/dashboard/zadania"
        className="text-sm text-mathly-600 hover:underline mb-4 inline-block"
      >
        ← Wróć do zadań
      </Link>
      <div className="rounded-xl border border-slate-200 bg-white p-8 mt-4 space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">{task.title}</h1>
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Treść zadania</h2>
          <MarkdownRenderer content={task.content} />
        </section>
        <section>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="rounded-lg bg-mathly-600 px-4 py-2 font-medium text-white hover:bg-mathly-700"
          >
            {showSolution ? "Ukryj rozwiązanie" : "Pokaż rozwiązanie"}
          </button>
          {showSolution && (
            <div className="mt-4 rounded-lg border border-mathly-200 bg-mathly-50 p-6">
              <h3 className="font-semibold text-mathly-900 mb-3">Rozwiązanie</h3>
              <MarkdownRenderer content={task.solution} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
