import { getSupabaseClient, isRealtimeConfigured } from './supabaseClient.js';

const CHANNEL_PREFIX = 'meddetectives-session-';

export function subscribeToSessionChannel(sessionCode, handlers = {}) {
  if (!isRealtimeConfigured()) {
    return null;
  }

  const supabase = getSupabaseClient();

  const channel = supabase.channel(`${CHANNEL_PREFIX}${sessionCode}`);

  channel.on('broadcast', { event: 'session-update' }, payload => {
    handlers.onSessionUpdate?.(payload.payload);
  });

  channel.on('broadcast', { event: 'stage-update' }, payload => {
    handlers.onStageUpdate?.(payload.payload);
  });

  channel.on('broadcast', { event: 'facilitator-intervention' }, payload => {
    handlers.onFacilitatorIntervention?.(payload.payload);
  });

  channel.subscribe();

  return channel;
}

export async function broadcastSessionUpdate(sessionCode, payload) {
  if (!isRealtimeConfigured()) {
    return false;
  }

  const supabase = getSupabaseClient();

  const channel = supabase.channel(`${CHANNEL_PREFIX}${sessionCode}`);

  await channel.subscribe();

  await channel.send({
    type: 'broadcast',
    event: 'session-update',
    payload
  });

  return true;
}

export async function broadcastStageUpdate(sessionCode, payload) {
  if (!isRealtimeConfigured()) {
    return false;
  }

  const supabase = getSupabaseClient();

  const channel = supabase.channel(`${CHANNEL_PREFIX}${sessionCode}`);

  await channel.subscribe();

  await channel.send({
    type: 'broadcast',
    event: 'stage-update',
    payload
  });

  return true;
}

export async function broadcastFacilitatorIntervention(sessionCode, payload) {
  if (!isRealtimeConfigured()) {
    return false;
  }

  const supabase = getSupabaseClient();

  const channel = supabase.channel(`${CHANNEL_PREFIX}${sessionCode}`);

  await channel.subscribe();

  await channel.send({
    type: 'broadcast',
    event: 'facilitator-intervention',
    payload
  });

  return true;
}
