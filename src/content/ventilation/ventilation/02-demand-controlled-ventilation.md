---
id: vent-dcv
title: "Demand controlled ventilation"
pillar: ventilation
topic: ventilation
order: 2
difficulty: intermediate
tier: pro
tags: [demand-controlled-ventilation, co2-sensors, energy-savings]
standards_referenced: [ASHRAE-62.1]
region: global
ghana_callout: false
estimated_minutes: 8
related: [vent-fundamentals, ctrl-01, sust-efficiency]
last_updated: 2026-05-21
---

Demand controlled ventilation, or DCV, supplies outdoor air in proportion to the number of people actually in a space rather than to the maximum the space could ever hold. It is one of the highest return energy strategies available in any building with variable occupancy.

## The problem with fixed ventilation

Ventilation rates are sized for design occupancy — the worst case. A 200 seat auditorium is ventilated for 200 people. A classroom designed for 30 students is ventilated for 30. But these spaces are rarely full. The auditorium may host an event two evenings a week. The classroom sits empty during breaks, between periods and through the long vacation.

A fixed ventilation system delivers the full design outdoor air rate whenever it runs, regardless of how many people are present. Conditioning that air — cooling, dehumidifying, heating — costs the same whether the room holds 200 people or 5. For spaces that average a fraction of their design occupancy, a large share of the ventilation energy is simply wasted.

DCV closes that gap. It measures a proxy for occupancy and modulates the outdoor air damper or fresh air fan so the rate tracks the real load.

## Carbon dioxide as an occupancy proxy

The most common DCV sensor measures carbon dioxide concentration. People exhale carbon dioxide at a predictable rate, so indoor concentration above the outdoor background is a direct, reliable indicator of how many people are in the space and how well it is currently ventilated.

The control logic does not chase a fixed carbon dioxide number. The smarter approach watches the difference between indoor and outdoor concentration — the proportional or differential method. Because the people component of the required outdoor air is what carbon dioxide actually represents, the indoor minus outdoor difference maps cleanly onto the per person ventilation term that standards such as ASHRAE Standard 62.1 define. A controller can therefore translate a measured concentration difference into an implied occupant count and an implied outdoor air requirement.

Sensor placement matters. Mount carbon dioxide sensors in the breathing zone, on the wall around 1.1 to 1.5 metres above the floor, away from doors, supply diffusers and direct exhalation paths. Specify sensors with stated accuracy near plus or minus 50 ppm and plan periodic recalibration; drift over years of service is the usual reason a DCV system quietly stops saving energy.

## Where DCV pays off

DCV earns its cost where two conditions hold together: occupancy varies widely, and the design ventilation rate is large.

| Space type | Occupancy pattern | DCV value |
|---|---|---|
| Auditorium hall | Empty most of week, occasionally packed | Very high |
| Classroom lecture room | Periods, breaks, vacations | High |
| Conference meeting room | Intermittent, often empty | High |
| Open plan office | Fairly steady through the day | Modest |
| Retail floor | Varies but rarely near empty | Modest |
| Toilet store room | Contaminant from space not people | Not suitable |

High value targets are halls, classrooms, lecture theatres, places of worship, gymnasiums, multipurpose rooms and conference suites. Spaces with steady occupancy, or with contaminants unrelated to people, gain little — for those, a fixed rate is correct.

## Controls and the minimum ventilation floor

A DCV control loop is straightforward but must be set up carefully.

### The base ventilation floor

DCV modulates the people component of ventilation. It must never drive outdoor air to zero. The area component — air for the building fabric, furnishings and equipment — has to be delivered whenever the space is in use, occupied or not. The control sequence therefore enforces a minimum damper position, the base or floor rate, equal to the area based outdoor air requirement. The carbon dioxide loop adds the people component on top of that floor.

### Loop behaviour

As measured carbon dioxide rises, the controller opens the outdoor air damper or raises fresh air fan speed; as it falls, the damper modulates back toward the floor. A reset schedule, a deadband and slow loop tuning prevent hunting. On a variable air volume system the DCV logic coordinates with the supply fan and the system level ventilation calculation so individual zones do not get starved.

### Failure modes to design against

Set the system to fail to the safe side — damper to the design open position — if a sensor fails or drifts out of range. Log occupancy estimates and damper positions to the building management system so a stuck sensor is visible. Without monitoring, a failed DCV system either wastes energy at full flow or, worse, under ventilates without anyone noticing.

## Energy savings

Savings depend entirely on the occupancy profile. A space genuinely full only a small fraction of its operating hours can cut its ventilation related energy by 20 to 40 percent, and individual high variability rooms have shown more. The saving comes from not conditioning outdoor air for absent people — both the sensible cooling or heating and, in humid climates, the latent dehumidification load.

DCV also pairs naturally with energy recovery and with occupancy or schedule based setbacks. The combination — recover energy on the air you do bring in, and only bring in what the occupants need — is the core of efficient ventilation. The payback on carbon dioxide sensors and damper actuators in a suitable space is often well under three years.

## Putting it into practice

Identify the variable occupancy, high ventilation spaces first; that is where the money is. Specify good sensors, place them in the breathing zone, and write a control sequence that respects the area based minimum floor. Commission the loop, verify the damper actually moves with measured carbon dioxide, and trend the data so the savings are real and the system stays honest over its life.
