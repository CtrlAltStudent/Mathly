import Link from "next/link";
import { auth } from "@/lib/auth";
import { Header } from "./components/Header";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16">
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
              <Link
                href="/logowanie"
                className="rounded-lg bg-mathly-600 px-6 py-3 font-medium text-white hover:bg-mathly-700 transition-colors"
              >
                Zaloguj się
              </Link>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
