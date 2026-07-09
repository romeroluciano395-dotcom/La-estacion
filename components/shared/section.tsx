import { cn } from "@/lib/utils";

/**
 * Envoltura estándar de sección: espaciado vertical generoso y
 * contenedor centrado. Garantiza ritmo consistente en toda la app.
 */
export function Section({
  children,
  className,
  containerClassName,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-24 lg:py-32", className)}
    >
      <div className={cn("container-app", containerClassName)}>{children}</div>
    </section>
  );
}
