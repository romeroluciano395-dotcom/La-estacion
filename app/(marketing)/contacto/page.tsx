import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { SITE } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/shared/motion";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contactate con La Estación para consultas y reservas.",
};

const INFO = [
  { icon: Phone, label: "Teléfono", value: SITE.phone },
  { icon: Mail, label: "Email", value: SITE.email },
  { icon: MapPin, label: "Dirección", value: SITE.address },
];

export default function ContactoPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <FadeIn>
          <SectionHeading
            eyebrow="Contacto"
            title="Hablemos de tu viaje"
            description="Escribinos y te respondemos a la brevedad."
          />
        </FadeIn>

        <div className="mx-auto mt-14 grid max-w-4xl gap-10 lg:grid-cols-2">
          <FadeIn>
            <div className="space-y-4">
              {INFO.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-background p-5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Card>
              <CardContent className="pt-6">
                <ContactForm />
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
