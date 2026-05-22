---
id: vent-fundamentals
title: "Ventilation fundamentals why fresh air and how much"
pillar: ventilation
topic: ventilation
order: 1
difficulty: beginner
tier: free
tags: [ventilation, outdoor-air, indoor-air-quality]
standards_referenced: [ASHRAE-62.1]
region: global
ghana_callout: true
estimated_minutes: 9
related: [std-ashrae-621, load-infiltration, vent-filtration]
last_updated: 2026-05-21
---

Ventilation is the deliberate supply of outdoor air to a building to keep the indoor air healthy and acceptable to occupants. Get the quantity wrong in one direction and people feel stuffy and complain; get it wrong in the other and you burn energy conditioning air nobody needs.

## Why buildings need outdoor air

People and processes continuously load indoor air with contaminants. Occupants exhale carbon dioxide and release bioeffluents — the odour compounds that make a crowded, unventilated room smell stale within minutes. Buildings themselves emit volatile organic compounds from paints, adhesives, furnishings and cleaning products. Cooking, printing and combustion add more.

Outdoor air dilutes all of this. It does not remove contaminants the way a filter does; it lowers their concentration by mixing clean air with the polluted air and exhausting the difference. Carbon dioxide is the classic proxy. Outdoor air sits near 420 parts per million. A comfortable, well ventilated occupied space typically holds steady around 700 to 1000 ppm. Once indoor levels climb past roughly 1200 to 1500 ppm, occupants report drowsiness and reduced concentration, and the elevated reading is a reliable signal that ventilation is short.

The goal is not zero contaminant. It is an acceptable, stable concentration that the body of evidence behind ventilation standards considers safe and comfortable for the great majority of occupants.

## How ventilation rates are expressed

Three units appear constantly, and confusing them causes real design errors.

### Air changes per hour

Air changes per hour, abbreviated ACH, is the building volume divided by the airflow per hour. A 200 cubic metre room receiving 400 cubic metres per hour of outdoor air sees 2 ACH. It is intuitive and is still used for car parks, plant rooms and toilets where the contaminant relates to the space itself rather than to people. Its weakness is that it ignores how many people are inside — a tall room and a low room with the same floor area need very different ACH for the same result.

### Litres per second per person

Litres per second per person ties the airflow directly to occupancy. It is the right basis for diluting human bioeffluents and carbon dioxide. Typical design values fall around 8 to 10 L/s per person (roughly 17 to 21 cubic feet per minute per person) for offices, classrooms and meeting rooms.

### Litres per second per square metre

Litres per second per square metre ties airflow to floor area, capturing the steady background emission from the building fabric and furnishings that continues whether or not the room is occupied. Office values sit near 0.3 L/s per square metre.

## The people plus area basis

Modern ventilation standards, ASHRAE Standard 62.1 being the most widely cited, do not pick one basis. They add a people component and an area component together:

> Outdoor air required = (people rate x number of people) + (area rate x floor area)

This recognises two distinct contaminant sources. The example below shows why both terms matter.

| Space | People | Area m2 | People part L/s | Area part L/s | Total L/s |
|---|---|---|---|---|---|
| Small office | 4 | 40 | 10 | 12 | 22 |
| Open office | 30 | 300 | 75 | 90 | 165 |
| Classroom | 28 | 65 | 90 | 20 | 110 |

A classroom is people dominated; a sparsely occupied open plan floor still needs meaningful air for the carpet, partitions and equipment.

## The energy cost of outdoor air

Every litre of outdoor air entering an air handler must be brought to room condition — cooled, heated, dehumidified or humidified. In a cooling climate this is a major share of the coil load. Conditioning outdoor air can easily account for 20 to 40 percent of total HVAC energy in a densely occupied building.

This is why ventilation is sized, not maximised. Designers provide the standard rate, no more, and recover energy where it pays. An energy recovery ventilator or heat wheel passes 50 to 80 percent of the energy between incoming and outgoing airstreams, pre treating the fresh air for free. Demand controlled ventilation, covered separately, trims the rate when a space is lightly occupied.

> 🇬🇭 **Ghana context**
> In Accra outdoor air is hot and very humid for most of the year, so the dominant cost of ventilation is dehumidification — wringing moisture out of the incoming air. Over-ventilating, or leaving outdoor air dampers stuck open, drives chiller energy up sharply and can leave spaces clammy. Size to the standard rate, commission the dampers properly, and consider energy recovery on larger systems to recover both heat and latent load.

## Balanced supply and exhaust

Ventilation is a flow problem, not just a supply problem. Air pushed in must leave somewhere, and air pulled out must be replaced.

A balanced system supplies and exhausts roughly equal volumes, with a small deliberate offset. Most commercial buildings run slightly positive — supply a little above exhaust — so leakage flows outward and unconditioned, dusty air is kept from infiltrating through cracks and doors. Specific rooms are deliberately negative: toilets, kitchens and stores draw more exhaust than supply so odours and contaminants are contained and do not migrate.

If exhaust runs without enough make up air, the building goes negative, doors become hard to open, exhaust fans starve and lose flow, and infiltration surges. The supply, exhaust and transfer paths must be designed together as one airflow network.

## Practical takeaways

Start every ventilation design from the occupancy and area of each space, apply the people plus area rates, and total them. Treat the result as a target to meet efficiently, not a number to exceed. Provide a clear path for air to leave, set the building slightly positive, and keep odour rooms negative. Where outdoor air volumes are large, budget for energy recovery early — it is far cheaper designed in than retrofitted.
