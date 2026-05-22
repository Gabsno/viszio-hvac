// Outdoor design conditions for HVAC sizing across Ghana and wider Africa.
//
// Values are representative engineering design figures (roughly the warm-season
// ~0.4% cooling condition). They are a sound starting point, but for a real
// project confirm against ASHRAE design weather data or local meteorological
// records for the exact site.

export interface DesignCity {
  city: string;
  country: string;
  region: 'Ghana' | 'Africa';
  elevation: number; // m
  coolingDB: number; // summer design dry-bulb, °C
  coolingMCWB: number; // mean coincident wet-bulb, °C
  climate: string; // short climate descriptor
}

export const DESIGN_CITIES: DesignCity[] = [
  // --- Ghana ---
  {
    city: 'Accra',
    country: 'Ghana',
    region: 'Ghana',
    elevation: 61,
    coolingDB: 33,
    coolingMCWB: 26,
    climate: 'Coastal, hot and humid year-round',
  },
  {
    city: 'Tema',
    country: 'Ghana',
    region: 'Ghana',
    elevation: 10,
    coolingDB: 33,
    coolingMCWB: 26,
    climate: 'Coastal, hot and humid',
  },
  {
    city: 'Takoradi',
    country: 'Ghana',
    region: 'Ghana',
    elevation: 4,
    coolingDB: 32,
    coolingMCWB: 26,
    climate: 'Coastal, hot and humid',
  },
  {
    city: 'Cape Coast',
    country: 'Ghana',
    region: 'Ghana',
    elevation: 12,
    coolingDB: 32,
    coolingMCWB: 26,
    climate: 'Coastal, hot and humid',
  },
  {
    city: 'Kumasi',
    country: 'Ghana',
    region: 'Ghana',
    elevation: 250,
    coolingDB: 33,
    coolingMCWB: 25,
    climate: 'Inland forest, warm and humid',
  },
  {
    city: 'Koforidua',
    country: 'Ghana',
    region: 'Ghana',
    elevation: 172,
    coolingDB: 33,
    coolingMCWB: 25,
    climate: 'Inland, warm and humid',
  },
  {
    city: 'Sunyani',
    country: 'Ghana',
    region: 'Ghana',
    elevation: 309,
    coolingDB: 34,
    coolingMCWB: 24,
    climate: 'Inland transition zone',
  },
  {
    city: 'Ho',
    country: 'Ghana',
    region: 'Ghana',
    elevation: 158,
    coolingDB: 34,
    coolingMCWB: 25,
    climate: 'Inland, warm and humid',
  },
  {
    city: 'Tamale',
    country: 'Ghana',
    region: 'Ghana',
    elevation: 168,
    coolingDB: 39,
    coolingMCWB: 27,
    climate: 'Northern savanna, hot — dry Harmattan season',
  },
  {
    city: 'Wa',
    country: 'Ghana',
    region: 'Ghana',
    elevation: 320,
    coolingDB: 40,
    coolingMCWB: 26,
    climate: 'Northern savanna, very hot and dry season',
  },
  {
    city: 'Bolgatanga',
    country: 'Ghana',
    region: 'Ghana',
    elevation: 200,
    coolingDB: 40,
    coolingMCWB: 27,
    climate: 'Upper-east savanna, very hot',
  },
  // --- Wider Africa ---
  {
    city: 'Lagos',
    country: 'Nigeria',
    region: 'Africa',
    elevation: 11,
    coolingDB: 33,
    coolingMCWB: 27,
    climate: 'Coastal, hot and very humid',
  },
  {
    city: 'Abidjan',
    country: "Côte d'Ivoire",
    region: 'Africa',
    elevation: 18,
    coolingDB: 33,
    coolingMCWB: 27,
    climate: 'Coastal, hot and very humid',
  },
  {
    city: 'Dar es Salaam',
    country: 'Tanzania',
    region: 'Africa',
    elevation: 55,
    coolingDB: 33,
    coolingMCWB: 26,
    climate: 'Coastal, hot and humid',
  },
  {
    city: 'Cairo',
    country: 'Egypt',
    region: 'Africa',
    elevation: 23,
    coolingDB: 38,
    coolingMCWB: 22,
    climate: 'Desert, hot and dry',
  },
  {
    city: 'Nairobi',
    country: 'Kenya',
    region: 'Africa',
    elevation: 1795,
    coolingDB: 28,
    coolingMCWB: 16,
    climate: 'Highland, mild — modest cooling loads',
  },
  {
    city: 'Addis Ababa',
    country: 'Ethiopia',
    region: 'Africa',
    elevation: 2355,
    coolingDB: 26,
    coolingMCWB: 14,
    climate: 'High plateau, mild — some night heating',
  },
  {
    city: 'Kigali',
    country: 'Rwanda',
    region: 'Africa',
    elevation: 1567,
    coolingDB: 28,
    coolingMCWB: 17,
    climate: 'Highland, mild and temperate',
  },
  {
    city: 'Johannesburg',
    country: 'South Africa',
    region: 'Africa',
    elevation: 1753,
    coolingDB: 29,
    coolingMCWB: 17,
    climate: 'Highland, warm summers and cool winters',
  },
];

export interface IndoorTarget {
  space: string;
  tempC: string;
  rh: string;
  note: string;
}

export const INDOOR_TARGETS: IndoorTarget[] = [
  {
    space: 'Offices and general comfort',
    tempC: '23–25',
    rh: '50–60',
    note: 'A common Accra design point is 24 °C and 55% RH.',
  },
  {
    space: 'Retail and public spaces',
    tempC: '24–26',
    rh: '50–60',
    note: 'Higher setpoint trims energy where occupancy turns over fast.',
  },
  {
    space: 'Hotel guest rooms',
    tempC: '23–25',
    rh: '50–60',
    note: 'Guests adjust setpoints, so design for control range not a fixed point.',
  },
  {
    space: 'Server and IT rooms',
    tempC: '22–24',
    rh: '45–55',
    note: 'Tight humidity control; cooling runs year-round.',
  },
  {
    space: 'Hospitals — wards',
    tempC: '22–24',
    rh: '45–55',
    note: 'Specialist areas have their own stricter requirements.',
  },
  {
    space: 'Cold room — chilled produce',
    tempC: '0–4',
    rh: '85–90',
    note: 'High RH preserves fresh produce; see the cold room article.',
  },
];

export const DESIGN_NOTES = [
  'In coastal Ghana the design challenge is humidity, not peak temperature. The latent (moisture) load can rival or exceed the sensible load, so equipment must be selected for a low sensible heat ratio — not just total kW.',
  'Northern Ghana (Tamale, Wa, Bolgatanga) sees much higher dry-bulb temperatures and a dry Harmattan season, so condenser sizing and dust-tolerant filtration matter more there than on the coast.',
  'Highland African cities such as Nairobi and Addis Ababa are mild — cooling loads are modest and reduced air density at altitude must be applied when sizing fans and selecting equipment.',
  'Always pair these outdoor figures with a proper room-by-room load calculation. They size the system to the climate, not to the building.',
];
