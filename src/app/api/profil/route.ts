import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const GRADE_OPTIONS = [
  { value: "6sp", label: "Klasa 6 SP" },
  { value: "7sp", label: "Klasa 7 SP" },
  { value: "8sp", label: "Klasa 8 SP" },
  { value: "1lo", label: "Klasa 1 LO" },
  { value: "2lo", label: "Klasa 2 LO" },
  { value: "matura", label: "Klasa 3 LO / Matura" },
] as const;

const updateProfilSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  gradeLevel: z.enum(["6sp", "7sp", "8sp", "1lo", "2lo", "matura"]).optional().nullable(),
});

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nieautoryzowany" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const data = updateProfilSchema.parse(body);
    const gradeLabel = data.gradeLevel
      ? GRADE_OPTIONS.find((g) => g.value === data.gradeLevel)?.label ?? null
      : null;

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        gradeLevel: data.gradeLevel,
        gradeLabel,
      },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues[0]?.message ?? "Błąd walidacji" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Wystąpił błąd" }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nieautoryzowany" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, gradeLevel: true, gradeLabel: true },
  });
  if (!user) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });
  return NextResponse.json(user);
}
