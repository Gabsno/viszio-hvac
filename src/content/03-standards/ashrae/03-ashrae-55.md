---
id: std-ashrae-55
title: "ASHRAE 55 thermal comfort study guide"
pillar: standards
topic: ashrae
order: 3
difficulty: intermediate
tier: free
tags: [ashrae, thermal-comfort, design]
standards_referenced: [ASHRAE-55]
region: global
ghana_callout: true
estimated_minutes: 9
related: [psy-02, std-ashrae-621]
last_updated: 2026-05-21
---

ANSI/ASHRAE Standard 55 answers a question that sits underneath every HVAC design: when is a space actually comfortable? It defines the combinations of environmental and personal conditions that satisfy most occupants, and this study guide explains the model behind it and how engineers apply it.

## What the standard is and who publishes it

Standard 55 is published by ASHRAE under its continuous maintenance process, so the edition year matters. Its full title is Thermal Environmental Conditions for Human Occupancy. Its stated purpose is to specify the combinations of indoor thermal environmental factors and personal factors that produce satisfactory conditions for the majority of occupants in a space. Like the related indoor-air-quality work, it defines an acceptable thermal environment around the idea that a substantial majority, taken as more than 80 percent, of occupants find the space thermally satisfactory.

The scope is deliberately narrow. The standard addresses thermal comfort only. It does not cover indoor air quality, acoustics, lighting or safety, and it applies to occupants who remain in a space longer than a short threshold, typically a quarter of an hour, at altitudes within the standard's stated limit.

## Why the standard exists

Thermal comfort is subjective, and without a defined model it is impossible to specify, verify or defend. An owner cannot enforce comfort in a lease, a commissioning agent cannot test it, and a designer cannot size equipment to it, unless comfort is reduced to measurable parameters. Standard 55 exists to turn a state of mind, described as the condition of mind that expresses satisfaction with the thermal environment, into something an engineer can calculate and a building can be checked against.

## How the standard is organised

The standard moves from purpose and scope through definitions, then into general requirements, then into the conditions that provide thermal comfort, which is its analytical core. Later sections cover design compliance and the evaluation of comfort in existing buildings. Within the comfort section, the standard separates the determination of occupant characteristics, such as metabolic rate and clothing insulation, from the two methods used to judge a space: a model for mechanically conditioned spaces and an adaptive model for occupant-controlled naturally conditioned spaces.

<!-- TODO: Gabs to verify section numbers against the reference PDF -->

## The core engineering concept

Comfort in Standard 55 rests on six factors. Four are environmental and two are personal.

### The six factors

The environmental factors are air temperature, mean radiant temperature, air speed and humidity. Air temperature is what an ordinary thermometer reads. Mean radiant temperature accounts for heat exchanged with surrounding surfaces, which is why a room near cold glass or a hot roof can feel uncomfortable even at a normal air temperature. Air speed influences convective and evaporative heat loss from the skin. Humidity governs how readily sweat evaporates.

The two personal factors are metabolic rate and clothing insulation. Metabolic rate is the heat a body produces, set by activity and expressed in met units. Clothing insulation is the resistance a garment ensemble offers to heat loss, expressed in clo units. Comfort cannot be judged from temperature alone, because a lightly dressed seated person and a heavily dressed active one need different environments.

### The PMV and PPD model

For mechanically conditioned spaces the standard uses the Predicted Mean Vote model. PMV combines all six factors into a single index on a thermal sensation scale running from cold through neutral to hot. From PMV the model derives the Predicted Percentage of Dissatisfied, or PPD, which estimates the share of occupants likely to be uncomfortable. Because individuals differ, PPD never reaches zero; the comfort target is to keep predicted dissatisfaction acceptably low.

### The adaptive model

For occupant-controlled naturally conditioned spaces, where people open windows and adjust clothing, the standard provides an adaptive model. It recognises that acceptable indoor temperature drifts with the prevailing outdoor temperature, because occupants in such buildings expect and tolerate a wider range. The adaptive model defines acceptable indoor operative temperature as a function of a running mean outdoor temperature, with bands corresponding to acceptability levels.

### The comfort zone

The practical output of both models is the comfort zone: the range of operative temperature and humidity, for a given clothing and activity level, within which conditions are predicted to be acceptable. The comfort zone is best visualised on a psychrometric chart, which is why reading that chart is a companion skill.

## How an engineer uses it day to day

A designer uses Standard 55 to set the indoor design conditions that feed load calculations. Estimating typical clothing and activity for the occupancy fixes the comfort zone, and the equipment is then sized to hold the space within it. The standard also informs decisions on air speed, surface temperatures and humidity control, and it gives commissioning agents and post-occupancy surveys a defined yardstick for evaluating an existing building.

## Common misconceptions and pitfalls

The most common error is judging comfort by air temperature alone and ignoring radiant temperature, air speed and humidity. Another is applying the PMV model to a naturally ventilated, occupant-controlled building where the adaptive model belongs, or the reverse. Designers also forget that the comfort zone shifts with season as clothing changes, so a single fixed setpoint may satisfy neither summer nor winter occupants.

> 🇬🇭 **Ghana context**
> Standard 55 is a United States origin standard, but it appears in Ghanaian consultant specifications as the reference for indoor design conditions. In Accra's hot and humid climate, humidity and mean radiant temperature from sun-exposed surfaces matter as much as air temperature, so designers should not rely on dry-bulb setpoint alone. Naturally ventilated buildings, still common in Ghana, are good candidates for the adaptive model, which recognises that occupants accustomed to the local climate accept a wider comfort band.

> **Get the official standard:** [Buy from the ASHRAE Bookstore](https://www.ashrae.org/technical-resources/bookstore)
> This article is an independent study guide and is not affiliated with or endorsed by ASHRAE.
