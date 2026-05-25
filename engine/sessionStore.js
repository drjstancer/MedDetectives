import { supabase } from './supabaseClient.js';

export async function logSessionEvent(event) {
  if (!supabase) return null;
  return await supabase.from('session_events').insert(event);
}

export async function upsertSession(session) {
  if (!supabase) return null;
  return await supabase.from('sessions').upsert(session, { onConflict: 'session_id' });
}
