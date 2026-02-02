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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
