---
id: ct-01
title: "Cooling towers open versus closed circuit"
pillar: cooling
topic: cooling-towers
order: 1
difficulty: intermediate
tier: free
tags: [cooling-towers, heat-rejection, water]
standards_referenced: []
region: global
ghana_callout: true
estimated_minutes: 9
related: [chil-01, pump-01]
last_updated: 2026-05-21
---

A cooling tower rejects building heat to the atmosphere by evaporating a small fraction of the circulating water. It is the most effective way to dump large heat loads because evaporation lets the system chase the ambient wet bulb temperature rather than the much warmer dry bulb. Understanding evaporative heat rejection is essential to sizing, operating and treating any water cooled plant.

## Evaporative heat rejection and approach to wet bulb

When water is exposed to unsaturated air, some of it evaporates. Each kilogram of evaporated water carries away roughly 2.4 MJ of latent heat, cooling the remaining water. This is why a tower can produce water colder than the surrounding dry bulb air.

The limiting temperature is the ambient wet bulb. In theory the leaving water could be cooled to the wet bulb; in practice it always remains warmer. The gap between leaving water temperature and ambient wet bulb is the approach. A tight approach demands a larger tower with more fill surface and more airflow.

## Range and approach defined

Two temperature differences describe tower performance, and confusing them leads to mis sizing.

| Term | Definition | Set by |
|---|---|---|
| Range | Entering minus leaving water temperature | The load and the water flow rate |
| Approach | Leaving water temperature minus ambient wet bulb | Tower size and selection |

Range is fixed by the heat load and the condenser water flow chosen by the designer. Approach is what you buy when you select the tower. A typical design might be a 5 °C range with a 4 to 5 °C approach against the design wet bulb. Specifying a 2 °C approach is possible but the tower grows quickly and costs rise.

<svg viewBox="0 0 480 180" width="480" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="480" height="180" fill="#ffffff"/>
  <line x1="60" y1="150" x2="420" y2="150" stroke="#333333" stroke-width="2"/>
  <line x1="60" y1="150" x2="60" y2="30" stroke="#333333" stroke-width="2"/>
  <line x1="60" y1="55" x2="420" y2="55" stroke="#c0392b" stroke-width="3"/>
  <line x1="60" y1="95" x2="420" y2="95" stroke="#2980b9" stroke-width="3"/>
  <line x1="60" y1="125" x2="420" y2="125" stroke="#27ae60" stroke-width="3" stroke-dasharray="6 4"/>
  <text x="200" y="48" fill="#c0392b" font-size="13">Entering water 37 C</text>
  <text x="200" y="88" fill="#2980b9" font-size="13">Leaving water 32 C</text>
  <text x="200" y="118" fill="#27ae60" font-size="13">Ambient wet bulb 27 C</text>
  <text x="320" y="78" fill="#333333" font-size="12">Range 5 C</text>
  <text x="320" y="112" fill="#333333" font-size="12">Approach 5 C</text>
</svg>

## Open circuit towers

In an open or direct tower the process water itself is sprayed over the fill and falls through a moving air stream. Part evaporates, the rest collects in a basin and returns to the condenser. Open towers are compact for their duty, low in first cost and thermally efficient because the water contacts the air directly.

Their weakness is exposure. The condenser water is open to the atmosphere, so it picks up dust, organic matter and airborne contamination, and it concentrates dissolved solids as it evaporates. This places the full burden of fouling control on the water treatment programme.

## Closed circuit towers

A closed circuit tower, also called a fluid cooler, runs the process fluid through a coil. A separate spray water circuit wets the outside of that coil while air passes over it. Heat moves from the process fluid through the coil wall, then evaporates from the spray water.

The process loop stays clean and sealed, which protects condensers, plate exchangers and any glycol charge. The penalties are higher first cost, a larger footprint and a slightly worse approach because heat now crosses an extra metal surface. Closed circuit towers are favoured where loop cleanliness matters, where the fluid contains glycol, or where freezing must be managed.

## Water losses and cycles of concentration

A tower loses water three ways, and makeup must replace all of them.

### Evaporation

Evaporation is the useful loss that does the cooling. It is roughly 1.3 to 1.8 percent of the circulating flow for every 5 °C of range. Evaporated water leaves pure, so the dissolved solids it leaves behind concentrate in the remaining water.

### Drift

Drift is liquid water carried out of the tower as fine droplets in the discharge air. It is a loss of treated water and a hygiene concern because those droplets can carry bacteria. Drift eliminators, baffled plates at the air outlet, reduce drift to well under 0.01 percent of flow on modern towers.

### Blowdown and cycles of concentration

Because evaporation concentrates solids, a deliberate bleed, called blowdown or bleed, removes a portion of concentrated water. Cycles of concentration is the ratio of dissolved solids in the circulating water to that in the makeup. Running at three to five cycles balances water saving against scaling risk. Pushing cycles too high saves makeup water but invites scale; too low wastes water and chemicals.

## Drift eliminators Legionella and treatment

Warm, nutrient rich tower water is an ideal habitat for Legionella bacteria, and drift can aerosolise it. A sound water treatment programme controls scale, corrosion and biological growth together. It typically combines a scale and corrosion inhibitor, a biocide programme alternating oxidising and non oxidising chemistry, controlled blowdown driven by a conductivity sensor, and routine cleaning of the basin and fill. Drift eliminators must be kept intact, since a damaged eliminator both wastes water and raises the aerosol risk.

> 🇬🇭 **Ghana context**
> Accra's design wet bulb sits high, often around 26 to 27 °C, which directly raises the leaving water temperature a tower can achieve and forces a larger tower for any given approach. Hard local water concentrates quickly, so cycles of concentration should be set conservatively and conductivity controlled blowdown is strongly advised to limit scaling on condenser tubes. Intermittent municipal supply makes a buffer storage tank important so makeup never starves the basin, and the warm humid climate keeps biological growth active year round, making a disciplined biocide regime non negotiable.

## Selecting and operating well

Fix the range from the load and flow, then select the tower for a sensible approach against the true site design wet bulb, not a textbook value. Choose closed circuit where loop cleanliness or glycol protection justifies the cost. Above all, budget for and commit to a water treatment programme, because an untreated tower loses its approach to fouling and quietly erodes the efficiency of the whole plant.
