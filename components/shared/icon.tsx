import {
  Music,
  Palmtree,
  Trophy,
  Plane,
  Users,
  PartyPopper,
  LayoutDashboard,
  Ticket,
  Bus,
  BarChart3,
  type LucideProps,
} from "lucide-react";

/** Mapa de iconos usados por nombre (datos → componente). */
const ICONS = {
  Music,
  Palmtree,
  Trophy,
  Plane,
  Users,
  PartyPopper,
  LayoutDashboard,
  Ticket,
  Bus,
  BarChart3,
} as const;

export type IconName = keyof typeof ICONS;

interface IconProps extends LucideProps {
  name: IconName | string;
}

export function Icon({ name, ...props }: IconProps) {
  const Component = ICONS[name as IconName] ?? Bus;
  return <Component {...props} />;
}
