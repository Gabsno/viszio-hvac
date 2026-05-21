---
id: cx-02
title: "Functional performance testing for air handling units"
pillar: controls-bms-commissioning
topic: commissioning
order: 2
difficulty: advanced
tier: pro
tags: [commissioning, testing, ahu]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 9
related: [cx-01, ahu-01]
last_updated: 2026-05-21
---

Functional performance testing is the part of commissioning where you stop reading documents and start exercising equipment. For an air handling unit it means driving the unit through every operating mode and every failure mode and proving, with witnesses present, that it behaves exactly as the sequence of operation says it should.

## What functional performance testing proves

Functional performance testing, or FPT, demonstrates real performance under controlled conditions. A static inspection confirms that an AHU exists and is wired. FPT confirms that the AHU controls supply air temperature, modulates its economizer, varies fan speed correctly, and fails safely. It is the difference between a unit that looks finished and a unit that works.

FPT is also where the control program meets reality. Most AHU commissioning faults are sequence faults: logic that was programmed differently from the specification, loops that hunt, or modes that were never tested by the controls contractor.

## Prerequisites before testing starts

FPT cannot begin until lower-level checks are complete. Running a functional test on an AHU that has not been properly started up wastes everyone's time and produces unreliable results.

| Prerequisite | Why it matters |
|---|---|
| Installation checklist complete | Filters, coils, dampers, drains fitted correctly |
| Start-up checklist complete | Manufacturer start-up done, rotation and amps checked |
| Air balancing complete | Design airflow proven before control logic is judged |
| Sensors calibrated | A test against a wrong sensor proves nothing |
| Points verified | Every input and output checked end to end |

If a prerequisite is open, log it and stop. Testing on a unit with unbalanced airflow or an uncalibrated supply air sensor produces conclusions that have to be thrown away later.

## Sample AHU functional tests

A complete AHU test script exercises each subsystem in turn.

### Economizer and damper operation

Command the outdoor, return and relief dampers across their full range. Confirm that linkages move freely, that dampers reach their full open and full closed end-stops, and that closed dampers seal. Verify the economizer changeover: the unit should enable free cooling when outdoor conditions are favourable and lock it out when they are not, using whatever changeover signal the sequence specifies.

### Supply air temperature control and reset

With the unit in occupied mode, change the supply air temperature setpoint and confirm the cooling coil valve and heating coil valve modulate in the correct direction to chase it, without hunting and without simultaneous heating and cooling. Then verify the reset strategy: as zone demand falls, the supply air temperature setpoint should drift in the energy-saving direction.

### Fan VFD and duct static control

Confirm the supply fan variable frequency drive responds to the duct static pressure loop. As VAV boxes open and close, fan speed should rise and fall to hold static setpoint. Verify any duct static reset logic and confirm the high-static safety trips at its setpoint.

### Safeties and failure modes

Test the freeze protection low-limit, the smoke and duct detector shutdown, and any high-static cut-out. Then deliberately create failures. Cut power and confirm the unit restarts cleanly and returns to the correct mode. Disconnect or fault a key sensor and confirm the unit reverts to its specified failure behaviour rather than driving an output to an unsafe extreme. Force the occupied to unoccupied transition and confirm dampers, fans and setpoints all change as scheduled.

## Documenting issues and retesting

Every deviation from the sequence is logged as an issue with enough detail that the responsible contractor can act on it: the test step, the expected behaviour, the observed behaviour, and the date. The issue stays open until it is corrected and the affected test step is rerun and passed with the CxA witnessing. A test that is half-passed is not passed. Partial credit has no place in commissioning.

## Sampling strategy on repeated units

On a project with many identical AHUs, full FPT on every unit may not be justified. A common sampling strategy is to test the first unit of a type fully, then test a defined percentage of the remainder. If a sampled unit fails, the sample size increases, and persistent failures trigger a full test of the whole population. Sampling is only valid when the units are genuinely identical in equipment, controls program and installation. Any unit with a unique sequence, a different size, or a special application is always tested in full.
