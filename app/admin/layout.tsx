import type { Metadata } from "next";

import { AdminSidebar } from "@/components/layout/admin-sidebar";

export const metadata: Metadata = {
  title: "Panel de administración",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-secondary/30">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
