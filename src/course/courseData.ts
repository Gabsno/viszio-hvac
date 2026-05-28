import type { CourseModule, Trophy } from '../types';

// The guided course. Lessons teach from the same Markdown articles as the
// library (no duplicated content) and end in a short quiz. The final module
// is a capstone challenge. The course spans the full 78-article library.

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
              'Sensible heat raises or lowers dry-bulb temperature; latent heat changes moisture content (humidity).',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'What kind of heat is removed when water vapour condenses out of the air?',
            answer: 'latent',
            explanation:
              'Condensing moisture releases latent heat; dehumidification removes that latent load.',
          },
        ],
        challenges: [
          {
            id: 'l1-1-c1',
            type: 'fill-blank',
            prompt:
              'The HVAC industry uses two words for the two kinds of heat. Energy that changes temperature without changing moisture is called ___ heat.',
            answer: 'sensible',
            placeholder: 'one word',
            explanation:
              'Sensible heat changes dry-bulb temperature. Latent heat is the partner term — it changes moisture content without changing temperature.',
          },
          {
            id: 'l1-1-c2',
            type: 'multi-select',
            prompt:
              'Which of these are properties shown on a psychrometric chart? (Pick all that apply.)',
            options: [
              { text: 'Dry-bulb temperature', correct: true },
              { text: 'Wet-bulb temperature', correct: true },
              { text: 'Humidity ratio', correct: true },
              { text: 'Refrigerant pressure', correct: false },
              { text: 'Enthalpy', correct: true },
              { text: 'Pipe friction loss', correct: false },
            ],
            explanation:
              'A psychrometric chart maps moist-air properties: dry-bulb, wet-bulb, humidity ratio, relative humidity, enthalpy and specific volume. Refrigerant pressure lives on a refrigerant chart; pipe friction on a Moody diagram.',
          },
          {
            id: 'l1-1-c3',
            type: 'match',
            prompt:
              'Match each psychrometric process to the direction it moves the air state on the chart.',
            pairs: [
              { left: 'Sensible cooling', right: 'Left along constant humidity' },
              { left: 'Sensible heating', right: 'Right along constant humidity' },
              { left: 'Humidification', right: 'Up along constant temperature' },
              { left: 'Dehumidification', right: 'Down along constant temperature' },
            ],
            explanation:
              'Temperature changes move horizontally; moisture changes move vertically. Most real cooling coils combine both — down and to the left.',
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
              'Sensible heating',
              'Mixing of two airstreams',
            ],
            answer: 1,
            explanation:
              'The horizontal axis is dry-bulb temperature; moving left at constant humidity ratio is pure sensible cooling.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Cooling with dehumidification moves the air state down and to the left on the chart.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Lower temperature (left) and lower humidity ratio (down) — the typical cooling-coil process.',
          },
          {
            id: 'q3',
            kind: 'multiple-choice',
            prompt: 'Which is one of the four basic HVAC processes?',
            choices: ['Combustion', 'Heating', 'Filtration', 'Pumping'],
            answer: 1,
            explanation:
              'The four basic processes are heating, cooling, humidification and dehumidification.',
          },
        ],
      },
      {
        id: 'l1-3',
        title: 'How cooling actually happens',
        articleIds: ['refr-01', 'fund-heat-transfer'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Which component of the vapor-compression cycle rejects heat to the outdoors?',
            choices: ['Evaporator', 'Compressor', 'Condenser', 'Expansion valve'],
            answer: 2,
            explanation:
              'The condenser rejects heat as the high-pressure refrigerant condenses; the evaporator absorbs heat indoors.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'The expansion device lowers the pressure and temperature of the refrigerant before the evaporator.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'The expansion valve or capillary drops pressure, allowing the refrigerant to boil at a low temperature in the evaporator.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Name the mode of heat transfer that needs a fluid in motion to carry heat.',
            answer: 'convection',
            explanation:
              'Convection moves heat via a moving fluid; conduction and radiation are the other two modes.',
          },
        ],
      },
      {
        id: 'l1-4',
        title: 'Airflow & units',
        articleIds: ['fund-airflow', 'fund-units'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'By the fan laws, doubling fan speed changes airflow by a factor of…',
            choices: ['0.5', '1', '2', '4'],
            answer: 2,
            explanation:
              'Airflow is proportional to speed; pressure to speed squared; power to speed cubed.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'One ton of refrigeration equals 12,000 BTU/h.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'A ton of cooling is defined as 12,000 BTU/h, roughly 3.517 kW.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'What does CFM stand for as a unit of airflow?',
            answer: 'cubic feet per minute',
            explanation:
              'CFM (cubic feet per minute) is the imperial volumetric airflow unit; L/s is the metric equivalent.',
          },
        ],
        challenges: [
          {
            id: 'l1-4-c1',
            type: 'numeric',
            prompt:
              'Convert: a chiller is rated 30 tons of refrigeration. How many kilowatts of cooling capacity is that?',
            hint: '1 ton of refrigeration = 3.517 kW',
            answer: 105.5,
            unit: 'kW',
            tolerance: 0.03,
            explanation:
              '30 tons × 3.517 kW/ton = 105.5 kW. Always sanity-check tonnage against kW when reading datasheets — vendors mix the two units freely.',
          },
          {
            id: 'l1-4-c2',
            type: 'numeric',
            prompt:
              'A supply fan delivers 5,000 CFM. What is that in litres per second (L/s)?',
            hint: '1 CFM ≈ 0.4719 L/s',
            answer: 2360,
            unit: 'L/s',
            tolerance: 0.03,
            explanation:
              '5,000 × 0.4719 ≈ 2,360 L/s. SMACNA and ASHRAE often use CFM; consultants in Ghana usually specify L/s — convert before you compare.',
          },
        ],
      },
    ],
  },
  {
    id: 'm2',
    title: 'Cooling Load Calculations',
    description: 'Sizing the cooling load — the number every project depends on.',
    icon: 'Calculator',
    lessons: [
      {
        id: 'l2-1',
        title: 'The load calculation process',
        articleIds: ['load-overview', 'load-rules-of-thumb'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A cooling load calculation primarily determines…',
            choices: [
              'The colour of the ductwork',
              'The required cooling capacity for a space',
              'The electrical panel schedule',
              'The fire rating of the walls',
            ],
            answer: 1,
            explanation:
              'A load calculation totals all heat gains so equipment can be sized to the actual demand.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Rules of thumb are a substitute for a detailed load calculation on final design.',
            choices: ['True', 'False'],
            answer: 1,
            explanation:
              'Rules of thumb are useful for early checks only; final equipment selection needs a detailed calculation.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Oversizing cooling equipment most harms which performance area?',
            answer: 'humidity',
            explanation:
              'Oversized units short-cycle and run too little to dehumidify, leaving spaces cool but clammy.',
          },
        ],
        challenges: [
          {
            id: 'l2-1-c1',
            type: 'order',
            prompt:
              'Put a cooling load calculation in the correct order — drag each step up or down until it lines up.',
            items: [
              'Collect building geometry, orientation, occupancy and construction details',
              'Pick the design outdoor and indoor conditions from the climate data',
              'Calculate envelope gains (walls, roof, glazing, infiltration)',
              'Calculate internal gains (people, lighting, equipment)',
              'Add the outdoor-air ventilation load',
              'Apply a safety margin and pick equipment from the manufacturer',
            ],
            explanation:
              "You can't calculate gains without geometry, you can't pick design conditions without knowing what climate the building is in, and you can't pick equipment until you have a total load. Order matters because each step depends on the last.",
          },
          {
            id: 'l2-1-c2',
            type: 'fill-blank',
            prompt:
              'A common Ghana-area rule of thumb for office cooling load is roughly ___ W per square metre. (Type just the number.)',
            answer: '180',
            acceptableAnswers: ['200', '150', '170', '160'],
            placeholder: 'Number only',
            explanation:
              'For Accra/Tema offices a 150-200 W/m² rule of thumb gets you in the right ballpark for early concept work. Anything outside 100-300 W/m² should make you double-check assumptions.',
          },
        ],
      },
      {
        id: 'l2-2',
        title: 'Where the heat comes from',
        articleIds: ['load-internal-gains', 'load-solar'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Which of these is an internal heat gain?',
            choices: ['Solar radiation through glass', 'Lighting and equipment', 'Outdoor air infiltration', 'Conduction through the roof'],
            answer: 1,
            explanation:
              'Internal gains come from people, lighting and equipment inside the space.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Solar heat gain through glazing depends on orientation and shading.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'West and east glass take the strongest direct sun; shading and SHGC reduce the gain.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'People add both sensible heat and what other kind of heat to a space?',
            answer: 'latent',
            explanation:
              'Occupants emit sensible heat and latent heat (moisture from respiration and perspiration).',
          },
        ],
      },
      {
        id: 'l2-3',
        title: 'Outdoor air & calculation methods',
        articleIds: ['load-infiltration', 'load-01', 'load-02'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'The CLTD method is used to estimate…',
            choices: [
              'Pump head',
              'Conduction heat gain through walls and roofs',
              'Duct friction loss',
              'Refrigerant charge',
            ],
            answer: 1,
            explanation:
              'CLTD (Cooling Load Temperature Difference) accounts for time-lag conduction gains through the envelope.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'The Radiant Time Series (RTS) method is a more modern load calculation method than CLTD.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'RTS is the current ASHRAE-recommended method; CLTD/CLF is the older simplified approach.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Uncontrolled outdoor air leaking in through cracks and openings is called what?',
            answer: 'infiltration',
            explanation:
              'Infiltration is unintended air leakage; ventilation is the intentional, designed outdoor air.',
          },
        ],
      },
      {
        id: 'l2-4',
        title: 'Block vs room load',
        articleIds: ['load-block-vs-room', 'load-heating'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A block load is used to size…',
            choices: [
              'Each individual diffuser',
              'The central plant or air handler serving multiple zones',
              'The thermostat wiring',
              'The condensate drain',
            ],
            answer: 1,
            explanation:
              'Block load is the simultaneous peak of all zones — it sizes central equipment. Room loads size terminal units.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'The sum of room peak loads is usually larger than the block load.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Zones peak at different times, so block load (the coincident peak) is lower than the sum of room peaks.',
          },
          {
            id: 'q3',
            kind: 'multiple-choice',
            prompt: 'A heating load calculation generally ignores which gain that a cooling load includes?',
            choices: ['Conduction loss', 'Infiltration', 'Solar and internal gains', 'Outdoor design temperature'],
            answer: 2,
            explanation:
              'Heating loads are usually figured at night/no-sun with no internal gains, as a conservative worst case.',
          },
        ],
      },
    ],
  },
  {
    id: 'm3',
    title: 'Chillers & Central Cooling',
    description: 'Water-cooled and air-cooled plant for larger buildings.',
    icon: 'Snowflake',
    lessons: [
      {
        id: 'l3-1',
        title: 'Air-cooled vs water-cooled',
        articleIds: ['chil-01', 'chil-02'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Compared with air-cooled chillers, water-cooled chillers generally have…',
            choices: [
              'Worse efficiency',
              'Better efficiency but need a cooling tower',
              'No condenser at all',
              'No need for water treatment',
            ],
            answer: 1,
            explanation:
              'Water-cooled chillers reject heat at lower condensing temperatures, so they are more efficient — but they need a tower and water treatment.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A centrifugal chiller is well suited to large cooling capacities.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Centrifugal compressors excel at high tonnage; scroll and screw machines cover small and mid ranges.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'What is the device that rejects condenser heat to the atmosphere by evaporation?',
            answer: 'cooling tower',
            explanation:
              'A cooling tower evaporatively cools the condenser water loop of a water-cooled chiller plant.',
          },
        ],
      },
      {
        id: 'l3-2',
        title: 'Cooling towers & chilled water',
        articleIds: ['ct-01', 'cool-chw-systems'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Cooling tower performance is limited by the…',
            choices: ['Dry-bulb temperature', 'Wet-bulb temperature', 'Barometric pressure only', 'Refrigerant type'],
            answer: 1,
            explanation:
              'A tower can approach but never reach the ambient wet-bulb temperature — that sets its theoretical limit.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A primary-secondary chilled water arrangement decouples plant flow from distribution flow.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'A decoupler bridges the loops so chillers see constant flow while the secondary loop varies with load.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Tower water lost to evaporation and drift must be replaced by what supply?',
            answer: 'make-up',
            explanation:
              'Make-up water replaces evaporation, drift and blowdown losses in the condenser water loop.',
          },
        ],
      },
      {
        id: 'l3-3',
        title: 'Free cooling',
        articleIds: ['cool-economizer', 'cool-chw-systems'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'An air-side economizer saves energy by…',
            choices: [
              'Running the compressor harder',
              'Using cool outdoor air for cooling when conditions allow',
              'Adding humidity to the supply air',
              'Bypassing the air filter',
            ],
            answer: 1,
            explanation:
              'When outdoor air is cool/dry enough, an economizer cools with free outdoor air instead of mechanical cooling.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A water-side economizer can use the cooling tower to cool chilled water without running the chiller.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'In cool weather a tower (often via a heat exchanger) can directly serve the chilled water loop — free cooling.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Economizer cooling is most effective in what kind of outdoor climate condition?',
            answer: 'cool',
            explanation:
              'Free cooling works best when outdoor air is cool and dry; in hot humid climates its hours are limited.',
          },
        ],
      },
    ],
  },
  {
    id: 'm4',
    title: 'VRF & DX Systems',
    description: 'Variable refrigerant flow and direct-expansion packaged systems.',
    icon: 'Fan',
    lessons: [
      {
        id: 'l4-1',
        title: 'VRF architecture',
        articleIds: ['vrf-01', 'vrf-02'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'VRF systems modulate capacity primarily by…',
            choices: [
              'Cycling the compressor on and off',
              'Varying refrigerant flow with an inverter compressor',
              'Throttling chilled water valves',
              'Changing duct sizes',
            ],
            answer: 1,
            explanation:
              'VRF uses inverter-driven compressors to vary refrigerant flow to many indoor units precisely.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A heat-recovery VRF system can heat some zones while cooling others simultaneously.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Heat-recovery (3-pipe) VRF moves heat from cooling zones to heating zones at the same time; heat-pump VRF cannot.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'In a VRF system, what device routes refrigerant to each indoor unit?',
            answer: 'branch',
            explanation:
              'Branch joints or branch selector boxes distribute refrigerant from the outdoor unit to the indoor units.',
          },
        ],
      },
      {
        id: 'l4-2',
        title: 'DX systems & refrigerants',
        articleIds: ['cool-dx-systems', 'cool-refrigerants'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'In a "direct expansion" (DX) system, the refrigerant…',
            choices: [
              'Cools water that then cools the air',
              'Evaporates directly in the coil that cools the supply air',
              'Is only used for heating',
              'Never changes phase',
            ],
            answer: 1,
            explanation:
              'In DX systems the refrigerant itself expands in the air-handling coil; there is no intermediate water loop.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A refrigerant with a high Global Warming Potential (GWP) is being phased down under modern regulations.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'High-GWP HFCs like R-410A are being phased down in favour of lower-GWP options such as R-32.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'What refrigerant property measures its damage to stratospheric ozone?',
            answer: 'odp',
            explanation:
              'Ozone Depletion Potential (ODP) drove the phase-out of CFCs and HCFCs; modern HFCs have zero ODP.',
          },
        ],
      },
      {
        id: 'l4-3',
        title: 'Refrigerant piping',
        articleIds: ['cool-refrigerant-piping', 'cool-dx-systems'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Refrigerant suction lines must be sized and pitched to ensure…',
            choices: [
              'Maximum pressure drop',
              'Oil return to the compressor',
              'Water drainage',
              'Electrical grounding',
            ],
            answer: 1,
            explanation:
              'Suction lines must carry oil back to the compressor; correct sizing and traps maintain refrigerant velocity for oil return.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Oversized refrigerant piping can reduce velocity too much and impair oil return.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Too large a pipe drops velocity below the minimum needed to sweep oil back, especially on vertical risers.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Long refrigerant pipe runs on a VRF system require an additional charge of what?',
            answer: 'refrigerant',
            explanation:
              'Additional refrigerant charge is calculated per metre of liquid line beyond the factory charge length.',
          },
        ],
      },
    ],
  },
  {
    id: 'm5',
    title: 'Specialised Cooling',
    description: 'Cold rooms and low-temperature refrigeration applications.',
    icon: 'Thermometer',
    lessons: [
      {
        id: 'l5-1',
        title: 'Cold room design',
        articleIds: ['cold-01', 'load-overview'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A major cold room load that comfort cooling rarely deals with is…',
            choices: [
              'Lighting gain',
              'Product pull-down load',
              'Wall conduction',
              'Fan motor heat',
            ],
            answer: 1,
            explanation:
              'Cooling stored product down from its entering temperature (pull-down) is a defining cold room load.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Door openings and infiltration are a significant load in cold room design.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Each door opening admits warm humid air; infiltration and the resulting frost load are sized deliberately.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'What process removes frost build-up from a cold room evaporator coil?',
            answer: 'defrost',
            explanation:
              'Periodic defrost (electric, hot-gas or off-cycle) clears coil frost that would otherwise block airflow.',
          },
        ],
      },
      {
        id: 'l5-2',
        title: 'Refrigerants & the cycle revisited',
        articleIds: ['cool-refrigerants', 'refr-01'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Low-temperature refrigeration applications require refrigerants that…',
            choices: [
              'Boil at higher temperatures',
              'Provide adequate capacity and pressure at low evaporating temperatures',
              'Have a high ozone depletion potential',
              'Cannot be compressed',
            ],
            answer: 1,
            explanation:
              'Low-temperature work needs a refrigerant whose pressure-temperature curve still gives capacity below freezing.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Superheat at the evaporator outlet protects the compressor from liquid slugging.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Some superheat ensures only vapour reaches the compressor, preventing damaging liquid refrigerant carryover.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'In the cycle, the refrigerant absorbs heat as it boils inside which component?',
            answer: 'evaporator',
            explanation:
              'The evaporator is where low-pressure refrigerant boils and absorbs heat from the conditioned space or product.',
          },
        ],
      },
    ],
  },
  {
    id: 'm6',
    title: 'Heating Systems',
    description: 'Boilers, heat pumps, hydronic and electric heating.',
    icon: 'Flame',
    lessons: [
      {
        id: 'l6-1',
        title: 'Boilers & hydronic heating',
        articleIds: ['heat-boilers', 'heat-hydronic-heating'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A condensing boiler achieves higher efficiency by…',
            choices: [
              'Running at a higher flue temperature',
              'Recovering latent heat from flue gas water vapour',
              'Burning more fuel',
              'Skipping the heat exchanger',
            ],
            answer: 1,
            explanation:
              'Condensing boilers cool flue gas below its dew point, recovering latent heat — but they need low return water temperatures.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Lower hot water supply temperatures improve a condensing boiler\'s efficiency.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Low return temperatures keep the boiler in condensing mode, maximising latent heat recovery.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'In a hydronic heating system, what fluid distributes heat to the terminals?',
            answer: 'water',
            explanation:
              'Hydronic systems circulate hot water through pipes to radiators, coils or fan coils.',
          },
        ],
      },
      {
        id: 'l6-2',
        title: 'Heat pumps & electric heating',
        articleIds: ['heat-heat-pumps', 'heat-electric'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A heat pump\'s Coefficient of Performance (COP) above 1 means it…',
            choices: [
              'Wastes most of its energy',
              'Delivers more heat energy than the electricity it consumes',
              'Cannot provide cooling',
              'Violates thermodynamics',
            ],
            answer: 1,
            explanation:
              'A heat pump moves heat rather than creating it, so it delivers several times more heat than its electrical input.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Electric resistance heating has a COP of about 1.0.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Resistance heating converts electricity to heat one-for-one; a heat pump beats it by moving ambient heat.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'A reversing valve lets a heat pump switch between heating and what other mode?',
            answer: 'cooling',
            explanation:
              'The reversing valve swaps the roles of the indoor and outdoor coils so the same unit heats or cools.',
          },
        ],
      },
    ],
  },
  {
    id: 'm7',
    title: 'Air Handling & Terminal Units',
    description: 'AHUs, fan coils and VAV systems that deliver conditioned air.',
    icon: 'Wind',
    lessons: [
      {
        id: 'l7-1',
        title: 'Air handling units',
        articleIds: ['ahu-01', 'air-fans'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Which is NOT a typical section inside an air handling unit?',
            choices: ['Filter section', 'Cooling coil', 'Cooling tower fill', 'Supply fan'],
            answer: 2,
            explanation:
              'An AHU contains filters, coils, fans and dampers; cooling tower fill belongs in a cooling tower.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A backward-curved centrifugal fan is generally more efficient than a forward-curved one.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Backward-curved (and airfoil) fans have higher peak efficiency and a non-overloading power curve.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'What AHU component removes dust and particulates from the airstream?',
            answer: 'filter',
            explanation:
              'Filters protect coils and occupants by capturing particulates before air enters the space.',
          },
        ],
      },
      {
        id: 'l7-2',
        title: 'Fan coil units',
        articleIds: ['fcu-01', 'ahu-01'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A 4-pipe fan coil unit differs from a 2-pipe unit because it…',
            choices: [
              'Has no coil',
              'Has separate heating and cooling coils for simultaneous availability',
              'Uses refrigerant instead of water',
              'Cannot be controlled by a thermostat',
            ],
            answer: 1,
            explanation:
              'A 4-pipe FCU has dedicated hot and chilled water coils, so heating or cooling is available any time.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A 2-pipe fan coil system cannot heat one zone while cooling another.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'A 2-pipe system carries either hot or chilled water at a time, so all zones share the same mode.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Fan coil units typically need a drain to remove what liquid?',
            answer: 'condensate',
            explanation:
              'The cooling coil produces condensate, which a drain pan and pipe carry away to prevent overflow.',
          },
        ],
      },
      {
        id: 'l7-3',
        title: 'VAV systems',
        articleIds: ['air-vav', 'air-static-pressure'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A VAV (variable air volume) system controls space temperature by varying…',
            choices: [
              'Supply air temperature only',
              'The volume of supply air delivered',
              'The refrigerant charge',
              'The duct material',
            ],
            answer: 1,
            explanation:
              'VAV terminals modulate airflow to each zone while supply air temperature stays roughly constant.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A VAV air handler usually pairs with a variable-speed fan to save energy at part load.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'As VAV boxes throttle down, a VSD slows the fan, cutting fan power dramatically (cube law).',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'A VAV fan is commonly controlled to maintain a constant duct what?',
            answer: 'static pressure',
            explanation:
              'A duct static pressure sensor signals the VSD to keep pressure at setpoint as boxes modulate.',
          },
        ],
      },
    ],
  },
  {
    id: 'm8',
    title: 'Duct Design & Construction',
    description: 'Sizing, fittings, construction, sealing and leakage testing.',
    icon: 'Ruler',
    lessons: [
      {
        id: 'l8-1',
        title: 'Sizing methods & fittings',
        articleIds: ['duct-01', 'duct-02'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'The equal friction method sizes ducts so that each run has the same…',
            choices: [
              'Air velocity',
              'Pressure loss per unit length',
              'Cross-sectional area',
              'Material thickness',
            ],
            answer: 1,
            explanation:
              'Equal friction holds a constant friction rate (Pa/m) along the system; static regain balances velocity pressure instead.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Duct fittings such as elbows and transitions add to total system pressure loss.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Fitting losses are real and often dominate; they are added via loss coefficients or equivalent length.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'A turning vane is placed in an elbow to reduce what kind of loss?',
            answer: 'pressure',
            explanation:
              'Turning vanes guide airflow around a sharp elbow, cutting turbulence and pressure loss.',
          },
        ],
      },
      {
        id: 'l8-2',
        title: 'Construction & sealing',
        articleIds: ['duct-construction', 'duct-insulation'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Sheet metal gauge for a duct is selected mainly from the duct\'s size and its…',
            choices: ['Colour', 'Operating static pressure class', 'Length only', 'Insulation type'],
            answer: 1,
            explanation:
              'Higher pressure classes and larger dimensions call for thicker metal and more reinforcement.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Insulating supply ducts in unconditioned spaces reduces heat gain and prevents condensation.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Insulation limits thermal gain/loss and keeps the duct surface above dew point to avoid sweating.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Applying mastic or tape to duct joints to stop air loss is called what?',
            answer: 'sealing',
            explanation:
              'Sealing joints and seams with mastic or approved tape minimises duct air leakage.',
          },
        ],
      },
      {
        id: 'l8-3',
        title: 'Flexible duct & leakage',
        articleIds: ['duct-flexible', 'duct-leakage'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Flexible duct has a much higher pressure drop than rigid duct when it is…',
            choices: [
              'Pulled fully taut',
              'Compressed or sagging with sharp bends',
              'Properly supported',
              'Kept short',
            ],
            answer: 1,
            explanation:
              'Compressed, kinked or sagging flex duct multiplies friction loss; it should be pulled taut and run straight.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A duct leakage test pressurises a duct section and measures the airflow needed to hold pressure.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Leakage testing pressurises the duct and reports leakage rate against an allowable limit.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Excessive duct leakage directly wastes conditioned air and what resource?',
            answer: 'energy',
            explanation:
              'Leaked conditioned air is lost energy and fan power, and can also unbalance the system.',
          },
        ],
      },
    ],
  },
  {
    id: 'm9',
    title: 'Dampers & Air Distribution',
    description: 'Volume, fire/smoke and balancing dampers, plus diffusers and louvers.',
    icon: 'SlidersHorizontal',
    lessons: [
      {
        id: 'l9-1',
        title: 'Volume & balancing dampers',
        articleIds: ['damp-vcd', 'damp-balancing'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A volume control damper is used to…',
            choices: [
              'Stop the spread of fire',
              'Adjust and set the airflow rate in a duct branch',
              'Filter the air',
              'Reduce noise only',
            ],
            answer: 1,
            explanation:
              'Volume control dampers throttle airflow so branches can be balanced to design quantities.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Balancing dampers should be located far from diffusers to limit regenerated noise.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Throttling creates noise; placing the damper well upstream of the outlet keeps that noise out of the space.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Opposed-blade dampers give better airflow control than which other blade arrangement?',
            answer: 'parallel',
            explanation:
              'Opposed-blade dampers give a more linear, predictable flow characteristic than parallel-blade dampers.',
          },
        ],
        challenges: [
          {
            id: 'l9-1-c1',
            type: 'multi-select',
            prompt:
              'Pick every place a volume control damper SHOULD live in a typical air system.',
            options: [
              { text: 'At every branch tap', correct: true },
              { text: 'Before each terminal box', correct: true },
              { text: 'Inside a fire-rated wall penetration', correct: false },
              { text: 'In the discharge of an exhaust fan to stop backdraft', correct: false },
              { text: 'On long runs where balance is hard to predict', correct: true },
            ],
            explanation:
              'VCDs are for balancing — not for fire or backdraft. Fire-rated penetrations need a fire damper, exhaust-fan backflow needs a backdraft damper.',
          },
          {
            id: 'l9-1-c2',
            type: 'match',
            prompt:
              'Match each damper blade arrangement to what it does best.',
            pairs: [
              {
                left: 'Opposed-blade (OBD)',
                right: 'Modulating control — linear over most of stroke',
              },
              {
                left: 'Parallel-blade (PBD)',
                right: 'Two-position open/closed isolation',
              },
              {
                left: 'Iris damper',
                right: 'Fine balancing on round duct branches',
              },
              {
                left: 'Butterfly damper',
                right: 'Compact shut-off in tight spaces',
              },
            ],
            explanation:
              'Opposed-blade is the workhorse for modulating control. Parallel-blade is cheaper but deflects airflow sideways — fine for on/off, bad for modulation. Iris and butterfly are specialty geometries.',
          },
        ],
      },
      {
        id: 'l9-2',
        title: 'Fire & smoke dampers',
        articleIds: ['damp-fire-smoke', 'damp-vcd'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A fire damper is installed where a duct…',
            choices: [
              'Changes size',
              'Penetrates a fire-rated wall or floor',
              'Connects to a diffuser',
              'Turns a corner',
            ],
            answer: 1,
            explanation:
              'Fire dampers maintain the fire rating of a barrier where ductwork passes through it.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A traditional fire damper closes when a fusible link melts at a set temperature.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Heat melts the fusible link, releasing the damper blade to close; combination fire/smoke dampers also use actuators.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'A smoke damper is typically commanded closed by a signal from what life-safety system?',
            answer: 'fire alarm',
            explanation:
              'Smoke dampers respond to the fire alarm / smoke detection system to limit smoke migration.',
          },
        ],
      },
      {
        id: 'l9-3',
        title: 'Diffusers & louvers',
        articleIds: ['air-diffusers', 'air-louvers'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'The "throw" of a diffuser describes…',
            choices: [
              'Its weight',
              'The distance the supply air jet travels before slowing to a set velocity',
              'Its fire rating',
              'Its colour',
            ],
            answer: 1,
            explanation:
              'Throw is the distance to a terminal velocity (e.g. 0.25 m/s); it must suit the room to avoid drafts or stagnation.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'An outdoor air louver needs a low enough face velocity to limit rain and water carryover.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Excessive louver face velocity drags rain water into the intake; sizing keeps velocity below a water-penetration limit.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'A bird screen on an intake louver keeps out birds and what else?',
            answer: 'debris',
            explanation:
              'Screens or mesh on intake louvers exclude birds, insects and large debris from the air path.',
          },
        ],
      },
    ],
  },
  {
    id: 'm10',
    title: 'Ventilation & Kitchen Exhaust',
    description: 'Outdoor air, exhaust, pressurisation, filtration and grease ducts.',
    icon: 'Leaf',
    lessons: [
      {
        id: 'l10-1',
        title: 'Ventilation fundamentals',
        articleIds: ['vent-fundamentals', 'vent-dcv'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'The main purpose of mechanical ventilation is to…',
            choices: [
              'Cool the building structure',
              'Supply outdoor air to dilute indoor contaminants',
              'Generate static pressure',
              'Replace insulation',
            ],
            answer: 1,
            explanation:
              'Ventilation brings in outdoor air to dilute CO2, odours and pollutants, maintaining indoor air quality.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Demand controlled ventilation adjusts outdoor air based on occupancy, often using CO2 sensors.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'DCV reduces outdoor air when occupancy is low, cutting conditioning energy while keeping IAQ acceptable.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'CO2 concentration is commonly used by DCV as a proxy for what space variable?',
            answer: 'occupancy',
            explanation:
              'Indoor CO2 rises with the number of people, so it is a practical indicator of occupancy for DCV.',
          },
        ],
      },
      {
        id: 'l10-2',
        title: 'Exhaust, pressurisation & filtration',
        articleIds: ['vent-exhaust-systems', 'vent-pressurization', 'vent-filtration'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A toilet or smoking room is usually kept at negative pressure so that…',
            choices: [
              'Air flows out of the room into corridors',
              'Odours and contaminants are contained and not spread',
              'The room stays warmer',
              'The exhaust fan can be smaller',
            ],
            answer: 1,
            explanation:
              'Negative pressure pulls air into the room, so odours are exhausted rather than escaping to clean areas.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A higher MERV rating means a filter captures smaller particles more effectively.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'MERV (Minimum Efficiency Reporting Value) rises with the filter\'s ability to trap fine particulates.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Keeping a clean room slightly above surrounding pressure is called positive what?',
            answer: 'pressurization',
            explanation:
              'Positive pressurisation makes air leak outward, keeping contaminants from infiltrating a protected space.',
          },
        ],
      },
      {
        id: 'l10-3',
        title: 'Kitchen exhaust & grease ducts',
        articleIds: ['duct-kitchen-exhaust', 'vent-exhaust-systems'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A commercial kitchen grease duct must be constructed so that it is…',
            choices: [
              'Made of thin flexible duct',
              'Liquid-tight with welded seams and accessible for cleaning',
              'Lined with fibreglass',
              'Shared with the toilet exhaust',
            ],
            answer: 1,
            explanation:
              'Grease ducts are welded liquid-tight, sloped to drain, and fitted with access doors for grease cleaning.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A kitchen grease exhaust duct may be combined with general building exhaust to save ductwork.',
            choices: ['True', 'False'],
            answer: 1,
            explanation:
              'Grease exhaust must be a dedicated system; combining it with other exhaust is a serious fire hazard and code violation.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'A kitchen hood relies on adequate replacement air, also known as what air?',
            answer: 'make-up',
            explanation:
              'Make-up air replaces the large volume a kitchen hood exhausts, preventing excessive negative pressure.',
          },
          {
            id: 'q4',
            kind: 'multiple-choice',
            prompt: 'A Type I kitchen hood is designed to capture…',
            choices: [
              'Only heat and steam',
              'Grease-laden vapours and smoke from cooking',
              'Refrigerant leaks',
              'Dust from dry storage',
            ],
            answer: 1,
            explanation:
              'Type I hoods handle grease-laden vapour from cooking; Type II hoods handle heat and steam without grease.',
          },
        ],
      },
    ],
  },
  {
    id: 'm11',
    title: 'Piping & Hydronics',
    description: 'Pipe sizing, pumps, expansion tanks, valves and materials.',
    icon: 'Droplets',
    lessons: [
      {
        id: 'l11-1',
        title: 'Hydronic fundamentals & pipe sizing',
        articleIds: ['hyd-fundamentals', 'pipe-01'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Chilled water pipe sizing balances pump energy against…',
            choices: [
              'Pipe colour',
              'First cost and acceptable velocity/pressure drop',
              'The number of fittings only',
              'Refrigerant charge',
            ],
            answer: 1,
            explanation:
              'Smaller pipes cost less but raise velocity, noise and pump head; sizing finds an economic balance.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Excessive water velocity in pipes can cause noise and erosion-corrosion.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'High velocity generates noise and erodes pipe walls, so design velocities are capped (often around 1.2–3 m/s).',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'A closed hydronic loop carries heat between the plant and the building terminal what?',
            answer: 'units',
            explanation:
              'A closed loop circulates water between central plant and terminal units such as coils and fan coils.',
          },
        ],
      },
      {
        id: 'l11-2',
        title: 'Pumps & selection',
        articleIds: ['pump-01', 'pipe-pump-selection'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A pump is selected at the intersection of its pump curve and the…',
            choices: ['System curve', 'Fan law', 'Psychrometric chart', 'Refrigerant table'],
            answer: 0,
            explanation:
              'The operating point is where the pump curve crosses the system resistance curve.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Variable-speed pumping saves energy in systems with two-way control valves.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'As two-way valves close, flow drops; a VSD slows the pump and cuts pump power substantially.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'The total pressure a pump must overcome is called the system or pump what?',
            answer: 'head',
            explanation:
              'Pump head is the energy per unit weight the pump adds, sized to overcome system resistance.',
          },
        ],
      },
      {
        id: 'l11-3',
        title: 'Expansion, valves & materials',
        articleIds: ['pipe-expansion', 'pipe-valves', 'pipe-materials'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'An expansion tank in a hydronic system is needed because…',
            choices: [
              'Water is incompressible and expands when heated',
              'Pumps need extra storage',
              'It filters the water',
              'It generates head',
            ],
            answer: 0,
            explanation:
              'Water expands as it heats; the expansion tank accommodates that volume change and controls system pressure.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'A balancing valve is used to set the design flow rate through a branch or coil.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Balancing valves add measured resistance so each circuit receives its intended flow.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Air separators are installed to remove what unwanted substance from the loop?',
            answer: 'air',
            explanation:
              'Air separators remove entrained air that would otherwise cause noise, corrosion and poor heat transfer.',
          },
        ],
      },
    ],
  },
  {
    id: 'm12',
    title: 'Condenser Water & Piping Systems',
    description: 'Condenser water loops and complete piping system design.',
    icon: 'Gauge',
    lessons: [
      {
        id: 'l12-1',
        title: 'Condenser water systems',
        articleIds: ['pipe-condenser-water', 'ct-01'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'The condenser water loop in a water-cooled plant connects the chiller condenser to the…',
            choices: ['Air handler', 'Cooling tower', 'Boiler', 'Expansion tank'],
            answer: 1,
            explanation:
              'Condenser water carries rejected heat from the chiller condenser up to the cooling tower.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Condenser water is an open loop exposed to the atmosphere at the cooling tower.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'The tower is open to air, so the condenser loop is an open system needing water treatment against scale and biofouling.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Open condenser water loops require chemical treatment to prevent scale and what biological growth?',
            answer: 'algae',
            explanation:
              'Open tower water needs treatment against scale, corrosion and biological growth such as algae and Legionella.',
          },
        ],
      },
      {
        id: 'l12-2',
        title: 'Pumping arrangements & materials',
        articleIds: ['pump-01', 'pipe-materials', 'hyd-fundamentals'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A common pipe material for chilled water inside a building is…',
            choices: ['Cast iron only', 'Steel or copper with appropriate insulation', 'PVC fire-rated duct', 'Galvanised sheet metal'],
            answer: 1,
            explanation:
              'Black or galvanised steel and copper are common chilled water materials, insulated to prevent condensation.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'In a primary-secondary loop, dedicated primary pumps maintain constant flow through each chiller.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Primary pumps give chillers steady flow; secondary (distribution) pumps vary with building load.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Chilled water pipe insulation must include a vapour barrier to stop what?',
            answer: 'condensation',
            explanation:
              'A vapour barrier keeps humid air from reaching the cold pipe surface and condensing inside the insulation.',
          },
        ],
      },
    ],
  },
  {
    id: 'm13',
    title: 'Controls, Commissioning & Standards',
    description: 'Sequences, BMS, TAB, commissioning, codes and sustainability.',
    icon: 'BookMarked',
    lessons: [
      {
        id: 'l13-1',
        title: 'Sequences & BMS',
        articleIds: ['ctrl-01', 'ctrl-bms'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'A sequence of operation describes…',
            choices: [
              'The order ducts are installed',
              'How a system\'s controls behave under all operating conditions',
              'The paint specification',
              'The warranty terms',
            ],
            answer: 1,
            explanation:
              'A sequence of operation defines control logic — setpoints, modes and responses — for the whole system.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'BACnet is a common open communication protocol used in building management systems.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'BACnet is a widely used open protocol allowing controllers and devices from different vendors to interoperate.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'A field device that measures temperature for the BMS is called a what?',
            answer: 'sensor',
            explanation:
              'Sensors feed measured values (temperature, pressure, CO2) to BMS controllers, which act through actuators.',
          },
        ],
      },
      {
        id: 'l13-2',
        title: 'Commissioning & balancing',
        articleIds: ['cx-01', 'cx-02', 'ctrl-tab'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'Commissioning is the process of verifying that systems…',
            choices: [
              'Are the cheapest available',
              'Are installed and perform per the design intent',
              'Are painted correctly',
              'Use the most refrigerant',
            ],
            answer: 1,
            explanation:
              'Commissioning confirms systems are installed, started and operate as the design intended.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Functional performance testing checks that equipment responds correctly across its sequences.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'FPT exercises systems through their modes and verifies the controls respond as specified.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'TAB stands for testing, adjusting and what?',
            answer: 'balancing',
            explanation:
              'Testing, Adjusting and Balancing sets air and water flows to the design quantities.',
          },
        ],
      },
      {
        id: 'l13-3',
        title: 'Standards & codes',
        articleIds: ['std-ashrae-621', 'std-ashrae-901', 'std-ashrae-55'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'ASHRAE Standard 62.1 sets minimum requirements for…',
            choices: ['Energy efficiency', 'Ventilation for acceptable indoor air quality', 'Duct construction', 'Pipe sizing'],
            answer: 1,
            explanation:
              'ASHRAE 62.1 prescribes ventilation rates and IAQ requirements for commercial buildings.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'ASHRAE Standard 90.1 is an energy standard for buildings.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'ASHRAE 90.1 sets minimum energy efficiency requirements for building envelope, HVAC and lighting.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'ASHRAE Standard 55 defines acceptable thermal what for occupants?',
            answer: 'comfort',
            explanation:
              'ASHRAE 55 defines the thermal comfort conditions (temperature, humidity, air speed) acceptable to occupants.',
          },
        ],
      },
      {
        id: 'l13-4',
        title: 'Codes & sustainability',
        articleIds: ['std-smacna-duct', 'std-acca-manualj', 'std-ahri-550590'],
        xp: 20,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'SMACNA standards are best known for guidance on…',
            choices: ['Refrigerant charging', 'Sheet metal and duct construction', 'Pump curves', 'Thermal comfort'],
            answer: 1,
            explanation:
              'SMACNA publishes the industry duct construction standards (gauges, reinforcement, sealing classes).',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'ACCA Manual J is a residential load calculation procedure.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'Manual J is the standard residential heating and cooling load calculation method.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'AHRI Standard 550/590 governs the performance rating of which central equipment?',
            answer: 'chiller',
            explanation:
              'AHRI 550/590 is the rating standard for water-chilling and heat-pump water-heating packages (chillers).',
          },
        ],
      },
    ],
  },
  {
    id: 'm14',
    title: 'Capstone: Whole-System Design',
    description: 'Mechanical codes, sustainability and a full integrated design challenge.',
    icon: 'Building2',
    capstone: true,
    lessons: [
      {
        id: 'cap-1',
        title: 'Codes & low-GWP transition',
        articleIds: ['std-imc', 'std-nfpa96', 'kig-01'],
        xp: 60,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'The International Mechanical Code (IMC) is best described as…',
            choices: [
              'A voluntary efficiency guideline',
              'A model code adopted and enforced for mechanical system installation',
              'A refrigerant data sheet',
              'A fan selection chart',
            ],
            answer: 1,
            explanation:
              'The IMC is a model code that jurisdictions adopt to regulate the design and installation of mechanical systems.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'NFPA 96 governs ventilation control and fire protection of commercial cooking operations.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'NFPA 96 covers commercial kitchen exhaust — hoods, grease ducts, fans and fire suppression.',
          },
          {
            id: 'q3',
            kind: 'multiple-choice',
            prompt: 'The Kigali Amendment commits countries to phasing down…',
            choices: [
              'Ozone-depleting CFCs',
              'High-GWP hydrofluorocarbon (HFC) refrigerants',
              'Natural refrigerants',
              'Electric heating',
            ],
            answer: 1,
            explanation:
              'The Kigali Amendment to the Montreal Protocol schedules the global phase-down of high-GWP HFCs.',
          },
          {
            id: 'q4',
            kind: 'short-answer',
            prompt: 'A kitchen grease duct must comply with which fire standard discussed in this lesson?',
            answer: 'nfpa 96',
            explanation:
              'NFPA 96 sets the construction, clearance and cleaning requirements for grease exhaust systems.',
          },
        ],
      },
      {
        id: 'cap-2',
        title: 'Sustainability & efficiency',
        articleIds: ['edge-01', 'sust-efficiency'],
        xp: 60,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'IFC EDGE is a green building certification that focuses on…',
            choices: [
              'Aesthetics only',
              'Resource efficiency in energy, water and materials',
              'Refrigerant colour coding',
              'Duct gauge selection',
            ],
            answer: 1,
            explanation:
              'EDGE certifies measurable savings in energy, water and embodied materials, popular in emerging markets.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Variable-speed drives on fans and pumps are a common HVAC energy efficiency measure.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'VSDs cut fan and pump energy sharply at part load because power varies with the cube of speed.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'Right-sizing equipment to an accurate load avoids the energy penalty of doing what?',
            answer: 'oversizing',
            explanation:
              'Oversized equipment short-cycles, dehumidifies poorly and wastes energy; an accurate load avoids it.',
          },
        ],
      },
      {
        id: 'cap-3',
        title: 'Integrated design challenge',
        articleIds: ['load-overview', 'air-static-pressure', 'damp-balancing'],
        xp: 60,
        quiz: [
          {
            id: 'q1',
            kind: 'multiple-choice',
            prompt: 'You are designing an office HVAC system. What is the correct first step?',
            choices: [
              'Order the diffusers',
              'Perform a cooling and heating load calculation',
              'Pour the equipment plinths',
              'Select the duct insulation colour',
            ],
            answer: 1,
            explanation:
              'Everything downstream — equipment, ducts, pipes — depends on a correct load calculation done first.',
          },
          {
            id: 'q2',
            kind: 'true-false',
            prompt: 'Fan selection requires the system total external static pressure derived from duct and fitting losses.',
            choices: ['True', 'False'],
            answer: 0,
            explanation:
              'You sum duct friction, fittings, coils, filters and dampers to get the static pressure the fan must deliver.',
          },
          {
            id: 'q3',
            kind: 'short-answer',
            prompt: 'The final field step that sets each branch to its design airflow using dampers is called what?',
            answer: 'balancing',
            explanation:
              'Air balancing adjusts volume dampers so every zone receives its design airflow, completing the installation.',
          },
          {
            id: 'q4',
            kind: 'multiple-choice',
            prompt: 'A space feels cool but humid and clammy. The most likely design error is…',
            choices: [
              'Undersized ductwork',
              'Oversized cooling equipment that short-cycles',
              'Too much insulation',
              'A missing balancing damper',
            ],
            answer: 1,
            explanation:
              'Oversized cooling satisfies the thermostat fast and runs too briefly to remove latent load, leaving the space humid.',
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
