import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Logo } from "../components/Logo";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/logowanie?callbackUrl=/dashboard");

  const navItems = [
    { href: "/dashboard", label: "Przegląd" },
    { href: "/dashboard/materialy", label: "Materiały" },
    { href: "/dashboard/zadania", label: "Zadania" },
    { href: "/dashboard/lekcje", label: "Umów lekcję" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
          <Logo href="/dashboard" size="md" />
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-600 hover:text-slate-800 font-medium"
              >
                {item.label}
              </Link>
            ))}
            <span className="text-slate-400">|</span>
            <span className="text-sm text-slate-500">
              {session.user?.name || session.user?.email}
            </span>
            <form
              action={async () => {
                "use server";
                const { signOut } = await import("@/lib/auth");
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="text-sm text-slate-600 hover:text-slate-800"
              >
                Wyloguj
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
