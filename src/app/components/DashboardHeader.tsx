import { auth, signOut } from "@/lib/auth";

export async function DashboardHeader() {
  const session = await auth();

  return (
    <header className="flex h-16 items-center justify-end border-b border-slate-200 bg-white px-6 shrink-0">
      <form
        action={async () => {
          "use server";
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
    </header>
  );
}
