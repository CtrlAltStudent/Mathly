import Link from "next/link";
import { notFound } from "next/navigation";
import { getMaterial } from "@/lib/content";
import { MarkdownRenderer } from "@/app/components/MarkdownRenderer";

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const material = getMaterial(slug);
  if (!material) notFound();

  return (
    <div>
      <Link
        href="/dashboard/materialy"
        className="text-sm text-mathly-600 hover:underline mb-4 inline-block"
      >
        ← Wróć do materiałów
      </Link>
      <div className="rounded-xl border border-slate-200 bg-white p-8 mt-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">{material.title}</h1>
        <MarkdownRenderer content={material.content} />
      </div>
    </div>
  );
}
