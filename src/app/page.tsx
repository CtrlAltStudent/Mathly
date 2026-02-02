import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold text-slate-800">
            Mathly
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/rejestracja"
              className="text-slate-600 hover:text-slate-800"
            >
              Rejestracja
            </Link>
            <Link
              href="/logowanie"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Zaloguj się
            </Link>
          </nav>
        </div>
      </header>
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
            <Link
              href="/logowanie"
              className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
            >
              Zaloguj się
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
