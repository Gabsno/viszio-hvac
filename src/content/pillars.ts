import type { PillarMeta } from '../types';

// Pillars are the top level of the library tree — organised by function, the
// way a working HVAC engineer thinks. The `slug` matches the `pillar` field in
// article frontmatter. `icon` is a lucide-react name (see components/Icon.tsx).
export const PILLARS: PillarMeta[] = [
  {
    slug: 'fundamentals',
    title: 'Fundamentals',
    description:
      'Psychrometrics, heat transfer, airflow and the refrigeration cycle — the physics under every HVAC decision.',
    icon: 'Sigma',
  },
  {
    slug: 'load-calculations',
    title: 'Load Calculations',
    description:
      'How to size a system — cooling and heating loads, internal gains, solar, infiltration, and the CLTD and RTS methods.',
    icon: 'Calculator',
  },
  {
    slug: 'cooling',
    title: 'Cooling & Refrigeration',
    description:
      'Chillers, DX and VRF systems, cooling towers, cold rooms and refrigerants.',
    icon: 'Snowflake',
  },
  {
    slug: 'heating',
    title: 'Heating',
    description: 'Boilers, heat pumps and hot water heating systems.',
    icon: 'Flame',
  },
  {
    slug: 'ducting',
    title: 'Air Distribution & Ducting',
    description:
      'Duct design and construction, dampers, diffusers, kitchen exhaust, air handling units, fans and VAV systems.',
    icon: 'Wind',
  },
  {
    slug: 'piping',
    title: 'Piping & Hydronics',
    description:
      'Chilled and condenser water, pipe sizing, pumps, valves and expansion.',
    icon: 'Droplets',
  },
  {
    slug: 'ventilation',
    title: 'Ventilation & Air Quality',
    description:
      'Fresh air rates, exhaust systems, filtration and building pressurization.',
    icon: 'Fan',
  },
  {
    slug: 'controls',
    title: 'Controls, BMS & Commissioning',
    description:
      'Sequences of operation, building management systems, commissioning and balancing.',
    icon: 'SlidersHorizontal',
  },
  {
    slug: 'standards',
    title: 'Standards & Codes',
    description:
      'Study guides for ASHRAE, SMACNA, ACCA, AHRI, the mechanical code and NFPA 96.',
    icon: 'BookMarked',
  },
  {
    slug: 'sustainability',
    title: 'Energy & Sustainability',
    description:
      'Energy codes, IFC EDGE, the Kigali Amendment and practical efficiency measures.',
    icon: 'Leaf',
  },
];

// Human-readable topic titles keyed by the `topic` frontmatter slug.
export const TOPIC_TITLES: Record<string, string> = {
  // Fundamentals
  psychrometrics: 'Psychrometrics',
  'refrigeration-cycle': 'The Refrigeration Cycle',
  'heat-transfer': 'Heat Transfer',
  'airflow-basics': 'Airflow Basics',
  units: 'Units & Conversions',
  // Load calculations
  'load-fundamentals': 'Load Calculation Basics',
  'load-methods': 'Load Calculation Methods',
  'load-components': 'Load Components',
  // Cooling & refrigeration
  chillers: 'Chillers',
  'vrf-vrv': 'VRF / VRV Systems',
  'cooling-towers': 'Cooling Towers',
  'cold-rooms': 'Cold Rooms',
  'dx-systems': 'DX & Packaged Systems',
  refrigerants: 'Refrigerants',
  'chilled-water': 'Chilled Water Systems',
  // Heating
  boilers: 'Boilers',
  'heat-pumps': 'Heat Pumps',
  'heating-systems': 'Heating Systems',
  // Air distribution & ducting
  'duct-design': 'Duct Design & Construction',
  dampers: 'Dampers',
  'specialty-exhaust': 'Kitchen & Specialty Exhaust',
  'air-handling-units': 'Air Handling Units',
  'fan-coil-units': 'Fan Coil Units',
  'air-terminals': 'Diffusers, Grilles & Louvers',
  'air-systems': 'Air Systems & Fans',
  // Piping & hydronics
  'pipe-sizing': 'Pipe Sizing & Materials',
  pumps: 'Pumps',
  valves: 'Valves',
  hydronics: 'Hydronic Systems',
  // Ventilation
  ventilation: 'Ventilation',
  exhaust: 'Exhaust Systems',
  'air-quality': 'Air Quality & Filtration',
  // Controls
  'sequences-of-operation': 'Sequences of Operation',
  commissioning: 'Commissioning & Balancing',
  bms: 'Building Management Systems',
  // Standards
  ashrae: 'ASHRAE',
  smacna: 'SMACNA',
  acca: 'ACCA',
  ahri: 'AHRI',
  icc: 'Mechanical Code',
  nfpa: 'NFPA',
  // Sustainability
  edge: 'IFC EDGE',
  'kigali-amendment': 'Kigali Amendment',
  efficiency: 'Energy Efficiency',
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
