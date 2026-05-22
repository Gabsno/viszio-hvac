// HVAC glossary — concise, original definitions for the terms index and flashcards.

export type GlossaryCategory =
  | 'Fundamentals'
  | 'Loads'
  | 'Cooling'
  | 'Heating'
  | 'Air & Ducting'
  | 'Piping'
  | 'Ventilation'
  | 'Controls'
  | 'Standards'
  | 'Equipment';

export interface GlossaryEntry {
  term: string;
  definition: string;
  category: GlossaryCategory;
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: 'ACCA',
    definition:
      'The Air Conditioning Contractors of America, a trade body best known for its Manual series of design procedures. Manual J, Manual D and Manual S are widely used to size residential equipment and ductwork.',
    category: 'Standards',
  },
  {
    term: 'Adiabatic Process',
    definition:
      'A process in which no heat is added to or removed from the air, even though its temperature may change. An ideal evaporative cooling step is treated as adiabatic because sensible heat is simply converted into latent heat.',
    category: 'Fundamentals',
  },
  {
    term: 'AHRI',
    definition:
      'The Air-Conditioning, Heating, and Refrigeration Institute, which publishes equipment rating standards and certifies performance. AHRI ratings let designers compare chillers, condensing units and coils on a consistent test basis.',
    category: 'Standards',
  },
  {
    term: 'AHU',
    definition:
      'An air handling unit, the central box that conditions and moves air through a building. It typically houses a fan, heating and cooling coils, filters, and dampers for outdoor and return air.',
    category: 'Air & Ducting',
  },
  {
    term: 'Air Changes Per Hour',
    definition:
      'A measure of how many times the full volume of air in a space is replaced each hour, written as ACH. It is found by dividing the airflow into a room by the room volume and is used to gauge ventilation intensity.',
    category: 'Ventilation',
  },
  {
    term: 'Apparatus Dew Point',
    definition:
      'The effective surface temperature a cooling coil would need if it dehumidified all the air it touched, found where the supply air condition line crosses the saturation curve. It anchors the slope of the coil process on a psychrometric chart.',
    category: 'Fundamentals',
  },
  {
    term: 'Approach',
    definition:
      'In a cooling tower, the difference between the leaving water temperature and the ambient wet-bulb temperature. A smaller approach means the tower is performing closer to its theoretical limit and generally costs more to build.',
    category: 'Cooling',
  },
  {
    term: 'ASHRAE',
    definition:
      'The American Society of Heating, Refrigerating and Air-Conditioning Engineers, the leading source of HVAC design standards and research. Its standards cover ventilation rates, energy efficiency, thermal comfort and refrigerant safety.',
    category: 'Standards',
  },
  {
    term: 'BACnet',
    definition:
      'An open communication protocol that lets building automation devices from different manufacturers exchange data. It standardizes how controllers, sensors and front-end software share points and commands.',
    category: 'Controls',
  },
  {
    term: 'Balancing Damper',
    definition:
      'A damper installed in a duct branch and set during commissioning to fine-tune airflow to design values. Once balanced it is usually locked in position so the distribution stays correct.',
    category: 'Air & Ducting',
  },
  {
    term: 'Balancing Valve',
    definition:
      'A hydronic valve used to set the correct flow rate through a circuit so each terminal gets its design water flow. It introduces a fixed, measurable resistance that compensates for differences in pipe runs.',
    category: 'Piping',
  },
  {
    term: 'Block Load',
    definition:
      'The peak load of an entire building or zone group calculated as a single combined figure, rather than summing the individual peaks of every room. It is used to size central plant because not all spaces peak at the same time.',
    category: 'Loads',
  },
  {
    term: 'BMS',
    definition:
      'A building management system, the network of controllers and software that monitors and operates HVAC and other building services. It schedules equipment, enforces setpoints, logs trends and raises alarms.',
    category: 'Controls',
  },
  {
    term: 'Boiler',
    definition:
      'A heating appliance that burns fuel or uses electricity to raise the temperature of water or generate steam. The heated medium is then circulated to coils, radiators or heat exchangers around the building.',
    category: 'Heating',
  },
  {
    term: 'Bypass Factor',
    definition:
      'The fraction of air that passes through a cooling coil without contacting the cold surface and therefore leaves unchanged. A coil with more rows and tighter fins has a lower bypass factor and dehumidifies more effectively.',
    category: 'Fundamentals',
  },
  {
    term: 'CAV',
    definition:
      'A constant air volume system that always delivers the same airflow and varies the supply temperature to match the load. It is simple and reliable but generally less energy efficient than variable air volume.',
    category: 'Air & Ducting',
  },
  {
    term: 'Chilled Water',
    definition:
      'Water cooled by a chiller, typically to around 6 to 7 degrees Celsius, and pumped to cooling coils throughout a building. It carries heat from the spaces back to the chiller for rejection.',
    category: 'Piping',
  },
  {
    term: 'Chiller',
    definition:
      'A machine that produces chilled water by running a refrigeration cycle and rejecting heat to air or to condenser water. It is the central cooling source for most large commercial buildings.',
    category: 'Cooling',
  },
  {
    term: 'CLTD',
    definition:
      'The cooling load temperature difference, a simplified value used in older manual methods to account for heat passing through walls and roofs. It bundles the effects of solar gain, thermal mass and time lag into one adjusted temperature difference.',
    category: 'Loads',
  },
  {
    term: 'Cold Room',
    definition:
      'An insulated enclosure kept at a controlled low temperature for storing perishable goods. It uses a dedicated refrigeration system sized for product load, infiltration through doors and the heat from lights and people.',
    category: 'Cooling',
  },
  {
    term: 'Commissioning',
    definition:
      'The structured process of verifying that HVAC systems are installed correctly and perform as the design intended. It includes functional testing of equipment and controls before the building is handed over.',
    category: 'Controls',
  },
  {
    term: 'Compressor',
    definition:
      'The component of a refrigeration cycle that raises the pressure and temperature of refrigerant vapour. It does the mechanical work that drives heat from the low-pressure side to the high-pressure side.',
    category: 'Cooling',
  },
  {
    term: 'Condenser',
    definition:
      'The heat exchanger where high-pressure refrigerant rejects heat and condenses from a vapour into a liquid. It is cooled by outdoor air or by condenser water from a cooling tower.',
    category: 'Cooling',
  },
  {
    term: 'Condenser Water',
    definition:
      'Water that carries heat from a water-cooled chiller condenser out to a cooling tower for rejection to the atmosphere. It runs warmer than chilled water and circulates in a separate loop.',
    category: 'Piping',
  },
  {
    term: 'Condensing Boiler',
    definition:
      'A boiler designed to recover extra heat by cooling its flue gases enough to condense the water vapour they carry. This recovered latent heat raises seasonal efficiency well above that of a conventional boiler.',
    category: 'Heating',
  },
  {
    term: 'Cooling Load',
    definition:
      'The rate at which heat must be removed from a space to keep it at the desired temperature and humidity. It combines heat from the sun, the envelope, occupants, equipment and outdoor air.',
    category: 'Loads',
  },
  {
    term: 'Cooling Tower',
    definition:
      'A device that rejects building heat to the atmosphere by evaporating a small portion of the circulating water. Warm condenser water is sprayed over fill while air passes through, cooling the remaining water.',
    category: 'Cooling',
  },
  {
    term: 'COP',
    definition:
      'The coefficient of performance, the ratio of useful heating or cooling delivered to the energy input required. A higher COP means a more efficient machine, and unlike SEER it is a unitless figure.',
    category: 'Cooling',
  },
  {
    term: 'COP Heating',
    definition:
      'The coefficient of performance of a heat pump in heating mode, comparing heat delivered to electrical energy consumed. Because the pump moves heat rather than creating it, this value is usually well above one.',
    category: 'Heating',
  },
  {
    term: 'Damper',
    definition:
      'A movable plate or set of blades inside a duct used to control or stop airflow. Dampers regulate volume, mix outdoor and return air, and isolate sections of a system.',
    category: 'Air & Ducting',
  },
  {
    term: 'Dead Band',
    definition:
      'A range around a setpoint within which the control system takes no action. A dead band prevents heating and cooling from fighting each other and stops equipment from cycling too often.',
    category: 'Controls',
  },
  {
    term: 'Delta-T',
    definition:
      'The temperature difference between the supply and return of a fluid, often the chilled or condenser water in a hydronic loop. A healthy delta-T means the system is transferring its design amount of heat per unit of flow.',
    category: 'Piping',
  },
  {
    term: 'Demand Controlled Ventilation',
    definition:
      'A strategy that adjusts outdoor airflow based on real occupancy, usually inferred from carbon dioxide sensors. It saves energy by avoiding the conditioning of fresh air that is not needed.',
    category: 'Ventilation',
  },
  {
    term: 'Design Conditions',
    definition:
      'The outdoor and indoor temperature and humidity values chosen as the basis for sizing HVAC equipment. Outdoor design points are selected so the system meets comfort targets in all but a small fraction of hours.',
    category: 'Loads',
  },
  {
    term: 'Dew Point',
    definition:
      'The temperature at which air becomes fully saturated and moisture begins to condense. When a surface is below the dew point of the surrounding air, condensation forms on it.',
    category: 'Fundamentals',
  },
  {
    term: 'Diffuser',
    definition:
      'An air outlet, usually in a ceiling, that spreads supply air into a room in a controlled pattern. Good diffuser selection mixes conditioned air gently without drafts or noise.',
    category: 'Air & Ducting',
  },
  {
    term: 'Diversity Factor',
    definition:
      'A multiplier that accounts for the fact that not all loads in a building reach their peak at the same moment. Applying diversity to a sum of individual peaks gives a more realistic, smaller plant size.',
    category: 'Loads',
  },
  {
    term: 'Dry-Bulb Temperature',
    definition:
      'The air temperature measured by an ordinary thermometer shielded from radiation and moisture. It reflects sensible heat content and is the value most people mean when they say temperature.',
    category: 'Fundamentals',
  },
  {
    term: 'Duct',
    definition:
      'A sealed channel, usually sheet metal or insulated board, that carries conditioned air between equipment and spaces. Ducts must be sized to deliver the required airflow at acceptable pressure loss and noise.',
    category: 'Air & Ducting',
  },
  {
    term: 'DX',
    definition:
      'Direct expansion, a cooling method in which refrigerant evaporates inside a coil that is in direct contact with the air being conditioned. It contrasts with chilled water systems, where water carries the cooling effect.',
    category: 'Cooling',
  },
  {
    term: 'Economizer',
    definition:
      'A control strategy that uses cool outdoor air to cool a building directly when conditions allow, reducing mechanical cooling. An airside economizer modulates dampers to bring in extra fresh air during mild weather.',
    category: 'Ventilation',
  },
  {
    term: 'EDGE',
    definition:
      'Excellence in Design for Greater Efficiencies, a green building certification developed by the International Finance Corporation. It rewards measurable savings in energy, water and embodied carbon in materials.',
    category: 'Standards',
  },
  {
    term: 'EER',
    definition:
      'The energy efficiency ratio, the cooling output in British thermal units per hour divided by the power input in watts at a single rating point. A higher EER indicates better efficiency at that fixed condition.',
    category: 'Cooling',
  },
  {
    term: 'Enthalpy',
    definition:
      'The total heat content of air per unit mass, combining both its sensible and latent heat. Comparing enthalpy at two points shows the full energy a coil must add or remove.',
    category: 'Fundamentals',
  },
  {
    term: 'Equal Friction',
    definition:
      'A duct sizing method that holds the same pressure loss per unit length throughout the system. It is simple to apply and gives reasonable results, though it does not automatically balance the branches.',
    category: 'Air & Ducting',
  },
  {
    term: 'Evaporator',
    definition:
      'The heat exchanger where low-pressure refrigerant absorbs heat and boils into a vapour. It is the part of the cycle that produces the useful cooling effect.',
    category: 'Cooling',
  },
  {
    term: 'Exhaust Air',
    definition:
      'Air that is deliberately removed from a building and discharged outdoors, often from toilets, kitchens or laboratories. Exhaust removes heat, odours and contaminants and helps control space pressure.',
    category: 'Ventilation',
  },
  {
    term: 'Expansion Tank',
    definition:
      'A vessel that absorbs the change in volume of water in a closed hydronic loop as its temperature rises and falls. It keeps system pressure within safe limits and prevents air from being drawn in.',
    category: 'Piping',
  },
  {
    term: 'Expansion Valve',
    definition:
      'A metering device that drops high-pressure liquid refrigerant to low pressure before it enters the evaporator. It also regulates refrigerant flow to match the cooling load.',
    category: 'Cooling',
  },
  {
    term: 'Fan Laws',
    definition:
      'A set of relationships describing how a fan responds to a change in speed. Airflow varies directly with speed, pressure with the square of speed, and power with the cube of speed.',
    category: 'Air & Ducting',
  },
  {
    term: 'FCU',
    definition:
      'A fan coil unit, a compact terminal device with a fan and one or more coils serving a single zone. It conditions room air locally using chilled or hot water, often with little or no ducting.',
    category: 'Equipment',
  },
  {
    term: 'Fire Damper',
    definition:
      'A damper that closes automatically when a duct passes through a fire-rated wall or floor and heat is detected. It blocks the spread of flame and helps maintain the fire compartment.',
    category: 'Air & Ducting',
  },
  {
    term: 'Friction Rate',
    definition:
      'The pressure loss per unit length of duct used as the target for sizing, often given in pascals per metre. Choosing the friction rate sets the balance between duct size, fan energy and noise.',
    category: 'Air & Ducting',
  },
  {
    term: 'Grease Duct',
    definition:
      'A dedicated, sealed duct that carries grease-laden vapours from a commercial kitchen exhaust hood to the outside. It must be liquid-tight and fire-rated because of the flammable residue it collects.',
    category: 'Air & Ducting',
  },
  {
    term: 'GWP',
    definition:
      'The global warming potential of a refrigerant, expressed relative to carbon dioxide over a fixed time horizon. Lower GWP refrigerants are preferred to reduce the climate impact of any leakage.',
    category: 'Standards',
  },
  {
    term: 'Head',
    definition:
      'The energy a pump adds to a fluid, expressed as an equivalent height of that fluid. A pump must provide enough head to overcome the friction and elevation of the circuit it serves.',
    category: 'Piping',
  },
  {
    term: 'Heat Pump',
    definition:
      'A device that moves heat from one place to another and can usually reverse to provide both heating and cooling. In heating mode it extracts heat from outdoor air, water or ground and delivers it indoors.',
    category: 'Heating',
  },
  {
    term: 'Heating Load',
    definition:
      'The rate at which heat must be supplied to a space to hold it at the desired temperature in cold conditions. It is driven mainly by heat loss through the envelope and by cold infiltration air.',
    category: 'Loads',
  },
  {
    term: 'HEPA',
    definition:
      'A high efficiency particulate air filter that captures at least 99.97 percent of particles at the most penetrating size. It is used where very clean air is essential, such as cleanrooms and hospitals.',
    category: 'Ventilation',
  },
  {
    term: 'Humidity Ratio',
    definition:
      'The mass of water vapour carried by each unit mass of dry air, sometimes called the moisture content. It stays constant during simple heating or cooling that does not condense moisture.',
    category: 'Fundamentals',
  },
  {
    term: 'Hydronic System',
    definition:
      'A system that uses water as the medium to carry heating or cooling around a building. Water moves energy efficiently through small pipes, making hydronic distribution compact compared with all-air systems.',
    category: 'Piping',
  },
  {
    term: 'Infiltration',
    definition:
      'The uncontrolled leakage of outdoor air into a building through cracks, gaps and openings. It adds to both heating and cooling loads and is hard to predict precisely.',
    category: 'Loads',
  },
  {
    term: 'Internal Gains',
    definition:
      'The heat released inside a space by people, lighting and equipment. These gains add directly to the cooling load and reduce the heating needed.',
    category: 'Loads',
  },
  {
    term: 'IPLV',
    definition:
      'The integrated part-load value, a single efficiency number that weights chiller performance across several part-load points. It reflects real operation better than a full-load rating because chillers rarely run at full capacity.',
    category: 'Cooling',
  },
  {
    term: 'Kigali Amendment',
    definition:
      'A 2016 amendment to the Montreal Protocol that commits countries to phasing down high global warming potential hydrofluorocarbon refrigerants. It drives the HVAC industry toward lower impact refrigerants.',
    category: 'Standards',
  },
  {
    term: 'Latent Heat',
    definition:
      'Heat associated with changing the moisture content of air rather than its temperature. Removing latent heat means condensing water vapour, which is the dehumidification part of cooling.',
    category: 'Fundamentals',
  },
  {
    term: 'Low Delta-T Syndrome',
    definition:
      'A common chilled water fault where the temperature difference across the system is smaller than design. It forces higher flow and pump energy to deliver the same cooling and can starve the plant of capacity.',
    category: 'Piping',
  },
  {
    term: 'Manual J',
    definition:
      'The ACCA procedure for calculating room-by-room heating and cooling loads in residential buildings. It is the accepted basis for correctly sizing home HVAC equipment.',
    category: 'Standards',
  },
  {
    term: 'MERV',
    definition:
      'The minimum efficiency reporting value, a rating scale for how well an air filter captures particles of various sizes. A higher MERV number means finer filtration but usually greater airflow resistance.',
    category: 'Ventilation',
  },
  {
    term: 'NFPA 96',
    definition:
      'The standard governing ventilation control and fire protection for commercial cooking operations. It covers the design of kitchen hoods, grease ducts and fire suppression systems.',
    category: 'Standards',
  },
  {
    term: 'NPSH',
    definition:
      'The net positive suction head, the pressure margin available at a pump inlet above the fluid vapour pressure. If the available margin falls below what the pump requires, the fluid vaporizes and the pump cavitates.',
    category: 'Piping',
  },
  {
    term: 'ODP',
    definition:
      'The ozone depletion potential of a refrigerant, a measure of how strongly it harms the stratospheric ozone layer. Older chlorinated refrigerants were phased out because of their high ODP.',
    category: 'Standards',
  },
  {
    term: 'Outdoor Air',
    definition:
      'Fresh air brought into a building from outside to dilute indoor contaminants and supply oxygen for occupants. It must be conditioned, which adds to the heating and cooling load.',
    category: 'Ventilation',
  },
  {
    term: 'PID Control',
    definition:
      'A control method that combines proportional, integral and derivative terms to drive a measured value to its setpoint. The three terms together give a stable response without lasting offset.',
    category: 'Controls',
  },
  {
    term: 'Plenum',
    definition:
      'An enclosed air space that acts as a distribution or collection chamber for a system. A ceiling void is often used as a return air plenum so a separate return duct is not needed.',
    category: 'Air & Ducting',
  },
  {
    term: 'Pressurization',
    definition:
      'Deliberately keeping a space at a slightly higher or lower air pressure than its surroundings. Positive pressure keeps contaminants out, while negative pressure contains odours and pollutants within a room.',
    category: 'Ventilation',
  },
  {
    term: 'Primary-Secondary',
    definition:
      'A hydronic piping arrangement that decouples a constant-flow production loop from a variable-flow distribution loop. A short common pipe links the two so each set of pumps operates independently.',
    category: 'Piping',
  },
  {
    term: 'Range',
    definition:
      'In a cooling tower, the temperature drop of the water between entering and leaving the tower. Range reflects the heat actually being rejected, while approach reflects how hard the tower is working.',
    category: 'Cooling',
  },
  {
    term: 'Refrigerant',
    definition:
      'A working fluid that absorbs and releases heat as it changes between liquid and vapour at convenient pressures. It is the substance that carries heat around a refrigeration cycle.',
    category: 'Cooling',
  },
  {
    term: 'Register',
    definition:
      'A louvered air outlet or inlet that includes an integral damper for adjusting volume. It both directs the air and provides simple flow control at the opening.',
    category: 'Air & Ducting',
  },
  {
    term: 'Relative Humidity',
    definition:
      'The amount of moisture in the air compared with the most it could hold at the same temperature, given as a percentage. As air is warmed without adding moisture, its relative humidity falls.',
    category: 'Fundamentals',
  },
  {
    term: 'Reset',
    definition:
      'A control strategy that adjusts a setpoint based on a changing condition such as outdoor temperature or load. Resetting supply water or air temperature saves energy while still meeting demand.',
    category: 'Controls',
  },
  {
    term: 'Retro-Commissioning',
    definition:
      'The process of investigating and tuning the HVAC systems of an existing building to restore or improve performance. It finds faults and drifted settings that have crept in since the building was new.',
    category: 'Controls',
  },
  {
    term: 'RTS Method',
    definition:
      'The radiant time series method, a modern cooling load procedure that models how absorbed heat is released to a space over time. It improves on older methods by treating radiant and convective heat separately.',
    category: 'Loads',
  },
  {
    term: 'SEER',
    definition:
      'The seasonal energy efficiency ratio, an estimate of cooling efficiency averaged across a typical cooling season. It captures part-load behaviour better than a single-point rating like EER.',
    category: 'Cooling',
  },
  {
    term: 'Sensible Heat',
    definition:
      'Heat that changes the temperature of air without changing its moisture content. Warming or cooling air with a dry coil involves only sensible heat.',
    category: 'Fundamentals',
  },
  {
    term: 'Sensible Heat Ratio',
    definition:
      'The share of a total cooling load that is sensible rather than latent, written as a fraction or percentage. It sets the slope of the supply air process on a psychrometric chart and guides coil selection.',
    category: 'Fundamentals',
  },
  {
    term: 'Sequence of Operation',
    definition:
      'A written description of how a control system should behave under every operating condition. It tells the contractor and programmer exactly when equipment starts, stops and modulates.',
    category: 'Controls',
  },
  {
    term: 'Setpoint',
    definition:
      'The target value a control system tries to maintain, such as a room temperature or a supply air condition. The controller compares the measured value with the setpoint and acts on the difference.',
    category: 'Controls',
  },
  {
    term: 'SMACNA',
    definition:
      'The Sheet Metal and Air Conditioning Contractors National Association, known for its duct construction standards. Its manuals define how ductwork should be built, sealed and supported for different pressure classes.',
    category: 'Standards',
  },
  {
    term: 'Smoke Damper',
    definition:
      'A damper that closes on a signal from the fire alarm system to stop smoke from spreading through ductwork. It protects escape routes and limits smoke migration between zones.',
    category: 'Air & Ducting',
  },
  {
    term: 'Solar Heat Gain Coefficient',
    definition:
      'The fraction of solar radiation striking a window that ends up as heat inside the space. A lower coefficient means the glazing blocks more solar heat and reduces cooling load.',
    category: 'Loads',
  },
  {
    term: 'Specific Fan Power',
    definition:
      'The electrical power a fan draws for each unit of airflow it delivers, a measure of distribution efficiency. A lower specific fan power means the ductwork and fan are moving air with less wasted energy.',
    category: 'Air & Ducting',
  },
  {
    term: 'Static Pressure',
    definition:
      'The pressure that air exerts equally in all directions against the walls of a duct. Fans must overcome the system static pressure to push air through filters, coils and ductwork.',
    category: 'Air & Ducting',
  },
  {
    term: 'Static Regain',
    definition:
      'A duct sizing method that resizes each section so the pressure recovered from slowing the air offsets the friction in the next run. It produces nearly equal pressure at each branch take-off.',
    category: 'Air & Ducting',
  },
  {
    term: 'Subcooling',
    definition:
      'Cooling liquid refrigerant below its condensing temperature after it leaves the condenser. Adequate subcooling ensures only liquid reaches the expansion valve and improves cycle capacity.',
    category: 'Cooling',
  },
  {
    term: 'Superheat',
    definition:
      'Heating refrigerant vapour above its boiling temperature after it leaves the evaporator. Maintaining some superheat protects the compressor by ensuring no liquid refrigerant reaches it.',
    category: 'Cooling',
  },
  {
    term: 'TAB',
    definition:
      'Testing, adjusting and balancing, the process of measuring and tuning a system so air and water flows match the design. It is a key step in proving that an HVAC installation will perform as intended.',
    category: 'Controls',
  },
  {
    term: 'Three-Way Valve',
    definition:
      'A control valve with three ports that either mixes two streams or diverts one stream into two paths. In hydronic systems it lets flow bypass a coil so the loop flow stays roughly constant.',
    category: 'Piping',
  },
  {
    term: 'Throw',
    definition:
      'The distance an air stream from a diffuser travels before its velocity drops to a defined low value. Selecting the right throw ensures supply air reaches the occupied zone without causing drafts.',
    category: 'Air & Ducting',
  },
  {
    term: 'Ton Of Refrigeration',
    definition:
      'A unit of cooling capacity equal to the rate of heat removal needed to freeze one short ton of water in a day. One ton is about 3.5 kilowatts of cooling.',
    category: 'Cooling',
  },
  {
    term: 'Total Pressure',
    definition:
      'The sum of the static pressure and the velocity pressure of moving air. It represents the full energy of the air stream and is what a fan must supply to move air through a system.',
    category: 'Air & Ducting',
  },
  {
    term: 'Two-Way Valve',
    definition:
      'A control valve with one inlet and one outlet that throttles flow through a coil. Using two-way valves makes the loop flow vary with load, which suits variable-speed pumping.',
    category: 'Piping',
  },
  {
    term: 'Type I Hood',
    definition:
      'A commercial kitchen exhaust hood designed to capture grease-laden vapours and smoke from cooking equipment. It must be paired with a grease duct and fire suppression to meet kitchen ventilation rules.',
    category: 'Air & Ducting',
  },
  {
    term: 'Variable Primary Flow',
    definition:
      'A chilled water arrangement in which a single set of variable-speed pumps serves both the chillers and the distribution. It is simpler and more efficient than primary-secondary but needs careful flow control.',
    category: 'Piping',
  },
  {
    term: 'VAV',
    definition:
      'A variable air volume system that holds the supply temperature steady and changes the airflow to each zone to match the load. Reducing airflow at part load saves significant fan energy.',
    category: 'Air & Ducting',
  },
  {
    term: 'Velocity Pressure',
    definition:
      'The pressure created by the motion of air, related to the square of its speed. It is the component of total pressure that can be recovered as static pressure when the air slows down.',
    category: 'Air & Ducting',
  },
  {
    term: 'Ventilation Rate',
    definition:
      'The quantity of outdoor air supplied to a space, usually set by occupancy and floor area. Codes specify minimum ventilation rates to keep indoor air healthy and comfortable.',
    category: 'Ventilation',
  },
  {
    term: 'VRF',
    definition:
      'A variable refrigerant flow system that uses one or more outdoor units to serve many indoor units through refrigerant piping. It modulates compressor speed and refrigerant flow to match each zone, and many systems can heat and cool at the same time.',
    category: 'Cooling',
  },
  {
    term: 'Wet-Bulb Temperature',
    definition:
      'The temperature read by a thermometer with a wetted wick exposed to moving air, lowered by evaporation. It reflects both the heat and the moisture in the air and sets the limit for evaporative cooling.',
    category: 'Fundamentals',
  },
];
