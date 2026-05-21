---
id: refr-01
title: "The vapor compression refrigeration cycle explained"
pillar: core-engineering
topic: refrigeration-cycle
order: 1
difficulty: beginner
tier: free
tags: [refrigeration, thermodynamics, fundamentals]
standards_referenced: []
region: global
ghana_callout: true
estimated_minutes: 8
related: [chil-02, vrf-01, cold-01]
last_updated: 2026-05-21
---

Almost every air conditioner, chiller, heat pump and cold room on earth runs on the same loop: the vapor compression refrigeration cycle. Learn this one cycle well and the rest of refrigeration becomes variations on a theme.

## Moving heat the wrong way

Heat naturally flows from hot to cold. A refrigeration cycle does the opposite: it moves heat from a cooler place, the space you want to cool, to a warmer place, the outdoors. That does not happen for free, and the cycle needs a continuous input of work, the compressor, to make it happen.

The trick is a working fluid called the refrigerant, chosen because it boils and condenses at convenient temperatures and pressures. By boiling the refrigerant where you want to absorb heat and condensing it where you want to reject heat, the cycle uses the large energy of phase change to carry heat across a temperature gap.

## The four components and four processes

The cycle has four components connected in a closed loop. The refrigerant passes through all four continuously.

<svg viewBox="0 0 480 300" width="480" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="480" height="300" fill="#ffffff"/>
  <rect x="60" y="40" width="120" height="50" fill="#cfe8ff" stroke="#1a1a1a"/>
  <text x="120" y="70" font-size="13" text-anchor="middle" fill="#1a1a1a">Condenser</text>
  <rect x="300" y="40" width="120" height="50" fill="#ffd9cc" stroke="#1a1a1a"/>
  <text x="360" y="70" font-size="13" text-anchor="middle" fill="#1a1a1a">Compressor</text>
  <rect x="300" y="210" width="120" height="50" fill="#ffd9cc" stroke="#1a1a1a"/>
  <text x="360" y="240" font-size="13" text-anchor="middle" fill="#1a1a1a">Evaporator</text>
  <rect x="60" y="210" width="120" height="50" fill="#cfe8ff" stroke="#1a1a1a"/>
  <text x="120" y="235" font-size="12" text-anchor="middle" fill="#1a1a1a">Expansion</text>
  <text x="120" y="250" font-size="12" text-anchor="middle" fill="#1a1a1a">device</text>
  <line x1="300" y1="65" x2="180" y2="65" stroke="#1a1a1a" stroke-width="2"/>
  <line x1="120" y1="90" x2="120" y2="210" stroke="#1a1a1a" stroke-width="2"/>
  <line x1="180" y1="235" x2="300" y2="235" stroke="#1a1a1a" stroke-width="2"/>
  <line x1="360" y1="210" x2="360" y2="90" stroke="#1a1a1a" stroke-width="2"/>
  <text x="240" y="55" font-size="11" text-anchor="middle" fill="#1a1a1a">hot gas</text>
  <text x="240" y="225" font-size="11" text-anchor="middle" fill="#1a1a1a">cold vapor</text>
  <text x="240" y="285" font-size="11" text-anchor="middle" fill="#1a1a1a">heat in</text>
  <text x="240" y="115" font-size="11" text-anchor="middle" fill="#1a1a1a">heat out</text>
</svg>

### Compression

The compressor draws in low pressure refrigerant vapor and squeezes it to high pressure. This adds work energy to the refrigerant and raises its temperature sharply, so the refrigerant leaves the compressor as a hot, high pressure gas, hotter than the outdoor air.

### Condensation

The hot gas flows into the condenser, where outdoor air or water carries heat away. Because the gas is now hotter than the surroundings, heat flows out naturally. As it loses heat the refrigerant condenses from gas to liquid, releasing its latent heat of condensation. It leaves as a high pressure liquid.

### Expansion

The high pressure liquid passes through the expansion device, a valve or fixed restriction. This drops its pressure suddenly. With the pressure low, the refrigerant's boiling point falls well below the temperature of the space to be cooled, and a small fraction flashes to vapor, chilling the mixture.

### Evaporation

The cold low pressure refrigerant enters the evaporator inside the conditioned space. Here it is colder than the room, so heat flows into it, and that heat boils the liquid refrigerant into vapor. Absorbing the latent heat of evaporation is how the cycle actually removes heat from the room. The vapor returns to the compressor and the loop repeats.

## Superheat and subcooling

Two refinements protect the equipment and improve performance.

Superheat is the extra temperature added to the vapor after it has fully boiled in the evaporator. A few degrees of superheat guarantees that only dry vapor reaches the compressor. Liquid refrigerant is nearly incompressible, so any liquid carried into the compressor can cause slugging and mechanical damage. Superheat is the safety margin against that.

Subcooling is cooling the liquid below its condensing temperature after it has fully condensed. Subcooled liquid entering the expansion device flashes less and arrives at the evaporator with more capacity to absorb heat, which improves the useful cooling per kilogram of refrigerant circulated.

## The pressure enthalpy diagram

Engineers visualise the cycle on a pressure enthalpy diagram, with pressure on the vertical axis and enthalpy, the heat content, on the horizontal axis. The cycle traces a rough rectangle.

Compression moves up the right side, raising pressure. Condensation moves left across the top at high pressure as heat leaves. Expansion drops straight down at constant enthalpy. Evaporation moves right across the bottom at low pressure as heat is absorbed. The horizontal distance across the bottom is the refrigerating effect; the horizontal distance across the top includes the work the compressor added. Reading this diagram tells you exactly how much heat is moved and how much work it cost.

## Coefficient of performance

The efficiency of the cycle is the coefficient of performance, the COP:

COP = useful cooling delivered / work input to the compressor

A COP of 4 means the cycle delivers four units of cooling for every unit of electrical work, which is why a heat pump can be cheaper to run than a resistance heater. COP is a ratio of energy to energy, so it has no units.

### What raises and lowers COP

COP is highest when the cycle works across a small temperature gap. Anything that widens the gap between evaporating and condensing temperatures hurts it.

- A hotter condenser, from high outdoor air temperature or a dirty coil, raises the high pressure, increases compressor work and lowers COP.
- A colder evaporator than necessary widens the gap and lowers COP, so do not set spaces colder than required.
- Fouled heat exchangers, low refrigerant charge and restricted airflow all push the cycle apart and waste energy.
- Clean coils, adequate airflow, correct charge and modest temperature lifts keep COP high.

> 🇬🇭 **Ghana context**
> In Accra's hot climate, outdoor design temperatures near 33°C push condensing temperatures and pressures up, which directly lowers COP and raises running cost just when cooling demand is highest. Keep condenser coils clean and unobstructed, give air-cooled units free airflow, and shade outdoor units where possible. With grid reliability variable, an efficient cycle also reduces the load placed on backup generators.
