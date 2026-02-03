import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { Logo } from "./Logo";

export async function Header() {
  const session = await auth();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex h-20 w-full items-center justify-between px-4 md:px-8">
        <Logo href={session ? "/dashboard" : "/"} size="md" />
        <nav className="flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg bg-mathly-600 px-4 py-2 text-sm font-medium text-white hover:bg-mathly-700"
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
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
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
                className="rounded-lg bg-mathly-600 px-4 py-2 text-sm font-medium text-white hover:bg-mathly-700"
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
