import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@mathly.pl" },
    update: {},
    create: {
      email: "admin@mathly.pl",
      passwordHash: hashedPassword,
      name: "Administrator",
      role: "admin",
    },
  });
  console.log("Utworzono użytkownika:", admin.email);

  const taskCount = await prisma.task.count();
  if (taskCount === 0) {
    await prisma.task.createMany({
      data: [
        {
          title: "Uprość wyrażenie",
          content: "Uprość wyrażenie: 2x + 3x - x + 5",
          solution:
            "Łączymy wyrazy podobne (te z x):\n\n2x + 3x - x = (2+3-1)x = 4x\n\nZostaje jeszcze +5:\n\n**Odpowiedź:** 4x + 5",
          gradeLevel: "6sp",
          topic: "algebra",
          difficulty: 1,
          order: 1,
        },
        {
          title: "Pole trójkąta",
          content:
            "Oblicz pole trójkąta, którego podstawa ma długość 10 cm, a wysokość opuszczona na tę podstawę wynosi 6 cm.",
          solution:
            "Używamy wzoru: P = 1/2 · a · h\n\nPodstawiamy: a = 10 cm, h = 6 cm\n\nP = 1/2 · 10 · 6 = 30\n\n**Odpowiedź:** Pole wynosi 30 cm².",
          gradeLevel: "6sp",
          topic: "geometria",
          difficulty: 1,
          order: 2,
        },
        {
          title: "Równanie z niewiadomą",
          content: "Rozwiąż równanie: 3x + 7 = 22",
          solution:
            "Odejmujemy 7 od obu stron:\n\n3x = 15\n\nDzielimy przez 3: x = 5\n\n**Odpowiedź:** x = 5",
          gradeLevel: "6sp",
          topic: "algebra",
          difficulty: 2,
          order: 3,
        },
      ],
    });
    console.log("Utworzono 3 zadania");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
