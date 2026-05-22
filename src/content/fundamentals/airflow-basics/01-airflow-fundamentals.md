---
id: fund-airflow
title: "Airflow fundamentals pressure velocity and the fan laws"
pillar: fundamentals
topic: airflow-basics
order: 1
difficulty: beginner
tier: free
tags: [airflow, pressure, fan-laws]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 8
related: [air-fans, duct-01, air-static-pressure]
last_updated: 2026-05-21
---

Air side HVAC rests on a small set of relationships between how much air flows, how fast it moves and what pressure is needed to push it. Master these and duct sizing, fan selection and balancing all become predictable rather than mysterious.

## Volume flow velocity and area

Volume flow is the quantity of air moving past a point in a given time, measured in litres per second (L/s) or cubic metres per hour (m3/h). It is the number that matters for comfort and ventilation, because it is what carries heat away from a room and brings fresh air in.

Velocity is how fast the air travels, in metres per second (m/s). Velocity and volume flow are linked through duct area by a simple rule:

Volume flow equals velocity times area

If 400 L/s, which is 0.4 cubic metres per second, must pass through a duct at 4 m/s, the duct needs a cross sectional area of 0.4 divided by 4, which is 0.1 square metres. The same flow forced through a smaller duct simply moves faster. This trade off between duct size and air velocity sits at the heart of every duct sizing decision: smaller ducts are cheaper but the higher velocity costs fan energy and makes noise.

| Quantity | Symbol idea | SI unit | Typical duct value |
|---|---|---|---|
| Volume flow | Q | L/s or m3/h | system dependent |
| Velocity | v | m/s | 4 to 8 m/s in mains |
| Area | A | m2 | derived from Q and v |

## Static velocity and total pressure

Air in a duct carries pressure in two forms, and understanding the split prevents many measurement errors.

Static pressure is the pressure the air exerts on the duct walls in all directions. It is the stored, potential form of pressure, and it is what the fan must develop to overcome system resistance.

Velocity pressure is the pressure associated with the motion of the air, the kinetic form. It depends on air density and the square of velocity. Because it follows velocity squared, doubling the air speed quadruples the velocity pressure.

Total pressure is simply the sum of the two:

Total pressure equals static pressure plus velocity pressure

Total pressure is the true measure of the energy in the airstream. As air flows along a duct, friction steadily converts total pressure into heat, so total pressure always falls in the direction of flow. Static and velocity pressure individually can rise or fall as the duct changes size, but their sum can only decrease. A pitot tube measures all three, which is why it is the reference instrument for duct traverses.

## Friction loss and dynamic loss

The pressure a fan must supply is consumed by two kinds of loss.

Friction loss is the steady rubbing of air against straight duct walls. It is spread along the duct length and is usually quoted as a pressure drop per metre, for example 0.8 to 1.0 Pa per metre in a typical low velocity design. Longer runs and rougher duct surfaces increase it.

Dynamic loss, also called fitting loss, happens where the airflow is disturbed: elbows, transitions, tees, dampers and the entry and exit of equipment. Each disturbance forces the air to change direction or speed, creating turbulence that drains energy. Dynamic losses are expressed as a multiple of the velocity pressure through a loss coefficient. In a compact, fitting heavy system the dynamic losses can exceed the straight friction losses, which is why crowded plant rooms are hard on fans.

## The three fan laws

The fan laws relate a fan's speed to its airflow, pressure and power, for the same fan on the same air system. They are the most useful shortcuts in air side engineering.

### Law one airflow

Airflow is directly proportional to fan speed. Run the fan at 70 percent speed and it delivers 70 percent of the airflow. The relationship is linear and intuitive.

### Law two pressure

Pressure rises with the square of speed. At 70 percent speed the fan develops 0.7 squared, which is 0.49, so roughly half the design pressure. This matches the duct system, whose required pressure also follows flow squared.

### Law three power

Power rises with the cube of speed. At 70 percent speed the fan draws 0.7 cubed, which is 0.34, only about a third of design power.

| Fan speed | Airflow | Pressure | Power |
|---|---|---|---|
| 100 percent | 100 percent | 100 percent | 100 percent |
| 80 percent | 80 percent | 64 percent | 51 percent |
| 50 percent | 50 percent | 25 percent | 13 percent |

## Why halving fan speed cuts power to one eighth

The cube law in the third fan law is the single most valuable fact in efficient air design. Halving the speed to 50 percent gives 0.5 cubed, which equals 0.125, so the fan draws only one eighth of its full speed power while still moving half the air.

<svg viewBox="0 0 380 200" width="380" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="170" x2="350" y2="170" stroke="#333333" stroke-width="2"/>
<line x1="50" y1="170" x2="50" y2="20" stroke="#333333" stroke-width="2"/>
<path d="M50 170 Q230 165 330 30" fill="none" stroke="#b03030" stroke-width="3"/>
<line x1="200" y1="170" x2="200" y2="151" stroke="#1a7a3a" stroke-width="2"/>
<line x1="50" y1="151" x2="200" y2="151" stroke="#1a7a3a" stroke-dasharray="4"/>
<text x="120" y="140" font-size="13" fill="#b03030">Power versus speed</text>
<text x="150" y="188" font-size="12" fill="#1a7a3a">50 percent speed</text>
<text x="10" y="148" font-size="12" fill="#1a7a3a">13 percent</text>
</svg>

This is why variable speed drives and variable air volume systems save so much energy. A building seldom needs full design airflow, so for most operating hours the fan can run slowed down, and the savings compound across thousands of hours. The same cube law applies to pumps, making it a universal principle of fluid moving equipment in HVAC.
