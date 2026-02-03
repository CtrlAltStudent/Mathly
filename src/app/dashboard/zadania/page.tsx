import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function ZadaniaPage() {
  const session = await auth();
  const user = session?.user?.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { gradeLevel: true },
      })
    : null;
  const gradeLevel = user?.gradeLevel;

  if (!gradeLevel) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8">
        <h2 className="text-xl font-bold text-slate-800">Zadania</h2>
        <p className="mt-2 text-slate-600">
          Wybierz klasę w ustawieniach profilu, aby zobaczyć zadania dopasowane do
          Twojego poziomu.
        </p>
        <Link
          href="/dashboard/profil"
          className="mt-4 inline-block text-mathly-600 hover:underline"
        >
          Przejdź do profilu →
        </Link>
      </div>
    );
  }

  const tasks = await prisma.task.findMany({
    where: { gradeLevel },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  const topicLabels: Record<string, string> = {
    algebra: "Algebra",
    geometria: "Geometria",
    statystyka: "Statystyka",
  };
  const difficultyLabels: Record<number, string> = {
    1: "Łatwe",
    2: "Średnie",
    3: "Trudne",
  };

  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8">
        <h2 className="text-xl font-bold text-slate-800">Zadania</h2>
        <p className="mt-2 text-slate-600">
          Brak zadań dla Twojej klasy. Wkrótce pojawią się nowe zadania.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800">Zadania</h2>
      <p className="mt-1 text-slate-600">
        Kliknij w zadanie, aby zobaczyć treść i rozwiązanie.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {tasks.map((task) => (
          <Link
            key={task.id}
            href={`/dashboard/zadania/${task.id}`}
            className="block rounded-xl border border-slate-200 bg-white p-6 hover:border-mathly-200 hover:shadow-sm transition"
          >
            <h3 className="font-semibold text-slate-800">{task.title}</h3>
            <div className="mt-2 flex gap-2">
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                {topicLabels[task.topic] ?? task.topic}
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                {difficultyLabels[task.difficulty] ?? task.difficulty}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
