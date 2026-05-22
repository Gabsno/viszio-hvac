---
id: psy-01
title: "What is psychrometrics and why it is the foundation of HVAC"
pillar: fundamentals
topic: psychrometrics
order: 1
difficulty: beginner
tier: free
tags: [air-properties, humidity, fundamentals]
standards_referenced: [ASHRAE-Fundamentals]
region: global
ghana_callout: true
estimated_minutes: 7
related: [psy-02, psy-03, load-01]
last_updated: 2026-05-21
---

Psychrometrics is the study of the thermodynamic properties of moist air and the processes that change those properties. Every cooling coil, every heating element, every fan and every humidifier in an HVAC system does one thing: it moves air from one state to another, and psychrometrics is the language that describes that movement.

## Moist air is a mixture

The air we condition is not a single substance. It is a mixture of dry air, which is itself mostly nitrogen and oxygen, and a small but hugely important amount of water vapour. Although water vapour rarely exceeds 2 to 3 percent of the mixture by mass, it carries a disproportionate share of the energy and almost all of the comfort problems.

The two components behave independently enough that we can treat the mixture using the ideal gas laws with good accuracy at the pressures and temperatures found in buildings. The dry air component stays constant in mass as air flows through a system. The water vapour component is what we add, remove, heat and cool. This separation is the conceptual key to the whole subject: when we track a process, we track what happens to a fixed mass of dry air and watch the water vapour riding along with it change.

## The properties that define an air state

A point of moist air is fully fixed once we know the barometric pressure and any two independent properties. The properties an engineer works with daily are these.

### Dry bulb temperature

This is the temperature read by an ordinary thermometer shielded from radiation and moisture. It is the property most people mean when they say temperature, and it measures sensible heat content.

### Wet bulb temperature

This is the temperature read by a thermometer whose bulb is wrapped in a wet wick with air moving across it. Evaporation cools the wick until equilibrium. Wet bulb temperature is closely tied to the total energy in the air and is the basis of evaporative cooling and cooling tower performance.

### Dew point temperature

This is the temperature at which the air becomes saturated if cooled at constant pressure and constant moisture content. Cool any surface below the dew point and condensation forms on it. Dew point is a direct, absolute indicator of how much moisture the air actually holds.

### Relative humidity

Relative humidity is the ratio of the water vapour pressure in the air to the saturation vapour pressure at the same dry bulb temperature, expressed as a percentage. It tells you how close the air is to saturation, but because saturation pressure changes sharply with temperature, the same relative humidity at two temperatures means very different amounts of water.

### Humidity ratio

Humidity ratio, sometimes called moisture content, is the mass of water vapour per unit mass of dry air, normally given in grams of water per kilogram of dry air. Unlike relative humidity it is an absolute measure that does not change when you simply heat or cool the air. It only changes when moisture is physically added or removed.

### Enthalpy

Enthalpy is the total heat energy of the moist air per kilogram of dry air, expressed in kilojoules per kilogram. It bundles the sensible heat of the dry air and the vapour together with the latent heat carried by the vapour. Enthalpy difference across a coil, multiplied by mass flow, gives total cooling or heating load.

### Specific volume

Specific volume is the volume occupied per kilogram of dry air, in cubic metres per kilogram. Its inverse, density, lets you convert between the volumetric airflow that fans deliver and the mass flow that thermodynamics requires.

## Every HVAC process is a state change

Once you see air as a state defined by these properties, the function of equipment becomes simple to describe. A heating coil raises dry bulb temperature while humidity ratio stays fixed. A cooling and dehumidifying coil lowers both dry bulb temperature and humidity ratio. A steam humidifier raises humidity ratio with little change in dry bulb temperature. Mixing return air with outdoor air produces a blended state somewhere between the two.

Because dry air mass is conserved, these processes obey straightforward energy and mass balances. The heat added or removed equals the mass flow of dry air multiplied by the change in enthalpy. The moisture added or removed equals the mass flow multiplied by the change in humidity ratio. Nothing more exotic is needed to size most equipment.

## Why it underpins everything else

Psychrometrics is not an academic side topic. It is the arithmetic behind the three central tasks of HVAC design.

Load calculations depend on it because the cooling load splits into a sensible part that changes temperature and a latent part that changes moisture, and you cannot separate the two without psychrometric relationships. Coil selection depends on it because a coil is specified by the entering and leaving air states, and those states are psychrometric points joined by a process line. Comfort depends on it because thermal comfort standards are written in terms of dry bulb temperature and humidity, both psychrometric quantities.

> 🇬🇭 **Ghana context**
> Accra sits in ASHRAE climate Zone 1A, hot and humid year round, with a typical outdoor design condition near 33°C dry bulb and 78 percent relative humidity. At that state the air carries a large mass of water vapour, so the latent portion of the cooling load is heavy and often dominates. Indoor design is usually held around 24 to 26°C with 55 to 65 percent relative humidity, which means a Ghana coil must do far more moisture removal than a coil in a dry climate, and ignoring that fact leads to clammy spaces even when the thermometer reads correctly.

## Where to go from here

The single most useful skill that follows from these ideas is reading the psychrometric chart, which puts every property and every process onto one diagram. From there the sensible and latent split becomes concrete, and the four basic processes fall naturally into place as directions you can trace with a pencil.
