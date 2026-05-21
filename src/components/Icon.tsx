import {
  Sigma,
  Fan,
  BookMarked,
  SlidersHorizontal,
  Leaf,
  Snowflake,
  Wind,
  Gauge,
  Thermometer,
  Wrench,
  Building2,
  Ruler,
  type LucideIcon,
} from 'lucide-react';

// Curated icon set used for pillars and course modules — keeps the bundle
// small versus importing the whole lucide-react namespace.
const ICONS: Record<string, LucideIcon> = {
  Sigma,
  Fan,
  BookMarked,
  SlidersHorizontal,
  Leaf,
  Snowflake,
  Wind,
  Gauge,
  Thermometer,
  Wrench,
  Building2,
  Ruler,
};

interface Props {
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: Props) {
  const Cmp = ICONS[name] ?? BookMarked;
  return <Cmp size={size} className={className} />;
}
