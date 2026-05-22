---
id: heat-hydronic-heating
title: "Hot water heating system design"
pillar: heating
topic: heating-systems
order: 1
difficulty: intermediate
tier: free
tags: [hydronic, heating, distribution]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 9
related: [heat-boilers, hyd-fundamentals]
---

A hot water heating system carries heat from a central boiler or heat pump to emitters around a building using circulating water. Good design is mostly about choosing sensible flow temperatures, matching emitters to them, and controlling the system so it tracks the real load.

## Low temperature distribution

For decades hydronic systems ran at **82/71 °C** flow and return because cast-iron radiators were small and needed hot surfaces to give up their output. Modern practice moves the other way, toward **low temperature hot water** at 70/50 °C, 55/45 °C, or lower.

There are two reasons. First, lower water temperatures cut standing heat losses from pipework and let pipes and fittings run at lower stress. Second, and far more important, a low return temperature is what allows a **condensing boiler** to condense and a **heat pump** to deliver a high COP. A system designed at 82/71 °C cannot condense; a system designed at 55/45 °C condenses for almost the whole season.

The trade-off is emitter size. Less water temperature means a smaller temperature difference between the emitter and the room, so the emitter must be physically larger to deliver the same heat. That is a cost and space decision the designer makes deliberately, with eyes open.

## Emitters

The emitter is where heat finally leaves the water and enters the space. Three types dominate.

### Radiators

A radiator delivers heat by a mix of radiation and natural convection. Its output depends strongly on the **mean water temperature** relative to the room. Manufacturers publish output at a reference temperature difference — historically 60 K, now often 50 K or 30 K. Drop the mean water temperature and output falls fast, so a radiator sized for 82/71 °C will deliver only about half its rating at 55/45 °C. Designing for low temperature means selecting larger or double-panel radiators from the start.

### Fan coils

A fan coil unit blows room air across a finned hot water coil. The fan forces convection, so a fan coil gives far more output per unit volume than a radiator and can still perform usefully at low water temperatures. Fan coils suit commercial spaces, allow the same unit to provide cooling from a separate coil, and respond quickly. They need power, filter maintenance, and condensate drainage if they also cool.

### Underfloor heating

Underfloor heating embeds pipe loops in or under the floor screed and uses the whole floor as a gentle, large-area emitter. Because the area is huge, the water temperature needed is very low — typically 35/30 °C. That makes underfloor heating the natural partner for condensing boilers and heat pumps. The penalties are slow response, because of the thermal mass of the screed, and a floor surface temperature limit of about 29 °C for comfort and to protect floor finishes.

| Emitter | Typical flow temperature | Response speed | Output per volume |
|---|---|---|---|
| Radiator | 55 to 75 °C | Medium | Low |
| Fan coil | 45 to 70 °C | Fast | High |
| Underfloor | 35 to 45 °C | Slow | Spread over floor |

## Flow and return temperatures

The **temperature difference**, or delta T, between flow and return sets how much water must circulate. The relationship is straightforward: heat carried equals mass flow times specific heat times delta T.

A useful figure to remember is that **1 L/s of water carries about 4.2 kW per kelvin of delta T**. So a 100 kW load on a 20 K delta T needs roughly 1.2 L/s; the same load on a 10 K delta T needs about 2.4 L/s.

A wide delta T is desirable. It means smaller pipes, smaller pumps, less pumping energy, and a lower return temperature that helps the heat source. A narrow delta T forces high flow rates and large circulators. Design for the widest delta T the emitters and controls can sustain.

## Pumping and zoning

Water is moved by **circulating pumps** sized to overcome the friction of pipework, fittings, valves, and emitters at design flow. Modern installations use **variable-speed pumps** that slow down as zone valves close and the load falls, saving pumping energy that rises with the cube of speed.

A building is split into **zones** so areas with different occupancy, orientation, or schedules can be controlled separately. Each zone has its own valve and thermostat. As zones close, two-port control valves at the emitters reduce flow, while a **bypass or differential pressure control** protects the pump and keeps the index circuit served. Splitting north and south faces, or offices and meeting rooms, prevents one warm zone from being overheated to satisfy a cold one.

## Weather compensation control

A fixed flow temperature is wasteful for most of the heating season. **Weather compensation**, also called outdoor reset, measures outdoor air temperature and slides the flow temperature along a **heating curve**: hot flow on the coldest days, much cooler flow in mild weather.

The benefits are real. Lower flow temperature in mild weather keeps the boiler condensing or the heat pump efficient, reduces emitter cycling, and gives steadier room temperatures because the emitters are never far from the required output. Room thermostats then trim the final few degrees. The curve is commissioned on site — too steep and rooms overheat in mild weather, too shallow and they undershoot in cold weather.

## Pairing with a condensing boiler

Every design decision above points the same way when the heat source is a condensing boiler. Choose low flow and return temperatures so the return stays below the flue gas dew point of about 55 °C. Size emitters generously for that low temperature. Design a wide delta T to keep the return cool. Avoid mixing valves and bypasses that recirculate hot water and lift the return temperature. Use weather compensation so the system spends most of its hours at the lowest workable flow temperature.

Get those choices right and the boiler condenses for most of the year, seasonal efficiency climbs above 95 percent, and the same logic carries over directly if the heat source is later changed to a heat pump.
