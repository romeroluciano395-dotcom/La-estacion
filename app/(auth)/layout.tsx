import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/40 px-6 py-12">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="w-full max-w-md">{children}</div>
      <Link
        href="/"
        className="mt-8 text-sm text-muted-foreground hover:text-accent"
      >
        ← Volver al inicio
      </Link>
    </div>
  );
}
