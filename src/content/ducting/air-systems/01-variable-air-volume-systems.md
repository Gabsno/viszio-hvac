---
id: air-vav
title: "Variable air volume systems and VAV boxes"
pillar: ducting
topic: air-systems
order: 1
difficulty: intermediate
tier: free
tags: [vav, terminal-units, fan-energy]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 9
related: [ahu-01, air-static-pressure, ctrl-01]
last_updated: 2026-05-21
---

A variable air volume system holds supply air at a near-constant temperature and varies the quantity of air delivered to each zone to match its load. It is the workhorse of medium and large commercial buildings because it serves many zones from one air handler while saving large amounts of fan energy at part load.

## Constant volume versus variable volume

A constant air volume system pushes a fixed airflow into a zone and changes the supply air temperature to control the space. One air handler can comfortably serve only one thermal zone, because every zone on the system sees the same supply temperature. Multi-zone constant volume schemes solve this with reheat at every zone, which wastes energy by cooling air then heating it again.

A VAV system flips the logic. The air handler delivers air at a fixed cold temperature, typically 12 to 14 degC, and each zone gets a terminal box that throttles the airflow down as the cooling load falls. Because the fan only moves the air the building actually needs at that moment, a VAV system tracks load far more closely and one air handler can serve dozens of independent zones.

| Attribute | Constant volume | Variable air volume |
|---|---|---|
| Airflow to zone | Fixed | Modulated by load |
| Supply temperature | Varies | Roughly constant |
| Zones per air handler | One | Many |
| Part load fan energy | High | Low |

## How a VAV terminal box throttles airflow

A VAV box is a sheet metal casing containing a damper, an airflow sensor and a controller. The zone thermostat sends a cooling demand to the box controller, which positions the damper to deliver an airflow between a programmed minimum and maximum. As a zone cools down, the damper closes toward minimum; as it heats up, the damper opens toward maximum.

The airflow sensor is usually a multi-point averaging pitot ring sitting in the box inlet. It produces a velocity pressure signal that the controller converts to a volume flow rate. This measured flow is what makes the box useful, because the controller can then command a specific L/s rather than just a damper position.

<svg viewBox="0 0 460 150" width="460" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="55" width="180" height="40" fill="#cfe3f7" stroke="#33597f"/>
<rect x="200" y="45" width="120" height="60" fill="#e8e8e8" stroke="#555555"/>
<line x1="240" y1="50" x2="280" y2="100" stroke="#b03030" stroke-width="4"/>
<rect x="320" y="55" width="120" height="40" fill="#cfe3f7" stroke="#33597f"/>
<text x="60" y="40" font-size="13" fill="#33597f">Primary duct</text>
<text x="220" y="125" font-size="13" fill="#555555">VAV box damper</text>
<text x="345" y="120" font-size="13" fill="#33597f">To diffusers</text>
</svg>

## Pressure independent versus pressure dependent boxes

A pressure dependent box has only a damper and a thermostat. The thermostat directly positions the damper. If the static pressure in the primary duct rises, more air leaks through any given damper position and the zone gets over supplied. These boxes are cheap but unstable on a varying duct system.

A pressure independent box adds the airflow sensor and a flow control loop. The thermostat resets an airflow setpoint, and the box controller modulates the damper to hold that flow regardless of upstream pressure. This two loop arrangement is the standard choice. It keeps minimum ventilation reliable and lets you commission boxes by reading actual L/s.

## Reheat boxes and zone heating

A cooling only box simply reduces airflow as load drops. A perimeter zone often needs heat in the morning or in cool weather, so its box includes a reheat coil downstream of the damper, fed by hot water or electric resistance.

To avoid wasting energy, a reheat box is set up so that reheat only activates after the airflow has dropped to its minimum setpoint. The control sequence is cool by throttling air, then on falling load reduce to minimum airflow, then on continued falling temperature add reheat. The minimum airflow is held during reheat so the warm air still has enough velocity to reach the occupants.

## Static pressure and supply temperature reset

Two reset strategies turn a VAV system from acceptable to efficient.

### Duct static pressure reset

The supply fan is driven by a variable speed drive to hold a static pressure setpoint in the main duct. Instead of fixing that setpoint, the controller polls every VAV box and finds the one with the most open damper. If even the hungriest box is not fully open, the duct pressure is higher than needed, so the controller lowers the setpoint until one box damper is nearly wide open. This trim and respond logic cuts fan power continuously through the day.

### Supply air temperature reset

In mild weather the air handler can raise its supply temperature, which reduces overcooling and the reheat that follows it. The reset is typically driven by outdoor temperature or by the warmest zone. It must be applied carefully, because warmer supply air forces every box to deliver more airflow to remove the same heat, which can push fan energy back up. Good designs balance the two effects.

## Minimum airflow for ventilation

A VAV box minimum is not zero. Two things set the floor. First, ventilation, because the zone still needs its required outdoor air share even when there is no cooling load. Second, air distribution, because too little airflow lets the cold supply jet drop straight down instead of mixing across the ceiling. A common minimum is 20 to 30 percent of design airflow, but it should be checked against the ventilation calculation rather than assumed. Dual maximum control logic, which allows a lower cooling minimum and a separate higher heating airflow, reduces reheat energy while still protecting ventilation.

## Why VAV saves fan energy

Fan power follows the fan laws, falling roughly with the cube of airflow when the fan slows on a variable speed drive. A building rarely sits at peak load, so most operating hours occur at part load. When zones collectively call for 60 percent of design airflow, the fan can run near 60 percent speed and draw only about a quarter of its design power. Across a year that compounding effect is the single largest reason VAV displaced multi-zone constant volume reheat as the default for large commercial buildings.
