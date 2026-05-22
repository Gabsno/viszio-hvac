---
id: duct-leakage
title: "Duct leakage and leakage testing"
pillar: ducting
topic: duct-design
order: 6
difficulty: intermediate
tier: free
tags: [leakage, testing, commissioning]
standards_referenced: [SMACNA]
region: global
ghana_callout: false
estimated_minutes: 8
related: [duct-construction, std-smacna-duct]
last_updated: 2026-05-21
---

Every duct system leaks to some degree. The question is how much, whether it is within the allowance the specification set, and whether anyone proved it before the ceiling closed. Leakage testing answers that question with a number.

## Why leakage matters

A duct under positive pressure pushes conditioned air out through every unsealed seam and joint. Under negative pressure — return and exhaust — it draws unconditioned air in. Either way the fan is moving air that never reaches the room it was meant to serve.

The cost shows up three ways. First, **fan energy** is wasted: the fan runs continuously to push air that escapes into a ceiling void. Second, **conditioned air is lost**: the coil has chilled or heated that air and the leak throws it away, so the coil and the compressor work harder. Third, **the system underperforms**: rooms at the far end of a leaky run are starved, the building is hard to balance, and pressurisation control drifts.

Leakage of 10 to 20 percent of design airflow is common in poorly built, unsealed ductwork. A well-sealed system tested to a tight class can hold leakage to 5 percent or less. That difference is paid for every hour the system runs, for the life of the building.

## The leakage class concept

Leakage cannot be quoted as a single flow rate because it depends on pressure — the harder you push, the more escapes. Instead it is normalised into a **leakage class**, written as CL.

The leakage class relates the leakage flow rate to the duct surface area and the test pressure. A lower class number means a tighter duct. In SI practice the leakage rate is litres per second per square metre of duct surface at a stated reference pressure; in IP it is cubic feet per minute per 100 square feet. The key idea is that the class normalises out duct size and pressure, so a small low-pressure duct and a large high-pressure duct can be held to the same quality standard and compared fairly.

| Construction quality | Typical leakage class | Result |
|---|---|---|
| Unsealed, poor joints | high CL | leaky, fails most specs |
| Sealed to SMACNA Seal Class A | low CL | tight, passes |
| Sealed plus careful workmanship | very low CL | best practice |

SMACNA publishes leakage classes matched to construction and seal class, and most specifications name a target class that the contractor must achieve and prove.

## How a leakage test is run

The test isolates a section of duct and measures how much air must be supplied to hold it at a fixed test pressure. The leak that escapes is exactly the air the calibrated fan must replace.

### The equipment

A duct leakage test rig is a **calibrated fan** — sometimes called a leakage tester — fitted with an accurate flow-measuring orifice and a pressure gauge. The fan can pressurise or depressurise the duct section.

### The procedure

1. Select a section of the system, typically before insulation is applied so leaks can be seen and reached.
2. Cap or blank off every opening — branch take-offs, diffuser collars, AHU connection — so the section is sealed except for the test fan connection.
3. Connect the calibrated fan and a pressure tap into the section.
4. Run the fan up until the duct holds the **test pressure**, normally the duct's design pressure class or a stated test pressure.
5. With pressure steady, read the airflow through the calibrated fan's orifice. That steady flow equals the total leakage from the section, because the only air leaving is the air leaking out.
6. Divide the measured leakage by the section's duct surface area and compare against the allowable leakage for the specified class.

If the section fails, the leaks are found — often by feel, by a smoke pencil, or by listening — sealed, and the section is retested until it passes.

## Allowable leakage

The specification, drawing on SMACNA, sets the allowable leakage as a class plus the percentage of system airflow that the class implies for the duct in question. A common target for sealed medium-pressure supply ductwork is a leakage class that keeps total system leakage to roughly 3 to 5 percent of design airflow.

Two practical points matter. The allowance is tighter for higher pressure ducts, because the same hole leaks more at higher pressure and those ducts also carry the most energy. And the test is only meaningful if it is done **before insulation**, so failed joints are accessible — testing after the ceiling is closed turns a cheap fix into a costly one.

## Sealing practice that passes the test

Passing a leakage test is not a separate task — it is the natural result of good construction. The work is done at the seam.

- Seal all transverse joints and longitudinal seams to the specified seal class, using UL-listed mastic, tape or factory gaskets.
- Apply mastic to clean, dry metal and brush it into the joint; a thin cosmetic smear cracks and fails.
- Seal every wall penetration, every take-off collar and every blank-off.
- On flanged systems, use a continuous gasket and bolt to the specified torque.
- Test in sections as construction proceeds, not as one large test at the end, so problems are caught early and cheaply.

## The lifetime cost of leaky ductwork

A leak does not heal. A duct that leaks 15 percent on day one leaks 15 percent every operating hour for 20 or more years. That is 15 percent of the fan energy and a large share of the cooling or heating energy spent moving air into a void.

Sealing well during construction adds a modest, one-time cost — mastic, tape, labour and a test. Leaving the duct leaky imposes a permanent, compounding energy penalty plus comfort complaints and balancing headaches that are far more expensive to chase later. Specify a leakage class, seal to it, and prove it with a calibrated-fan test before the ceiling closes.
