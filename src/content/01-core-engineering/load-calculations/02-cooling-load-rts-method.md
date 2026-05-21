---
id: load-02
title: "Cooling load calculation the radiant time series method"
pillar: core-engineering
topic: load-calculations
order: 2
difficulty: advanced
tier: pro
tags: [cooling-load, rts, design]
standards_referenced: [ASHRAE-Fundamentals]
region: global
ghana_callout: false
estimated_minutes: 9
related: [load-01, psy-04]
last_updated: 2026-05-21
---

The radiant time series method is the modern hand and spreadsheet procedure for peak cooling load calculation. It keeps the physical insight of older methods, the idea that heat gains are stored and released with a lag, but expresses that physics in a cleaner, more general form that does not depend on pre-grouped construction tables.

## Why RTS replaced the simplified methods

Earlier manual procedures such as CLTD with CLF and SCL relied on tabulated factors built for a fixed set of construction groups and zone weights. They worked, but they hid their assumptions. If your wall did not match a published group, you guessed.

RTS was introduced in ASHRAE Fundamentals as a simplification of the rigorous heat balance method. The heat balance solves the full set of energy equations on every interior surface for every hour, which is accurate but needs an iterative computer solution. RTS approximates that result with two sets of pre-computed coefficients that any engineer can apply in a spreadsheet. It is more transparent than the old factor tables and more general, because the coefficients are derived from the actual construction layers rather than a coarse category.

## Conduction time series for walls and roofs

Conduction through a massive wall is not instantaneous. Heat entering the outer surface at noon may not reach the inside until late afternoon. RTS captures this with conduction time series factors, the CTS.

The driving condition for an opaque surface is the sol-air temperature, an equivalent outdoor temperature that combines air temperature, absorbed solar radiation and longwave exchange. From the sol-air temperature you compute a series of hourly conductive heat gains as if the wall had no storage, then convolve that series with the 24 CTS percentage factors for that construction.

Each CTS factor states what fraction of the heat gain from a given past hour shows up as conductive gain now. The factors sum to 100 percent. A light steel wall has most of its weight in the first one or two factors, so it responds quickly. A heavy concrete wall spreads its factors across many hours, producing a damped and delayed gain. The same convolution handles roofs.

## Splitting heat gains into radiant and convective parts

Once you have the heat gain entering a space, whether by conduction, solar transmission, lights, people or equipment, RTS requires you to split it into a radiant fraction and a convective fraction.

The convective fraction goes straight into the room air and becomes cooling load in the same hour. The radiant fraction strikes interior surfaces, is absorbed, and is released to the air later. ASHRAE Fundamentals publishes typical split ratios: solar transmitted through glass is almost entirely radiant; fluorescent lighting is roughly half and half; people and equipment have their own characteristic splits. Getting these fractions right matters because only the radiant part is delayed.

## Radiant time series factors

The radiant fraction is converted to hourly cooling load with the radiant time series factors, the RTS proper. These are 24 coefficients that describe how a pulse of radiant heat absorbed by the space surfaces re-emerges as cooling load over the following 24 hours.

There are two sets: a solar RTS for radiant gain that lands mostly on the floor, such as transmitted sunlight, and a nonsolar RTS for radiant gain distributed over all surfaces, such as lighting and people. Each set depends on the zone construction weight and the amount of carpet and interior mass. Heavy, bare zones spread the response over many hours and shave the peak; light, carpeted zones release the heat quickly and peak sharply.

## The 24 hour calculation workflow

RTS is inherently a 24-hour calculation, because you cannot know the peak hour until you have all hours.

1. For each exterior surface, compute hourly sol-air temperatures for the design day.
2. Compute the unstored hourly conductive heat gain, then apply the CTS factors to get the actual conductive heat gain for each hour.
3. Compute hourly solar heat gain through glazing and hourly internal gains from lights, people and equipment.
4. Split every heat gain stream into radiant and convective fractions.
5. Apply the appropriate solar or nonsolar RTS to each radiant stream to get its hourly cooling load.
6. Add the convective fractions, which load the same hour with no delay.
7. Sum all components for each of the 24 hours and read off the peak.

Repeat for each design month that could govern, since a west-facing zone may peak in a different month than a roof-dominated zone.

| Step | Output |
|------|--------|
| Sol-air and CTS | Hourly conductive heat gain |
| Radiant convective split | Two streams per gain type |
| RTS application | Hourly cooling load from radiant part |
| Hourly summation | Peak load and its hour |

## Strengths and limits against full simulation

RTS gives you a credible hourly load profile and an explicit peak hour and month, all in a spreadsheet you can audit line by line. It handles any construction, because the CTS and RTS coefficients are generated from real layer properties. For design-day peak sizing it is the right tool.

It is not an energy model. RTS uses fixed radiant time factors, assumes a steady design day rather than real weather, and does not track the interaction between zones, the air system and the plant over a year. For annual energy consumption, code compliance modelling or part-load behaviour, a full hour-by-hour building energy simulation is required. Use RTS to size equipment; use simulation to predict how much it will cost to run.
