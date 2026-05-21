---
id: ctrl-01
title: "Sequences of operation how they are written and read"
pillar: controls-bms-commissioning
topic: sequences-of-operation
order: 1
difficulty: intermediate
tier: free
tags: [controls, bms, sequences]
standards_referenced: []
region: global
ghana_callout: false
estimated_minutes: 9
related: [cx-01, ahu-01]
last_updated: 2026-05-21
---

A sequence of operation is the written control logic that tells a building management system (BMS) exactly what to do, when to do it, and why. It is the bridge between the design intent and the lines of code or the function blocks that run inside a controller, and every installer, programmer and commissioning agent on a project will live or die by how clearly it is written.

## What a sequence of operation actually is

The sequence of operation, often abbreviated to SOO, is a plain-language description of how a piece of HVAC equipment must behave under all conditions. It is not the control program itself. It is the specification from which a controls contractor writes the program. A good sequence is unambiguous enough that two different programmers reading it would produce functionally identical control behaviour.

A sequence is written for a specific system: an air handling unit, a chilled water plant, a fan coil unit, a VRF system. It describes that system reacting to inputs such as space temperature, outdoor air conditions, occupancy schedules and equipment status, and producing outputs such as damper positions, valve commands, fan speeds and alarms.

## The standard structure of a sequence

Most well-written sequences follow a predictable skeleton. Knowing the skeleton lets you read any sequence quickly because you know where each piece of information lives.

| Section | What it contains |
|---|---|
| Points list | Every input and output, with type and range |
| Modes of operation | Occupied, unoccupied, warm-up, night purge |
| Setpoints | Target values and their adjustable ranges |
| Control loops | The PID logic that drives modulating outputs |
| Interlocks | One device gating another, such as fan proving |
| Safeties | Hard limits that override normal control |
| Alarms | Conditions reported to operators |

### Points list

The points list enumerates every signal the controller reads or writes. Analog points carry a continuous value, such as a 4 to 20 mA signal from a temperature sensor or a 0 to 10 V command to a valve actuator. Binary points carry a two-state value, such as a fan status contact that is either proven or not, or a start command that is on or off. An accurate points list is the foundation of both the control program and the commissioning checklist.

### Modes of operation

A system rarely has one behaviour. In occupied mode it maintains comfort setpoints and meets minimum ventilation. In unoccupied mode it relaxes setpoints to save energy and may shut down ventilation entirely. A warm-up or cool-down mode runs before occupancy to bring the space to setpoint without wasting outdoor air. Night purge uses cool night air to pre-cool the structure. The sequence must state how the system enters and leaves each mode.

### Setpoints interlocks and safeties

Setpoints are the targets. They should always be listed with an adjustable range so operators can tune the building without a programmer. Interlocks describe dependency: a supply fan must prove airflow before a heating coil valve is allowed to open. Safeties are non-negotiable protections. A low-limit freeze thermostat trips the unit and closes outdoor air dampers regardless of what normal control wants. Safeties always take priority over comfort logic.

## PID loops and reset strategies

Modulating outputs are driven by control loops, almost always proportional plus integral, sometimes with a derivative term. The proportional term reacts to the size of the error, the integral term eliminates steady offset, and the derivative term, used sparingly in HVAC, reacts to the rate of change. A loop that hunts or overshoots usually has a tuning problem rather than a mechanical one.

Reset strategies improve efficiency by moving a setpoint based on demand rather than holding it fixed. Two common examples:

- **Supply air temperature reset.** The AHU raises its supply air temperature when zones need little cooling, reducing reheat and chiller energy.
- **Duct static pressure reset.** The fan lowers its static pressure setpoint when no VAV box is near full open, cutting fan power, which scales with the cube of airflow.

Trim and respond logic is the modern way to implement reset: zones that need more send requests, and the setpoint trims gently until requests appear, then responds in larger steps.

## How to read a sequence on site

As an installer or commissioning agent, read a sequence in a disciplined order. First, the points list, so you know what is wired. Second, the safeties, so you know what will trip the unit unexpectedly. Third, the modes, so you understand the big-picture behaviour. Fourth, the control loops, so you know what should modulate and in what direction.

Watch for ambiguity. Phrases like "as required" or "to suit" are warnings that the design intent was not fully resolved. Flag them before programming starts, not during witness testing. A sequence that does not state failure behaviour, such as what happens on sensor failure or loss of communication, is incomplete.

## ASHRAE Guideline 36 as a reference

ASHRAE Guideline 36 publishes standardized, high-performance sequences of operation for common HVAC systems. Instead of every engineer writing AHU and VAV logic from scratch, Guideline 36 offers vetted sequences with proven energy and stability performance, including detailed trim and respond reset, economizer logic and fault detection. Specifying Guideline 36 sequences reduces design effort, improves consistency between projects, and gives commissioning agents a known benchmark to test against. Even where it is not contractually required, it is a valuable model for what a complete, well-structured sequence looks like.
