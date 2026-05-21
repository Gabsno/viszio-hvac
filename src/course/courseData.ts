import type { CourseModule, Trophy } from '../types';

// The guided course. Lessons teach from the same Markdown articles as the
// library (no duplicated content) and end in a short quiz. The final module
// is a capstone challenge.

export const COURSE: CourseModule[] = [
  {
    id: 'm1',
    title: 'Air & Moisture Foundations',
    description: 'Psychrometrics — the physics every HVAC decision rests on.',
    icon: 'Sigma',
    lessons: [
      {
        id: 'l1-1',
        title: 'What psychrometrics is',
        articleIds: ['psy-01', 'psy-03'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Psychrometrics is the study of…',
            choices: [
              'The strength of structural steel',
              'The thermodynamic properties of moist air',
              'Refrigerant chemistry',
              'Electrical load balancing',
            ],
            answer: 1,
            explanation:
              'Psychrometrics deals with moist air — the mixture of dry air and water vapour that HVAC systems condition.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Sensible heat changes air temperature without changing its moisture content.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Sensible heat changes dry-bulb temperature; latent heat changes moisture content.',
          },
          {
            id: 'q3',
            kind: 'multiple-choice',
            prompt: 'Removing moisture from air without changing its temperature is a…',
            choices: [
              'Sensible cooling process',
              'Latent (dehumidification) process',
              'Heating process',
              'Mixing process',
            ],
            answer: 1,
            explanation:
              'Latent processes change humidity ratio; pure dehumidification removes moisture.',
          },
          {
            id: 'q4',
            kind: 'short-answer',
            prompt:
              'In a hot-humid climate like Accra, which load — sensible or latent — tends to be unusually large?',
            answer: 'latent',
            explanation:
              'High outdoor humidity makes the latent (moisture) load a major share of the total cooling load.',
          },
        ],
      },
      {
        id: 'l1-2',
        title: 'Reading the chart',
        articleIds: ['psy-02', 'psy-04'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'On a psychrometric chart, horizontal movement to the left represents…',
            choices: [
              'Humidification',
              'Sensible cooling',
              'Heating',
              'Dehumidification',
            ],
            answer: 1,
            explanation:
              'Moving left at constant humidity ratio lowers dry-bulb temperature — sensible cooling.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'The saturation curve on the chart represents 100% relative humidity.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'The curved left boundary is the saturation line — air at 100% RH.',
          },
          {
            id: 'q3',
            kind: 'multiple-choice',
            prompt: 'A real cooling coil process line moves…',
            choices: [
              'Straight down only',
              'Straight left only',
              'Down and to the left (cooling + dehumidification)',
              'Up and to the right',
            ],
            answer: 2,
            explanation:
              'A wet coil cools and dehumidifies, so the process line trends down-left toward the apparatus dew point.',
          },
        ],
      },
    ],
  },
  {
    id: 'm2',
    title: 'Calculating Loads',
    description: 'How engineers size cooling: the CLTD and RTS methods.',
    icon: 'Gauge',
    lessons: [
      {
        id: 'l2-1',
        title: 'Cooling load methods',
        articleIds: ['load-01', 'load-02'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'The CLTD method is best described as…',
            choices: [
              'A dynamic hour-by-hour simulation',
              'A simplified, table-based hand-calculation method',
              'A refrigerant charging procedure',
              'An airflow measurement technique',
            ],
            answer: 1,
            explanation:
              'CLTD/CLF uses pre-computed tables to approximate the effect of thermal storage — a manual-friendly method.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'The Radiant Time Series (RTS) method accounts for thermal lag in building mass.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'RTS uses radiant time factors to spread absorbed heat across later hours — modelling thermal storage.',
          },
          {
            id: 'q3',
            kind: 'multiple-choice',
            prompt: 'Why does peak cooling load usually lag peak solar gain?',
            choices: [
              'Sensor error',
              'Thermal storage in the building structure delays heat release',
              'The sun moves slowly',
              'Air is compressible',
            ],
            answer: 1,
            explanation:
              'Heat absorbed by mass is re-released hours later, shifting the load peak.',
          },
        ],
      },
    ],
  },
  {
    id: 'm3',
    title: 'Moving Air & Water',
    description: 'Sizing ductwork and chilled-water pipework.',
    icon: 'Wind',
    lessons: [
      {
        id: 'l3-1',
        title: 'Duct design',
        articleIds: ['duct-01', 'duct-02'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'The equal-friction method sizes ducts so that…',
            choices: [
              'Every duct has the same velocity',
              'Pressure loss per unit length is roughly constant',
              'Every duct is the same diameter',
              'Static pressure is recovered at each fitting',
            ],
            answer: 1,
            explanation:
              'Equal friction holds a constant friction rate (e.g. Pa/m) through the system.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Static regain design aims to keep static pressure roughly constant at each branch.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Static regain trades velocity for static pressure so downstream branches see similar static.',
          },
          {
            id: 'q3',
            kind: 'multiple-choice',
            prompt: 'A fitting loss coefficient (C) is multiplied by…',
            choices: [
              'The duct length',
              'The velocity pressure',
              'The air temperature',
              'The sheet-metal gauge',
            ],
            answer: 1,
            explanation:
              'Dynamic (fitting) loss = C × velocity pressure.',
          },
        ],
      },
      {
        id: 'l3-2',
        title: 'Pipe sizing',
        articleIds: ['pipe-01'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Chilled-water pipe sizing balances pump energy against…',
            choices: [
              'Refrigerant cost',
              'First cost and the risk of erosion/noise at high velocity',
              'Duct leakage',
              'Sheet-metal gauge',
            ],
            answer: 1,
            explanation:
              'Larger pipe cuts pumping energy but costs more; very high velocity risks noise and erosion.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Designers commonly cap closed-loop water velocity around 2.4–3 m/s to limit noise and erosion.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Typical practice keeps velocities in that band, lower for small pipe near occupied spaces.',
          },
        ],
      },
    ],
  },
  {
    id: 'm4',
    title: 'The Refrigeration Cycle',
    description: 'How vapour compression moves heat uphill.',
    icon: 'Snowflake',
    lessons: [
      {
        id: 'l4-1',
        title: 'Vapour-compression cycle',
        articleIds: ['refr-01'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Put the four cycle components in order starting from the evaporator:',
            choices: [
              'Evaporator → compressor → condenser → expansion device',
              'Evaporator → condenser → compressor → expansion device',
              'Compressor → evaporator → condenser → expansion device',
              'Condenser → evaporator → expansion device → compressor',
            ],
            answer: 0,
            explanation:
              'Refrigerant evaporates (absorbs heat), is compressed, condenses (rejects heat), then expands.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'The compressor raises refrigerant pressure and temperature.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Compression adds energy, raising both pressure and temperature so heat can be rejected at the condenser.',
          },
          {
            id: 'q3',
            kind: 'multiple-choice',
            prompt: 'COP (coefficient of performance) for cooling equals…',
            choices: [
              'Heat rejected ÷ compressor work',
              'Useful cooling effect ÷ compressor work input',
              'Compressor work ÷ cooling effect',
              'Evaporator pressure ÷ condenser pressure',
            ],
            answer: 1,
            explanation:
              'Cooling COP is the useful refrigeration effect divided by the work input.',
          },
        ],
      },
    ],
  },
  {
    id: 'm5',
    title: 'Central Plant Equipment',
    description: 'Chillers, cooling towers and pumps.',
    icon: 'Building2',
    lessons: [
      {
        id: 'l5-1',
        title: 'Chillers',
        articleIds: ['chil-01', 'chil-02'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Compared with air-cooled chillers, water-cooled chillers generally…',
            choices: [
              'Are less efficient',
              'Are more efficient but need a cooling tower and water treatment',
              'Need no heat rejection',
              'Cannot exceed 100 kW',
            ],
            answer: 1,
            explanation:
              'Water-cooled units reject heat at a lower temperature, improving efficiency, but add tower and water-treatment scope.',
          },
          {
            id: 'q2',
            kind: 'multiple-choice',
            prompt: 'Which compressor type is typically used in the largest chillers?',
            choices: ['Scroll', 'Reciprocating', 'Centrifugal', 'Rotary'],
            answer: 2,
            explanation:
              'Centrifugal compressors dominate large-tonnage chillers; scroll and screw serve smaller ranges.',
          },
          {
            id: 'q3',
            kind: 'true-false',
            prompt: 'An absorption chiller can be driven by heat instead of large electrical input.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Absorption machines use a thermal driving source (steam, hot water, gas) rather than a large motor.',
          },
        ],
      },
      {
        id: 'l5-2',
        title: 'Towers & pumps',
        articleIds: ['ct-01', 'pump-01'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A cooling tower rejects heat primarily by…',
            choices: [
              'Radiation to the sky',
              'Evaporating a small fraction of the circulating water',
              'Conduction through the basin',
              'Compressing air',
            ],
            answer: 1,
            explanation:
              'Evaporative cooling — latent heat carried off by evaporated water — does most of the work.',
          },
          {
            id: 'q2',
            kind: 'short-answer',
            prompt:
              'What is the name for water deliberately drained from a tower to control dissolved-solids concentration?',
            answer: 'blowdown',
            explanation:
              'Blowdown (bleed) limits the build-up of dissolved solids as water evaporates.',
          },
          {
            id: 'q3',
            kind: 'true-false',
            prompt: 'Variable primary flow pumping varies chilled-water flow through the chiller itself.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'VPF modulates flow through the evaporator within the chiller’s allowable limits, saving pump energy.',
          },
        ],
      },
    ],
  },
  {
    id: 'm6',
    title: 'Air-Side & VRF Equipment',
    description: 'AHUs, fan coil units and VRF/VRV systems.',
    icon: 'Fan',
    lessons: [
      {
        id: 'l6-1',
        title: 'AHUs & FCUs',
        articleIds: ['ahu-01', 'fcu-01'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A 4-pipe fan coil system, versus a 2-pipe system, allows…',
            choices: [
              'Only cooling',
              'Simultaneous heating and cooling in different zones',
              'No outdoor air',
              'Lower equipment count always',
            ],
            answer: 1,
            explanation:
              '4-pipe units have separate heating and cooling coils, so zones can call for opposite modes at once.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A mixing box blends return air with outdoor air before the AHU coils.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'The mixing section combines return and outdoor air ahead of filtration and the coils.',
          },
        ],
      },
      {
        id: 'l6-2',
        title: 'VRF systems',
        articleIds: ['vrf-01', 'vrf-02'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'VRF stands for…',
            choices: [
              'Variable Refrigerant Flow',
              'Vertical Riser Fan',
              'Ventilation Rate Factor',
              'Variable Resistance Filter',
            ],
            answer: 0,
            explanation:
              'VRF = Variable Refrigerant Flow; the system modulates refrigerant flow to each indoor unit.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A heat-recovery VRF system can heat one zone while cooling another, moving heat between them.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Heat-recovery VRF shifts heat from zones being cooled to zones being heated — a key efficiency gain.',
          },
          {
            id: 'q3',
            kind: 'multiple-choice',
            prompt: 'A heat-pump VRF system differs from a heat-recovery system because it…',
            choices: [
              'Cannot heat at all',
              'Runs all indoor units in the same mode at a given time',
              'Uses water instead of refrigerant',
              'Has no outdoor unit',
            ],
            answer: 1,
            explanation:
              'A 2-pipe heat-pump VRF puts every connected indoor unit in heating OR cooling — not both at once.',
          },
        ],
      },
    ],
  },
  {
    id: 'm7',
    title: 'Standards & Codes',
    description: 'Study guides for ASHRAE, SMACNA, ACCA and AHRI.',
    icon: 'BookMarked',
    lessons: [
      {
        id: 'l7-1',
        title: 'ASHRAE essentials',
        articleIds: ['std-ashrae-621', 'std-ashrae-901', 'std-ashrae-55'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'ASHRAE Standard 62.1 primarily addresses…',
            choices: [
              'Energy efficiency',
              'Ventilation for acceptable indoor air quality',
              'Thermal comfort',
              'Refrigerant safety',
            ],
            answer: 1,
            explanation:
              'Standard 62.1 sets minimum ventilation rates and IAQ requirements for non-low-rise buildings.',
          },
          {
            id: 'q2',
            kind: 'multiple-choice',
            prompt: 'ASHRAE Standard 90.1 is the reference standard for…',
            choices: [
              'Building energy efficiency',
              'Ventilation',
              'Duct construction',
              'Comfort',
            ],
            answer: 0,
            explanation:
              '90.1 is the energy standard for buildings except low-rise residential.',
          },
          {
            id: 'q3',
            kind: 'multiple-choice',
            prompt: 'ASHRAE Standard 55 defines conditions for…',
            choices: [
              'Acceptable thermal comfort',
              'Refrigerant designations',
              'Minimum ventilation',
              'Seismic restraint',
            ],
            answer: 0,
            explanation:
              'Standard 55 specifies the combinations of conditions that occupants find thermally acceptable.',
          },
        ],
      },
      {
        id: 'l7-2',
        title: 'SMACNA, ACCA & AHRI',
        articleIds: ['std-smacna-duct', 'std-acca-manualj', 'std-ahri-550590'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'SMACNA duct construction standards mainly govern…',
            choices: [
              'How ductwork is built and reinforced for a given pressure class',
              'Minimum ventilation rates',
              'Chiller efficiency ratings',
              'Thermal comfort',
            ],
            answer: 0,
            explanation:
              'SMACNA links gauge, reinforcement and sealing to the duct pressure class.',
          },
          {
            id: 'q2',
            kind: 'multiple-choice',
            prompt: 'ACCA Manual J is used to…',
            choices: [
              'Select duct fittings',
              'Calculate residential heating and cooling loads',
              'Rate chillers',
              'Design cooling towers',
            ],
            answer: 1,
            explanation:
              'Manual J is the residential load-calculation procedure; Manual S then selects equipment.',
          },
          {
            id: 'q3',
            kind: 'true-false',
            prompt: 'AHRI 550/590 provides a standard rating basis so chillers from different makers can be compared fairly.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'AHRI 550/590 defines rating conditions and the IPLV metric for water-chilling packages.',
          },
        ],
      },
    ],
  },
  {
    id: 'm8',
    title: 'Controls, Commissioning & Sustainability',
    description: 'Sequences of operation, commissioning, and green standards.',
    icon: 'SlidersHorizontal',
    lessons: [
      {
        id: 'l8-1',
        title: 'Controls & commissioning',
        articleIds: ['ctrl-01', 'cx-01', 'cx-02'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A sequence of operation describes…',
            choices: [
              'The order to install ductwork',
              'How a control system should respond to conditions and setpoints',
              'A chiller’s warranty terms',
              'The refrigerant charging steps',
            ],
            answer: 1,
            explanation:
              'A sequence of operation is the written logic the BMS follows to run the equipment.',
          },
          {
            id: 'q2',
            kind: 'multiple-choice',
            prompt: 'Retro-commissioning is best described as…',
            choices: [
              'Commissioning a brand-new building',
              'Commissioning an existing building that was never formally commissioned',
              'Replacing all equipment',
              'A warranty inspection',
            ],
            answer: 1,
            explanation:
              'Retro-commissioning applies the commissioning process to an existing building for the first time.',
          },
          {
            id: 'q3',
            kind: 'true-false',
            prompt: 'Functional performance testing verifies equipment behaves correctly across its operating modes.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'FPT exercises the system through its sequences to confirm real performance, not just installation.',
          },
        ],
      },
      {
        id: 'l8-2',
        title: 'Energy & sustainability',
        articleIds: ['edge-01', 'kig-01'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'IFC EDGE certification is notable in Africa because it…',
            choices: [
              'Requires imported equipment only',
              'Offers a streamlined, resource-efficiency standard suited to emerging markets',
              'Bans air conditioning',
              'Applies only to factories',
            ],
            answer: 1,
            explanation:
              'EDGE targets a 20% reduction in energy, water and embodied materials, with a fast, accessible process.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'The Kigali Amendment phases down high-GWP HFC refrigerants.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Kigali amends the Montreal Protocol to phase down HFCs because of their high global-warming potential.',
          },
        ],
      },
    ],
  },
  {
    id: 'capstone',
    title: 'Capstone: Cold Room Design',
    description: 'Apply the whole course to a cold-storage design challenge.',
    icon: 'Snowflake',
    capstone: true,
    lessons: [
      {
        id: 'cap-1',
        title: 'Cold room design challenge',
        articleIds: ['cold-01'],
        xp: 50,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Which is NOT one of the main cold-room load components?',
            choices: [
              'Transmission load through walls/roof/floor',
              'Product (pull-down) load',
              'Infiltration and internal loads',
              'Solar gain on the psychrometric chart’s saturation line',
            ],
            answer: 3,
            explanation:
              'Cold-room load is transmission + product + infiltration + internal (people, lights, motors, defrost).',
          },
          {
            id: 'q2',
            kind: 'multiple-choice',
            prompt: 'Product pull-down load depends mainly on…',
            choices: [
              'The colour of the door',
              'Product mass, specific heat, and the temperature change required',
              'The brand of compressor',
              'Ambient wind speed',
            ],
            answer: 1,
            explanation:
              'Pull-down load = mass × specific heat × temperature change (plus latent heat if freezing).',
          },
          {
            id: 'q3',
            kind: 'true-false',
            prompt: 'A safety/diversity factor is typically added before final refrigeration equipment selection.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Designers add a margin (often ~10%) and account for run-time hours before selecting equipment.',
          },
          {
            id: 'q4',
            kind: 'short-answer',
            prompt:
              'In Accra’s climate, which load component grows the most versus a temperate location each time the door opens?',
            answer: 'infiltration',
            explanation:
              'Hot, humid outdoor air makes door-opening infiltration (sensible + latent) a large, climate-driven load.',
          },
        ],
      },
    ],
  },
];

