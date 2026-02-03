import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/logowanie?callbackUrl=/dashboard/admin");

  const user = await prisma.user.findUnique({
    where: { id: session.user?.id ?? "" },
    select: { role: true },
  });

  if (user?.role !== "admin") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
