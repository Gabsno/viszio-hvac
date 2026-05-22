---
id: ctrl-tab
title: "Testing adjusting and balancing TAB"
pillar: controls
topic: commissioning
order: 3
difficulty: intermediate
tier: free
tags: [tab, balancing, airflow]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 9
related: [cx-01, damp-balancing, cx-02]
last_updated: 2026-05-21
---

Testing, adjusting and balancing (TAB) is the formal process of measuring and setting every air and water flow in an HVAC system to its design value. A system can be correctly designed and correctly installed and still deliver the wrong flow to half its terminals — TAB is the step that proves, and corrects, what was actually built.

## What TAB actually delivers

TAB takes a freshly installed system and tunes the distribution of flow so each space receives the airflow and waterflow the engineer calculated. Without it, fans and pumps simply send the path of least resistance the most flow: the room nearest the air handler gets too much, the room at the end of the run gets too little, and comfort complaints follow within weeks.

A TAB scope normally covers three things. First, **testing** — measuring fan and pump performance, total airflow, total water flow, electrical draw and external static pressure against design. Second, **adjusting** — setting fan speeds, pump speeds, sheave or VFD settings, and outside air dampers. Third, **balancing** — proportioning the flow at every branch, diffuser, coil and terminal so the percentages match the design.

The work is done by an independent TAB technician or firm, ideally certified by a body such as NEBB, AABC or TABB. Independence matters: the installing contractor has a commercial reason to declare the job finished, while the TAB agent's deliverable is honest measured data.

## Balancing the air side

Air balancing starts at the air handler. The technician confirms total supply, return and outside airflow, checks fan speed and motor amps, and measures external static pressure. Only once the total is correct does branch balancing begin — chasing individual diffusers before the total is right just wastes a day.

### Proportional balancing

The standard method is **proportional balancing**. The technician identifies the terminal with the lowest ratio of measured to design flow — the worst index run — and leaves its damper fully open. Every other terminal on that branch is then throttled until it reads the same percentage of design as the index. When all terminals on a branch share one ratio, a single adjustment at the branch damper brings the whole branch to 100 percent at once, and the proportions hold. This avoids the endless loop where adjusting one diffuser disturbs all the others.

Airflow at diffusers is read with a flow hood (balometer); duct traverses use a pitot tube or thermal anemometer across a measured grid of points. VAV boxes are commanded to minimum and maximum and verified against their controller readout.

## Balancing the water side

Hydronic balancing follows the same logic but uses different hardware. Each coil branch carries a balancing valve — a manual circuit balancing valve, an automatic flow limiting valve, or a pressure independent control valve (PICV).

With manual valves, the technician measures flow at each valve's pressure tappings using a differential pressure meter and a published valve coefficient (Cv) chart, then throttles each valve so coils share design flow in proportion. Automatic balancing valves cap flow at a preset value regardless of pressure, while PICVs combine flow limiting with the control valve in one body and largely remove manual proportioning. Pumps are checked for head, flow and amps, and VFD-driven pumps are set so differential pressure holds at design across the worst circuit.

| Item | Air side | Water side |
|------|----------|------------|
| Primary mover | Supply or exhaust fan | Circulating pump |
| Terminal device | Diffuser, grille, VAV box | Coil, fan coil, AHU |
| Balancing element | Volume damper | Balancing valve or PICV |
| Key instrument | Flow hood, pitot tube | DP meter, ultrasonic flow meter |
| Method | Proportional balancing | Proportional or preset valve |

## The TAB instrument kit

A working TAB technician carries a recognisable set of tools, each calibrated and traceable:

- **Flow hood** for diffuser and grille airflow.
- **Pitot tube and manometer** for duct traverses and static pressure.
- **Rotating vane or thermal anemometer** for face velocities and hood checks.
- **Differential pressure meter** for hydronic balancing valves.
- **Ultrasonic or insertion flow meter** for pipe flow where no valve tappings exist.
- **Clamp multimeter** for motor voltage and current.
- **Tachometer** for fan and pump shaft speed.
- **Digital thermometers and psychrometer** for coil entering and leaving conditions.

Calibration certificates are part of the deliverable — uncalibrated instruments make the whole report disputable.

## The TAB report

The TAB report is the formal record that the system meets design. A complete report includes equipment data sheets (one per fan, pump, AHU and terminal) showing design value, measured value and percentage of design; instrument list with calibration dates; final fan and pump settings; and a narrative noting any deficiencies found and how they were resolved.

Tolerances are typically stated in the specification — commonly plus or minus 10 percent on individual terminals and tighter on totals and on critical spaces such as operating theatres or laboratories. Any reading outside tolerance must be explained: a deficient duct, a missing damper, a fan running the wrong way, or a design flaw.

## How TAB feeds commissioning

TAB and commissioning are related but distinct. TAB proves the system can move the right quantity of air and water. **Commissioning** proves the system as a whole behaves correctly — that controls sequence properly, setpoints are right, safeties trip, and the design intent is met across all operating modes.

In practice TAB is a prerequisite for, and an input to, commissioning. A commissioning agent cannot verify an economizer sequence or a VAV reset strategy if the underlying airflows are wrong, so balanced flows are confirmed first. The completed TAB report becomes a referenced document in the commissioning record, and the commissioning agent often spot-checks a sample of TAB readings rather than re-measuring everything. Sequencing the trades — install complete, then TAB, then functional commissioning — is what keeps the closeout from collapsing into finger-pointing.
