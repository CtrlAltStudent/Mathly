import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nieautoryzowany" }, { status: 401 });
  }

  const lessons = await prisma.lesson.findMany({
    where: { studentId: session.user.id },
    orderBy: { startsAt: "asc" },
    include: {
      tutor: { select: { name: true, email: true } },
    },
  });

  return NextResponse.json({
    lessons: lessons.map((l) => ({
      id: l.id,
      startsAt: l.startsAt.toISOString(),
      endsAt: l.endsAt.toISOString(),
      status: l.status,
      note: l.note,
      tutor: l.tutor,
    })),
  });
}
