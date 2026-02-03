"use client";

import { useEffect, useState } from "react";

type Slot = { startsAt: string; endsAt: string };
type Lesson = {
  id: string;
  startsAt: string;
  endsAt: string;
  status: string;
  tutor: { name: string | null; email: string };
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function LekcjePage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<string | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const load = () => {
    Promise.all([
      fetch("/api/lekcje").then((r) => r.json()),
      fetch("/api/lekcje/moje").then((r) => r.json()),
    ]).then(([slotRes, lessonRes]) => {
      setSlots(slotRes.slots ?? []);
      setLessons(lessonRes.lessons ?? []);
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleBook = async (startsAt: string) => {
    setBooking(startsAt);
    setMessage(null);
    try {
      const res = await fetch("/api/lekcje", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startsAt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Błąd");
      setMessage({ ok: true, text: "Lekcja zarezerwowana!" });
      load();
    } catch (e) {
      setMessage({ ok: false, text: (e as Error).message });
    } finally {
      setBooking(null);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8">
        <p className="text-slate-600">Ładowanie...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Umów lekcję</h2>
        <p className="mt-1 text-slate-600">
          Wybierz dostępny termin z listy poniżej.
        </p>
      </div>

      {message && (
        <div
          className={`rounded-lg px-4 py-3 ${
            message.ok ? "bg-mathly-50 text-mathly-700" : "bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Dostępne terminy</h3>
        {slots.length === 0 ? (
          <p className="text-slate-600">
            Brak dostępnych terminów w najbliższych tygodniach.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {slots.map((slot) => (
              <button
                key={slot.startsAt}
                onClick={() => handleBook(slot.startsAt)}
                disabled={booking !== null}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-mathly-50 hover:border-mathly-200 disabled:opacity-60"
              >
                {formatDate(slot.startsAt)} {formatTime(slot.startsAt)} –{" "}
                {formatTime(slot.endsAt)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Moje lekcje</h3>
        {lessons.length === 0 ? (
          <p className="text-slate-600">Nie masz zaplanowanych lekcji.</p>
        ) : (
          <ul className="space-y-2">
            {lessons
              .filter((l) => l.status === "scheduled" && new Date(l.startsAt) > new Date())
              .map((l) => (
                <li
                  key={l.id}
                  className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0"
                >
                  <span>
                    {formatDate(l.startsAt)} {formatTime(l.startsAt)} –{" "}
                    {formatTime(l.endsAt)}
                  </span>
                  <span className="text-sm text-slate-500">
                    {l.tutor.name || l.tutor.email}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
