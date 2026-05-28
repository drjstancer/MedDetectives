# Realtime Orchestration Setup

## Vision Alignment

Realtime infrastructure exists to support:
- facilitator orchestration,
- synchronized escalation,
- collaborative pacing,
- and room-first investigation experiences.

The technology layer should remain operationally invisible.

---

# Supabase Setup

Create a Supabase project.

Enable Realtime.

Copy:
- Project URL
- Anon Public Key

---

# Facilitator Initialization

Open browser console.

Run:

configureSupabase({
  url: 'YOUR_SUPABASE_URL',
  anonKey: 'YOUR_SUPABASE_ANON_KEY'
});

---

# Current Realtime Features

Implemented:
- session channels,
- stage broadcasts,
- facilitator intervention broadcasts,
- session update propagation,
- realtime channel subscriptions.

---

# Current Operational Mode

If Supabase is configured:
- realtime orchestration activates.

If Supabase is NOT configured:
- the system falls back to local orchestration mode.

This preserves deployability and room-first flexibility.

---

# Architectural Philosophy

The realtime layer exists to:
- synchronize investigations,
- support facilitator orchestration,
- preserve pacing integrity,
- and support multi-device sessions.

It should never become the center of the experience.

The room remains primary.
