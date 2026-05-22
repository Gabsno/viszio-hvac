---
id: fund-units
title: "HVAC units and conversions you actually use"
pillar: fundamentals
topic: units
order: 1
difficulty: beginner
tier: free
tags: [units, conversions, capacity]
standards_referenced: []
region: global
ghana_callout: true
estimated_minutes: 7
related: [load-overview, psy-01]
last_updated: 2026-05-21
---

HVAC straddles two measurement worlds. Engineering education and standards lean on SI units, while a large slice of the equipment, software and rules of thumb still speaks the inch pound system. A working engineer must move between them fluently and without error.

## Capacity units

Capacity is the rate of heating or cooling, and it appears under several names.

The kilowatt (kW) is the SI unit of power and the cleanest way to express any HVAC capacity. The British thermal unit per hour (Btu/h) is the inch pound rate of heat flow and dominates American datasheets. The ton of refrigeration (TR) is a legacy cooling unit equal to 12000 Btu/h, originally the cooling effect of melting one short ton of ice in a day.

The conversions worth memorising are that one ton of refrigeration equals 3.517 kW, and that one kW equals 3412 Btu/h. A 10 TR chiller is therefore about 35 kW. Engineers also meet the kilocalorie per hour on some Asian equipment, where 1 kW equals 860 kcal/h.

## Airflow units

Airflow is volume per unit time and again carries three common units.

Litres per second (L/s) is the SI workhorse for ventilation rates and terminal flows. Cubic metres per hour (m3/h) is widely used for fans and air handling units, especially in Europe and Asia. The cubic foot per minute (CFM) is the inch pound unit dominant in North American practice.

The key bridges are that 1 L/s equals 3.6 m3/h, and that 1 L/s equals about 2.119 CFM. A handy field shortcut is that CFM is roughly twice the L/s value. So a 500 L/s air handler is about 1800 m3/h and about 1060 CFM.

## Pressure units

Air side pressures are small, so the units are small too.

The pascal (Pa) is the SI unit and the standard for duct static pressure and fan pressure. The inch of water gauge (in wg), sometimes written as inches w.c., is the inch pound unit used on American fan curves and filter ratings.

One inch of water gauge equals close to 249 Pa, conveniently near 250. A fan rated at 2 in wg is therefore developing about 500 Pa. For water side pressures the bar, the kilopascal and the metre of head appear, where 1 bar equals 100 kPa and roughly 10.2 metres of water head.

## Efficiency metrics

Cooling efficiency is reported by several ratios, and mixing them up overstates or understates performance badly.

COP, the coefficient of performance, is cooling or heating output divided by power input, a pure dimensionless number. A chiller at COP 5 delivers five units of cooling per unit of electricity.

EER, the energy efficiency ratio, divides cooling capacity in Btu/h by power input in watts, so it carries hidden units and is numerically larger. EER divided by 3.412 gives the COP. SEER, the seasonal energy efficiency ratio, is a weighted seasonal average for unitary equipment, always higher than the steady state EER because it credits favourable part load hours.

## A clear conversions table

| From | To | Multiply by |
|---|---|---|
| Ton of refrigeration | kW | 3.517 |
| kW | Btu/h | 3412 |
| Btu/h | kW | 0.000293 |
| L/s | m3/h | 3.6 |
| L/s | CFM | 2.119 |
| CFM | L/s | 0.4719 |
| in wg | Pa | 249 |
| bar | kPa | 100 |
| EER | COP | divide by 3.412 |
| kW | kcal/h | 860 |

## Common mistakes mixing SI and IP

A handful of errors recur on real projects.

The first is confusing a ton of refrigeration with a metric tonne of mass. They are unrelated; the cooling ton is a rate of heat flow.

The second is treating EER as if it were COP. Quoting a chiller at COP 12 because the datasheet showed EER 12 overstates efficiency by a factor of about 3.4.

The third is mismatching airflow units, for example sizing a duct in L/s while reading a fan curve in CFM, which silently halves or doubles the airflow.

The fourth is the small pressure slip of assuming 1 in wg equals 250 Pa exactly when the true figure is 249, harmless on a single fan but worth knowing on a long calculation.

The discipline that prevents all of these is simple: write the unit next to every number, and convert deliberately rather than by memory of a vague factor.

> 🇬🇭 **Ghana context**
> HVAC equipment reaching Accra is imported from North America, Europe, China and the Middle East, so a single project can mix American CFM and Btu/h datasheets with European m3/h and kW ones. An engineer comparing a Chinese VRF unit against an American packaged unit must first convert both onto a common SI basis before any selection is fair. Quoting a client a capacity in tons while sizing ducts in CFM and then specifying fans in Pa invites costly mismatches, so settle on one consistent unit set for each project and convert every datasheet onto it.
