import { supabase } from './supabaseClient.js';

export function subscribeSession(sessionId, onUpdate) {
  if (!supabase) return null;

  return supabase
    .channel(`session:${sessionId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'session_events', filter: `session_id=eq.${sessionId}` },
      onUpdate
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'sessions', filter: `session_id=eq.${sessionId}` },
      onUpdate
    )
    .subscribe();
}
