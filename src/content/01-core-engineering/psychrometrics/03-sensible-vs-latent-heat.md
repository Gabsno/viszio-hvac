---
id: psy-03
title: "Sensible vs latent heat in HVAC"
pillar: core-engineering
topic: psychrometrics
order: 3
difficulty: beginner
tier: free
tags: [sensible-heat, latent-heat, humidity]
standards_referenced: []
region: global
ghana_callout: true
estimated_minutes: 7
related: [psy-01, psy-04, cold-01]
last_updated: 2026-05-21
---

Cooling and heating loads always split into two distinct kinds of heat. One changes how warm the air feels, the other changes how much moisture it carries. Treating them separately is the difference between a system that holds comfort and one that runs cold but clammy.

## Sensible heat changes temperature

Sensible heat is energy that changes the dry bulb temperature of air without changing its moisture content. When sunlight warms a room, when people give off body heat by convection, or when a heating coil warms an airstream, the result is a rise in dry bulb temperature at constant humidity ratio.

On the psychrometric chart a purely sensible process is a horizontal line, because humidity ratio is plotted on the vertical axis and it does not move. Sensible heat is intuitive: it is what an ordinary thermometer reports, and it is what most people mean when they say a room is hot or cold.

## Latent heat changes moisture

Latent heat is energy associated with changing the moisture content of the air, specifically the energy tied up in evaporating or condensing water. When occupants breathe and perspire, when a kettle boils, or when humid outdoor air infiltrates a building, water vapour enters the space and carries latent heat with it. Removing that vapour at a cooling coil means condensing it, which releases its latent heat to the coil.

A purely latent process plots as a vertical line on the chart, a change in humidity ratio at constant dry bulb temperature. Latent heat is invisible to a dry bulb thermometer, which is precisely why humidity problems are so often missed.

## Total heat is the sum

The total heat content of moist air is its enthalpy, and total load is simply the sensible load plus the latent load. A cooling coil that lowers both temperature and moisture is handling both at once, and its total duty is the enthalpy change of the air multiplied by the mass flow of dry air.

### The sensible heat ratio

The sensible heat ratio, or SHR, is the sensible load divided by the total load. It is a single number between zero and one that describes the character of a load.

An SHR near 0.95 means the load is almost entirely sensible, typical of a dry climate or a space with few occupants. An SHR near 0.65 means a third of the load is latent, typical of a crowded space or a humid climate. SHR matters because it must be matched by the coil: a coil selected for a high SHR will not remove enough moisture if applied to a low SHR load, and the space will drift humid.

## The airflow relationships in SI form

For air at conditions close to standard, three working relationships connect load, airflow and the change in air state. They are written here with the proportionality constants that apply to standard air, around 1.2 kilograms per cubic metre density.

For sensible load, the heat in kilowatts is proportional to the volumetric airflow in cubic metres per second and the dry bulb temperature difference in kelvin:

q_sensible is approximately 1.23 times airflow times the temperature difference.

For latent load, the heat in kilowatts is proportional to the airflow and the difference in humidity ratio in grams of water per kilogram of dry air:

q_latent is approximately 3.0 times airflow times the humidity ratio difference.

For total load, the heat in kilowatts is proportional to the airflow and the difference in enthalpy in kilojoules per kilogram of dry air:

q_total is approximately 1.2 times airflow times the enthalpy difference.

The constants embed the density and specific heat of standard air, so they should be adjusted at high altitude or for very different conditions, but for typical building work they are accurate enough for sizing.

## A worked example

Consider an air handling unit moving 2.0 cubic metres per second of air. The air enters the cooling coil at 27°C dry bulb with a humidity ratio of 13.5 grams per kilogram, and leaves at 14°C dry bulb with a humidity ratio of 9.5 grams per kilogram.

The sensible load is about 1.23 times 2.0 times the temperature drop of 13 kelvin, which gives roughly 32 kilowatts.

The latent load is about 3.0 times 2.0 times the humidity ratio drop of 4.0 grams per kilogram, which gives roughly 24 kilowatts.

The total load is the sum, roughly 56 kilowatts, and the sensible heat ratio is 32 divided by 56, about 0.57.

That low SHR is a warning. More than 40 percent of this coil duty is moisture removal, so the coil must be deep enough and cold enough to actually dehumidify, not merely chill.

> 🇬🇭 **Ghana context**
> The example above is realistic for Accra. With outdoor air near 33°C and 78 percent relative humidity entering the mix, the moisture content of the air feeding a coil is high, so the latent share of the load is large and the sensible heat ratio falls into the 0.55 to 0.70 band for most spaces. A coil and control strategy chosen as if SHR were 0.9, which is common practice imported from temperate design, will leave Accra buildings cold and damp, encouraging mould and discomfort despite a satisfied thermostat.

## Why the split matters in practice

Equipment is sold on total capacity, but comfort is delivered by the right balance of sensible and latent capacity. A system can have ample total tonnage and still fail if its SHR does not match the space. Always carry the sensible and latent loads as separate numbers through the design, select coils against both, and verify that the supply air condition removes the required moisture, not just the required temperature.
