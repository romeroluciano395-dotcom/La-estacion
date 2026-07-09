"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Variantes base — animaciones naturales, no exageradas             */
/* ------------------------------------------------------------------ */

const DISTANCE = 28;
const EASE = [0.22, 1, 0.36, 1] as const;

export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: DISTANCE },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -DISTANCE },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: DISTANCE },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: -DISTANCE },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
} satisfies Record<string, Variants>;

export type RevealVariant = keyof typeof variants;

/* ------------------------------------------------------------------ */
/*  Reveal — anima al entrar en viewport (scroll reveal)              */
/* ------------------------------------------------------------------ */

interface RevealProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  once = true,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants[variant]}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stagger — hijos animados en cascada                               */
/* ------------------------------------------------------------------ */

export function Stagger({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = 0.1,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren, staggerChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "fadeUp",
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
}) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hover — microinteracción de elevación + escala                    */
/* ------------------------------------------------------------------ */

export function HoverLift({
  children,
  className,
  scale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale, y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Alias de compatibilidad (usados por páginas existentes)           */
/* ------------------------------------------------------------------ */

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal variant="fadeUp" delay={delay} className={className}>
      {children}
    </Reveal>
  );
}

export const StaggerGroup = Stagger;
