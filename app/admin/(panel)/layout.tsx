import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: { default: "Panel", template: "%s · Panel La Estación" },
  robots: { index: false, follow: false },
};

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <AdminShell
      user={{
        name: session.user.name ?? "Usuario",
        email: session.user.email ?? "",
        role: session.user.role,
      }}
    >
      {children}
    </AdminShell>
  );
}
