import { getSupabaseClient, isRealtimeConfigured } from './supabaseClient.js';

const TABLE_NAME = 'investigation_sessions';

export async function persistSessionState(session) {
  if (!isRealtimeConfigured()) {
    return false;
  }

  const supabase = getSupabaseClient();

  const payload = {
    session_code: session.code,
    stage: session.stage,
    active: session.active,
    start_time: session.startTime,
    paused_at: session.pausedAt,
    total_paused_duration: session.totalPausedDuration,
    updated_at: new Date().toISOString()
  };

  const { error } = await supabase
    .from(TABLE_NAME)
    .upsert(payload, {
      onConflict: 'session_code'
    });

  if (error) {
    console.error('Session persistence failed', error);
    return false;
  }

  return true;
}

export async function recoverSessionState(sessionCode) {
  if (!isRealtimeConfigured()) {
    return null;
  }

  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('session_code', sessionCode)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    code: data.session_code,
    stage: data.stage,
    active: data.active,
    startTime: data.start_time,
    pausedAt: data.paused_at,
    totalPausedDuration: data.total_paused_duration
  };
}
