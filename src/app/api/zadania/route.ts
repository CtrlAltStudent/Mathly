import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nieautoryzowany" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { gradeLevel: true },
  });

  const gradeLevel = user?.gradeLevel;
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic");
  const difficulty = searchParams.get("difficulty");

  if (!gradeLevel) {
    return NextResponse.json({ tasks: [] });
  }

  const where: Record<string, unknown> = { gradeLevel };
  if (topic) where.topic = topic;
  if (difficulty) where.difficulty = parseInt(difficulty, 10);

  const tasks = await prisma.task.findMany({
    where,
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      title: true,
      gradeLevel: true,
      topic: true,
      difficulty: true,
    },
  });

  return NextResponse.json({ tasks });
}
