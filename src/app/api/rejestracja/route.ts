import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const registerSchema = z.object({
  email: z.string().email("Nieprawidłowy email"),
  password: z.string().min(6, "Hasło min. 6 znaków"),
  name: z.string().min(1, "Imię jest wymagane").optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = registerSchema.parse(body);
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Konto z tym adresem email już istnieje" },
        { status: 400 }
      );
    }
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: { email, passwordHash, name: name ?? null, role: "student" },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues[0]?.message ?? "Błąd walidacji" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Wystąpił błąd podczas rejestracji" },
      { status: 500 }
    );
  }
}
