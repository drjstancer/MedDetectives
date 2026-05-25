import { updateState, resetState } from './engine/state.js';
import { publish } from './engine/eventBus.js';
import { supabase } from './engine/supabaseClient.js';

const form = document.getElementById('activation-form');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const groupName = document.getElementById('teamName').value.trim();
  const sessionCode = document.getElementById('sessionCode').value.trim();
  if (!groupName || !sessionCode) return;

  resetState();
  const sessionId = crypto.randomUUID();
  const state = updateState({
    groupName,
    sessionCode,
    sessionId,
    currentScene: 'investigation',
    unlockedScenes: ['activation', 'investigation']
  });

  publish('session:started', state);

  if (supabase) {
    await supabase.from('sessions').upsert(
      {
        session_id: sessionId,
        group_name: groupName,
        scene: 'investigation',
        status: 'active',
        payload: state,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'session_id' }
    );
  }

  location.href = './pages/investigation.html';
});
