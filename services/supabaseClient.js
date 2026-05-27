const SUPABASE_URL_KEY = 'meddetectives-supabase-url';
const SUPABASE_ANON_KEY = 'meddetectives-supabase-anon-key';

let client = null;

export function configureSupabase({ url, anonKey }) {
  if (url) localStorage.setItem(SUPABASE_URL_KEY, url);
  if (anonKey) localStorage.setItem(SUPABASE_ANON_KEY, anonKey);

  client = null;

  return getSupabaseClient();
}

export function getSupabaseClient() {
  if (client) return client;

  const url = localStorage.getItem(SUPABASE_URL_KEY);
  const anonKey = localStorage.getItem(SUPABASE_ANON_KEY);

  if (!url || !anonKey || !window.supabase?.createClient) {
    return null;
  }

  client = window.supabase.createClient(url, anonKey, {
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  });

  return client;
}

export function isRealtimeConfigured() {
  return !!getSupabaseClient();
}
