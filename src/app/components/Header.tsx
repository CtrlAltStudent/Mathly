import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

export async function Header() {
  const session = await auth();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href={session ? "/dashboard" : "/"} className="text-xl font-bold text-slate-800">
          Mathly
        </Link>
        <nav className="flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Przejdź do panelu
              </Link>
              <span className="text-slate-500 text-sm">
                {session.user?.name || session.user?.email}
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Wyloguj się
                </button>
              </form>
            </>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
