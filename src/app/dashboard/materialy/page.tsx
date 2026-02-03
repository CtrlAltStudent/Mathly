import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getMaterials, GRADE_LABELS } from "@/lib/content";

type MaterialItem = { slug: string; title: string; topic: string };

export default async function MaterialyPage() {
  const session = await auth();
  const user = session?.user?.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { gradeLevel: true },
      })
    : null;
  const gradeLevel = user?.gradeLevel ?? undefined;

  const fileMaterials: MaterialItem[] = gradeLevel ? getMaterials(gradeLevel) : [];
  const dbMaterials =
    gradeLevel
      ? await prisma.material.findMany({
          where: { gradeLevel },
          orderBy: [{ topic: "asc" }, { order: "asc" }],
          select: { slug: true, title: true, topic: true },
        })
      : [];

  const seenSlugs = new Set<string>();
  const materials: MaterialItem[] = [];
  for (const m of dbMaterials) {
    if (!seenSlugs.has(m.slug)) {
      seenSlugs.add(m.slug);
      materials.push(m);
    }
  }
  for (const m of fileMaterials) {
    if (!seenSlugs.has(m.slug)) {
      seenSlugs.add(m.slug);
      materials.push(m);
    }
  }

  if (materials.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8">
        <h2 className="text-xl font-bold text-slate-800">Materiały</h2>
        <p className="mt-2 text-slate-600">
          {gradeLevel
            ? `Brak materiałów dla ${GRADE_LABELS[gradeLevel] ?? gradeLevel}. Wybierz inną klasę w profilu.`
            : "Wybierz klasę w ustawieniach profilu, aby zobaczyć materiały dopasowane do Twojego poziomu."}
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

  const byTopic = materials.reduce<Record<string, typeof materials>>((acc, m) => {
    const key = m.topic;
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  const topicLabels: Record<string, string> = {
    algebra: "Algebra",
    geometria: "Geometria",
    statystyka: "Statystyka",
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800">Materiały</h2>
      <p className="mt-1 text-slate-600">
        {gradeLevel && (
          <>
            Materiały dla {GRADE_LABELS[gradeLevel] ?? gradeLevel}.{" "}
            <Link href="/dashboard/profil" className="text-mathly-600 hover:underline">
              Zmień klasę
            </Link>
          </>
        )}
      </p>

      <div className="mt-6 space-y-8">
        {Object.entries(byTopic).map(([topic, items]) => (
          <section key={topic}>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              {topicLabels[topic] ?? topic}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((m) => (
                <Link
                  key={m.slug}
                  href={`/dashboard/materialy/${m.slug}`}
                  className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-mathly-200 hover:shadow-sm transition"
                >
                  <span className="font-medium text-slate-800">{m.title}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
