"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Logo } from "../components/Logo";

export default function RejestracjaPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/rejestracja", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: name || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Wystąpił błąd");
        setLoading(false);
        return;
      }
      router.push("/logowanie?registered=1");
      router.refresh();
    } catch {
      setError("Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <Logo href="/" size="lg" className="mx-auto" />
            <p className="text-slate-500 mt-4">Rejestracja</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div
                className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm"
                role="alert"
              >
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Imię (opcjonalnie)
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-mathly-500 focus:border-mathly-500 outline-none transition"
                placeholder="Jan"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-mathly-500 focus:border-mathly-500 outline-none transition"
                placeholder="np. uczen@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Hasło * (min. 6 znaków)
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-mathly-500 focus:border-mathly-500 outline-none transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-mathly-600 hover:bg-mathly-700 disabled:bg-mathly-400 text-white font-medium rounded-lg transition-colors"
            >
              {loading ? "Rejestracja..." : "Zarejestruj się"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            Masz już konto?{" "}
            <Link href="/logowanie" className="text-mathly-600 hover:underline">
              Zaloguj się
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
