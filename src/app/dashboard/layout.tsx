import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Sidebar } from "../components/Sidebar";
import { DashboardHeader } from "../components/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/logowanie?callbackUrl=/dashboard");

  const user = await prisma.user.findUnique({
    where: { id: session.user?.id ?? "" },
    select: { role: true, email: true, name: true },
  });

  const adminItems =
    user?.role === "admin"
      ? [{ href: "/dashboard/admin", label: "Panel admina", icon: "⚙️" }]
      : [];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        adminItems={adminItems}
        userEmail={user?.email}
        userName={user?.name}
      />
      <div className="flex flex-1 flex-col min-w-0">
        <DashboardHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
