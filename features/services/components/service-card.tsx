import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Service } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/shared/icon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/servicios/${service.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl">
        <div className="flex h-full flex-col p-6">
          <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
            <Icon name={service.icon} className="h-6 w-6" />
          </span>

          <h3 className="font-display text-lg font-semibold">
            {service.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {service.shortDescription}
          </p>

          <CardContent className="mt-5 flex items-center justify-between p-0">
            <span className="text-sm text-muted-foreground">
              Desde{" "}
              <span className="font-semibold text-foreground">
                {formatCurrency(service.fromPrice)}
              </span>
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-accent">
              Ver más
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
