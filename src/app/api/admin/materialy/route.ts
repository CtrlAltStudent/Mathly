import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ą/g, "a")
    .replace(/ć/g, "c")
    .replace(/ę/g, "e")
    .replace(/ł/g, "l")
    .replace(/ń/g, "n")
    .replace(/ó/g, "o")
    .replace(/ś/g, "s")
    .replace(/ź|ż/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET() {
  const session = await auth();
  const user = session?.user?.id
    ? await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } })
    : null;
  if (user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const materials = await prisma.material.findMany({
    orderBy: [{ gradeLevel: "asc" }, { topic: "asc" }, { order: "asc" }],
  });
  return NextResponse.json({ materials });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const user = session?.user?.id
    ? await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } })
    : null;
  if (user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { title, content, gradeLevel, topic, order = 0 } = body;

  if (!title || !content || !gradeLevel || !topic) {
    return NextResponse.json(
      { error: "Brak wymaganych pól: title, content, gradeLevel, topic" },
      { status: 400 }
    );
  }

  const baseSlug = `${gradeLevel}-${topic}-${slugify(title)}`;
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.material.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const material = await prisma.material.create({
    data: { title, content, slug, gradeLevel, topic, order },
  });
  return NextResponse.json(material);
}
