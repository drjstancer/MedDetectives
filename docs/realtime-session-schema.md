# Realtime Session Schema

## Supabase Table

Table Name:

investigation_sessions

---

# Recommended Columns

| Column | Type |
|---|---|
| session_code | text |
| stage | text |
| active | boolean |
| start_time | bigint |
| paused_at | bigint |
| total_paused_duration | bigint |
| updated_at | timestamptz |

---

# Architectural Philosophy

The persistence layer exists to:
- support reconnect recovery,
- preserve facilitator pacing,
- maintain synchronized escalation,
- and protect collaborative continuity.

The database is not the experience.

The room remains the experience.

---

# Operational Goals

Persistent session state supports:
- facilitator reconnection,
- participant recovery,
- cross-device synchronization,
- and multi-session orchestration.

---

# Future Extensions

Potential future additions:
- participant presence,
- escalation telemetry,
- facilitator intervention analytics,
- and archival replay systems.

These should remain facilitator-support infrastructure only.
