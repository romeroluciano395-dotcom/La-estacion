"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Users, Bus, CalendarClock, Smile } from "lucide-react";

import { Section } from "@/components/shared/section";
import { Card } from "@/components/ui/card";

const STATS = [
  { icon: Users, value: 30000, prefix: "+", suffix: "", label: "Pasajeros transportados" },
  { icon: Bus, value: 500, prefix: "+", suffix: "", label: "Viajes realizados" },
  { icon: CalendarClock, value: 10, prefix: "+", suffix: "", label: "Años de experiencia" },
  { icon: Smile, value: 98, prefix: "", suffix: "%", label: "Clientes satisfechos" },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value.toLocaleString("es-AR")}</span>;
}

export function Stats() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="h-full p-6 text-center sm:p-8">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30">
                <stat.icon className="h-6 w-6" />
              </span>
              <div className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {stat.prefix}
                <Counter to={stat.value} />
                {stat.suffix}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
