import { getState, resetState } from '../engine/state.js';
import { increaseEscalation } from '../engine/progression.js';
import { supabase } from '../engine/supabaseClient.js';

const sessionView = document.getElementById('session-view');
const eventsView = document.getElementById('events-view');
const connectionState = document.getElementById('connection-state');

const refresh = async () => {
  const state = getState();
  sessionView.textContent = JSON.stringify(state, null, 2);

  if (!supabase || !state.sessionId) {
    connectionState.textContent = 'Waiting for active session';
    return;
  }

  const s = await supabase
    .from('sessions')
    .select('*')
    .eq('session_id', state.sessionId)
    .maybeSingle();

  const e = await supabase
    .from('session_events')
    .select('*')
    .eq('session_id', state.sessionId)
    .order('created_at', { ascending: false })
    .limit(10);

  if (s.data) sessionView.textContent = JSON.stringify(s.data, null, 2);
  eventsView.textContent = JSON.stringify(e.data || [], null, 2);
  connectionState.textContent = 'Live';
};

let channel = null;

const bindRealtime = async () => {
  const state = getState();
  if (!supabase || !state.sessionId) return;

  channel = supabase
    .channel(`facilitator:${state.sessionId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'sessions', filter: `session_id=eq.${state.sessionId}` },
      refresh
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'session_events', filter: `session_id=eq.${state.sessionId}` },
      refresh
    )
    .subscribe((status) => {
      connectionState.textContent = `Realtime ${status}`;
    });
};

document.getElementById('refresh-btn')?.addEventListener('click', refresh);

document.getElementById('escalate-btn')?.addEventListener('click', async () => {
  await increaseEscalation();
  await refresh();
});

document.getElementById('reset-btn')?.addEventListener('click', async () => {
  resetState();
  await refresh();
});

await refresh();
await bindRealtime();
