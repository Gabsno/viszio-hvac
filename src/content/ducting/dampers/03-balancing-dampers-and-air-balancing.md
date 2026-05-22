---
id: damp-balancing
title: "Balancing dampers and basic air balancing"
pillar: ducting
topic: dampers
order: 3
difficulty: beginner
tier: free
tags: [air-balancing, dampers, commissioning]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 8
related: [damp-vcd, ctrl-tab, air-diffusers]
last_updated: 2026-05-21
---

A duct system as installed never delivers design airflow to every outlet on day one. Balancing dampers and a systematic balancing procedure bring each room to its intended air quantity. This article covers the practical method an installer or junior engineer can apply on site.

## Why airflow drifts from design

Air leaving a fan does not know your drawings. It divides between parallel paths in proportion to how little resistance each path offers. The result, before any adjustment, is predictable:

- **Short, near runs** are over-supplied because they are the path of least resistance.
- **Long, distant runs** are starved because they fight more friction and more fittings.
- Real ductwork adds resistance the calculation missed — extra bends, crushed flexible duct, dirty filters, site changes.
- Diffusers and grilles have manufacturing tolerances of their own.

Without intervention some rooms are noisy and draughty while others never reach temperature. Balancing redistributes the fan's fixed output so every outlet gets its design share.

## Balancing dampers versus control dampers

Both are volume control dampers physically, but their job differs.

| Aspect | Balancing damper | Control damper |
|---|---|---|
| Purpose | Set a fixed design split | Modulate flow in service |
| Operation | Set once, then locked | Moves continuously |
| Driver | Hand quadrant | Actuator and controller |
| Adjusted by | Balancer during commissioning | BMS or zone controller |

A balancing damper is set during commissioning and then locked and marked. A control damper keeps moving in normal operation. Both should run with a meaningful share of branch pressure across them so they have good control authority — see the volume control damper article for sizing for authority.

## The proportional balancing method

Proportional balancing is the standard technique because it converges quickly and is self-correcting. The idea: bring outlets on a branch into the correct **ratio** to each other first, then deal with the branch as a whole.

1. **Open everything.** Set all balancing dampers and diffuser dampers fully open and run the fan at design speed.
2. **Find the index outlet.** Measure every outlet and identify the **index** — the one with the lowest percentage of design flow. This is the hardest-served outlet.
3. **Leave the index damper fully open.** It already struggles; never throttle it. The whole branch is balanced relative to it.
4. **Work from the index outward.** Adjust each other outlet's damper until it reads the same percentage of design as the index. Adjust in pairs, starting with the outlets nearest the fan.
5. **Repeat per branch**, then balance branches against each other at the branch dampers using the same logic — the index branch damper stays open.
6. **Set total airflow last.** Once the proportions are correct, trim the fan speed or the main damper so the total volume equals design. Because the splits are already proportional, every outlet then lands on its design value together.

The strength of the method is step 5 and step 6: adjusting one branch shifts pressure to the others, but because everything is held in proportion, the final fan-speed trim corrects them all at once.

## Measuring the air

You cannot balance what you cannot measure. Typical instruments:

- **Flow capture hood (balometer)** — placed over a diffuser or grille, it reads the total volume flow directly in m³/s or L/s (CFM). The fastest tool for terminal readings.
- **Rotating-vane or thermal anemometer** — reads air velocity; multiply by the effective free area to get flow. Useful at louvers and large grilles where a hood will not seal.
- **Pitot tube and manometer** — a multi-point traverse inside the duct gives the most reliable branch and main airflow, and is the reference for total system flow.

Take readings with filters in their final condition, all access doors shut and the system at design fan speed, or the numbers will not be repeatable.

## Locking and marking after balancing

A balanced damper is worthless if it moves. After each damper is set:

- **Tighten the locking screw** on the quadrant so the handle cannot drift.
- **Mark the final position** — a paint or marker line across the handle and quadrant — so a disturbed damper can be returned to its setting.
- **Record the position and the measured flow** on the balancing report against the outlet reference.

This record is what lets the system be re-checked years later or recommissioned after a renovation without starting from zero.

## How this links to formal TAB

On commercial projects the balancing process becomes formal **Testing, Adjusting and Balancing (TAB)**, carried out by a specialist and documented in a report. TAB covers air and water systems, verifies fan and pump performance, traverses ducts, and signs off every terminal against design with a stated tolerance — commonly within about plus or minus 10 percent of design at the outlet. The proportional method above is the same technique a TAB technician uses; the difference is the rigour, the calibrated instruments and the certified report. Treat field balancing as a first pass that makes formal TAB faster and cleaner.

## Common mistakes

- **Balancing at the diffuser only.** Throttling diffuser dampers to fix flow chokes the air right at the outlet and makes it whistle. Set the bulk of the split at the branch balancing damper, upstream and away from the grille; use the diffuser damper only for a small final trim.
- **Throttling the index outlet.** It is already the weakest — closing its damper just lowers the whole branch.
- **Balancing with dirty or missing filters**, or with access doors open, so the readings change the moment the building is in normal use.
- **One pass only.** Branches interact; expect to go round at least twice before the proportions hold.
- **No record.** An unmarked, unlogged damper cannot be checked or restored.

Open everything, find and protect the index run, bring outlets into proportion before setting total flow, then lock, mark and record every damper.
