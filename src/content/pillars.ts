import type { PillarMeta } from '../types';

// Pillar definitions — the top level of the library tree. The `slug` matches
// the `pillar` field in article frontmatter. `icon` is a lucide-react name.
export const PILLARS: PillarMeta[] = [
  {
    slug: 'core-engineering',
    title: 'Core Engineering',
    description:
      'The physics fundamentals — psychrometrics, load calculations, duct and pipe sizing, the refrigeration cycle.',
    icon: 'Sigma',
  },
  {
    slug: 'equipment',
    title: 'Equipment',
    description:
      'Chillers, VRF/VRV, air handling units, fan coil units, cooling towers, pumps and fans.',
    icon: 'Fan',
  },
  {
    slug: 'standards',
    title: 'Standards',
    description:
      'Study guides for ASHRAE, SMACNA, ACCA, AHRI and ICC — what each standard covers and how to use it.',
    icon: 'BookMarked',
  },
  {
    slug: 'controls-bms-commissioning',
    title: 'Controls, BMS & Commissioning',
    description:
      'Sequences of operation, building management systems, and the commissioning process.',
    icon: 'SlidersHorizontal',
  },
  {
    slug: 'energy-iaq-sustainability',
    title: 'Energy, IAQ & Sustainability',
    description:
      'Energy codes, indoor air quality, LEED, IFC EDGE, WELL and the Kigali Amendment.',
    icon: 'Leaf',
  },
  {
    slug: 'refrigeration-low-temp',
    title: 'Refrigeration & Low-Temp',
    description: 'Cold rooms, low-temperature systems and industrial refrigeration.',
    icon: 'Snowflake',
  },
];

// Human-readable topic titles keyed by the `topic` frontmatter slug.
export const TOPIC_TITLES: Record<string, string> = {
  psychrometrics: 'Psychrometrics',
  'load-calculations': 'Load Calculations',
  'duct-design': 'Duct Design',
  'pipe-sizing': 'Pipe Sizing',
  'fan-pump-laws': 'Fan & Pump Laws',
  'refrigeration-cycle': 'Refrigeration Cycle',
  chillers: 'Chillers',
  'vrf-vrv': 'VRF / VRV Systems',
  'air-handling-units': 'Air Handling Units',
  'fan-coil-units': 'Fan Coil Units',
  boilers: 'Boilers',
  'cooling-towers': 'Cooling Towers',
  'pumps-and-fans': 'Pumps & Fans',
  ashrae: 'ASHRAE',
  smacna: 'SMACNA',
  acca: 'ACCA',
  ahri: 'AHRI',
  icc: 'ICC',
  'sequences-of-operation': 'Sequences of Operation',
  commissioning: 'Commissioning',
  'energy-codes': 'Energy Codes',
  iaq: 'Indoor Air Quality',
  leed: 'LEED',
  edge: 'IFC EDGE',
  well: 'WELL',
  'kigali-amendment': 'Kigali Amendment',
  'cold-rooms': 'Cold Rooms',
};

export function pillarTitle(slug: string): string {
  return PILLARS.find((p) => p.slug === slug)?.title ?? slug;
}

export function topicTitle(slug: string): string {
  return (
    TOPIC_TITLES[slug] ??
    slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  );
}
