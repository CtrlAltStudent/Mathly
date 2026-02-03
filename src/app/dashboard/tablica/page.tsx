"use client";

import { useCallback } from "react";
import Link from "next/link";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

export default function TablicaPage() {
  const handleMount = useCallback(() => {
    // Opcjonalnie: konfiguracja po zamontowaniu
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Tablica</h2>
          <p className="text-sm text-slate-600">
            Rysuj, pisz i rozwiązuj zadania. Użyj narzędzi po lewej stronie.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-mathly-600 hover:underline"
        >
          ← Wróć do panelu
        </Link>
      </div>
      <div className="flex-1 min-h-0 rounded-xl border border-slate-200 overflow-hidden bg-white">
        <Tldraw onMount={handleMount} />
      </div>
    </div>
  );
}
