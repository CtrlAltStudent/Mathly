"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function LogowanieForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setErrorMsg("Nieprawidłowy email lub hasło.");
        setLoading(false);
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setErrorMsg("Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Mathly</h1>
            <p className="text-slate-500 mt-1">Panel logowania</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {(error === "CredentialsSignin" || errorMsg) && (
              <div
                className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm"
                role="alert"
              >
                {errorMsg || "Nieprawidłowe dane logowania."}
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="np. uczen@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Hasło
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg transition-colors"
            >
              {loading ? "Logowanie..." : "Zaloguj się"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            Nie masz konta?{" "}
            <a href="/rejestracja" className="text-indigo-600 hover:underline">
              Zarejestruj się
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LogowaniePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Ładowanie...</div>}>
      <LogowanieForm />
    </Suspense>
  );
}
