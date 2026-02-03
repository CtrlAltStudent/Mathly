import Link from "next/link";
import { auth } from "@/lib/auth";
import { Header } from "./components/Header";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="w-full px-4 py-16 md:px-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 sm:text-5xl">
            Korepetycje z matematyki
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Materiały, zadania i indywidualne lekcje dla uczniów klas 6–8
            podstawówki oraz maturzystów.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {session ? (
              <Link
                href="/dashboard"
                className="rounded-lg bg-mathly-600 px-6 py-3 font-medium text-white hover:bg-mathly-700 transition-colors"
              >
                Przejdź do panelu
              </Link>
            ) : (
              <>
                <Link
                  href="/rejestracja"
                  className="rounded-lg border border-mathly-600 px-6 py-3 font-medium text-mathly-600 hover:bg-mathly-50 transition-colors"
                >
                  Rejestracja
                </Link>
                <Link
                  href="/logowanie"
                  className="rounded-lg bg-mathly-600 px-6 py-3 font-medium text-white hover:bg-mathly-700 transition-colors"
                >
                  Zaloguj się
                </Link>
              </>
            )}
          </div>
        </section>

        <section className="mx-auto mt-24 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold text-slate-800">Materiały</h3>
            <p className="mt-2 text-sm text-slate-600">
              Teoria i przykłady dopasowane do klasy – algebra, geometria i więcej.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold text-slate-800">Zadania</h3>
            <p className="mt-2 text-sm text-slate-600">
              Ćwiczenia z rozwiązaniami krok po kroku.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold text-slate-800">Lekcje online</h3>
            <p className="mt-2 text-sm text-slate-600">
              Umów indywidualną lekcję w dogodnym terminie.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold text-slate-800">Tablica</h3>
            <p className="mt-2 text-sm text-slate-600">
              Rysuj i rozwiązuj zadania na wspólnej tablicy.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-4xl rounded-xl border border-mathly-100 bg-mathly-50 p-8 text-center">
          <h2 className="text-xl font-bold text-mathly-900">Dla kogo?</h2>
          <p className="mt-2 text-mathly-700">
            Uczniowie klas 6–8 szkoły podstawowej oraz maturzyści przygotowujący
            się do egzaminu.
          </p>
        </section>
      </main>
    </div>
  );
}
