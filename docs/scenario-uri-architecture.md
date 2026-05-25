# MedDetectives Scenario URI Architecture

## Canonical URI Structure

```text
meddetectives://scenario/{scenario-id}/{artifact-type}/{artifact-id}
```

## Jordan Carter Examples

```text
meddetectives://scenario/jordan-carter/timeline/01
meddetectives://scenario/jordan-carter/journal/02
meddetectives://scenario/jordan-carter/escalation/03
meddetectives://scenario/jordan-carter/witness/04
```

## Purpose

The URI architecture allows:

- scalable multi-scenario investigations
- facilitator-generated QR sheets
- session analytics
- structured evidence routing
- dynamic discovery mapping
- reusable investigation engines
- Supabase synchronization
- future downloadable scenario packs

## Long-Term Direction

The current QR discovery map is temporary.

Future architecture should transition toward:

- Supabase-backed artifact registries
- session-specific QR generation
- facilitator orchestration
- live investigation telemetry
- evidence progression locking
- collaborative annotation systems

## Investigation Philosophy

The MedDetectives platform is not a crime-solving simulator.

It is a collaborative educational reasoning environment focused on:

- interpretation
- uncertainty
- evidence synthesis
- communication
- escalation awareness
- reflective thinking