export const TROPHIES: Trophy[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson.',
    icon: 'Star',
  },
  {
    id: 'streak-3',
    title: 'On a Roll',
    description: 'Reach a 3-day streak.',
    icon: 'Flame',
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Reach a 7-day streak.',
    icon: 'Flame',
  },
  {
    id: 'module-master',
    title: 'Module Master',
    description: 'Finish an entire module.',
    icon: 'Award',
  },
  {
    id: 'perfect-quiz',
    title: 'Flawless',
    description: 'Score 100% on any quiz.',
    icon: 'Trophy',
  },
  {
    id: 'capstone',
    title: 'HVAC Graduate',
    description: 'Complete the capstone challenge.',
    icon: 'GraduationCap',
  },
];

export function totalLessons(): number {
  return COURSE.reduce((sum, m) => sum + m.lessons.length, 0);
}

export function findLesson(lessonId: string) {
  for (const module of COURSE) {
    const lesson = module.lessons.find((l) => l.id === lessonId);
    if (lesson) return { module, lesson };
  }
  return null;
}

/** Flattened lesson order for "next lesson" navigation. */
export function lessonOrder(): { moduleId: string; lessonId: string }[] {
  const order: { moduleId: string; lessonId: string }[] = [];
  for (const m of COURSE) {
    for (const l of m.lessons) order.push({ moduleId: m.id, lessonId: l.id });
  }
  return order;
}
