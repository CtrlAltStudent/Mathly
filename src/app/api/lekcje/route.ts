import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  getAvailableSlotDates,
  getSlotEnd,
  SLOT_DURATION,
} from "@/lib/availability";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nieautoryzowany" }, { status: 401 });
  }

  const tutor = await prisma.user.findFirst({
    where: { role: "admin" },
    select: { id: true },
  });
  if (!tutor) {
    return NextResponse.json({
      slots: [],
      message: "Brak skonfigurowanego korepetytora",
    });
  }

  const slotDates = getAvailableSlotDates(4);
  const existingLessons = await prisma.lesson.findMany({
    where: {
      tutorId: tutor.id,
      status: "scheduled",
      startsAt: { gte: new Date() },
    },
    select: { startsAt: true },
  });
  const bookedStarts = new Set(
    existingLessons.map((l) => l.startsAt.getTime())
  );

  const slots = slotDates
    .filter((d) => !bookedStarts.has(d.getTime()))
    .map((d) => ({
      startsAt: d.toISOString(),
      endsAt: getSlotEnd(d, SLOT_DURATION).toISOString(),
    }));

  return NextResponse.json({ slots });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nieautoryzowany" }, { status: 401 });
  }

  const tutor = await prisma.user.findFirst({
    where: { role: "admin" },
    select: { id: true },
  });
  if (!tutor) {
    return NextResponse.json(
      { error: "Brak skonfigurowanego korepetytora" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const startsAt = body.startsAt ? new Date(body.startsAt) : null;

  if (!startsAt || isNaN(startsAt.getTime())) {
    return NextResponse.json(
      { error: "Nieprawidłowa data rozpoczęcia" },
      { status: 400 }
    );
  }

  const endsAt = getSlotEnd(startsAt, SLOT_DURATION);

  const conflicting = await prisma.lesson.findFirst({
    where: {
      tutorId: tutor.id,
      status: "scheduled",
      startsAt,
    },
  });

  if (conflicting) {
    return NextResponse.json(
      { error: "Ten termin jest już zajęty" },
      { status: 400 }
    );
  }

  const lesson = await prisma.lesson.create({
    data: {
      studentId: session.user.id,
      tutorId: tutor.id,
      startsAt,
      endsAt,
      status: "scheduled",
      note: body.note ?? null,
    },
  });

  return NextResponse.json({ success: true, id: lesson.id });
}
