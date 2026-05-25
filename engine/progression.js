import { getState, updateState } from './state.js';
import { logSessionEvent, upsertSession } from './sessionStore.js';

export async function setScene(scene) {
  const state = updateState({ currentScene: scene });
  await upsertSession({
    session_id: state.sessionId,
    group_name: state.groupName,
    scene,
    status: 'active',
    payload: state,
    updated_at: new Date().toISOString()
  });
  return state;
}

export async function unlockScene(scene) {
  const state = getState();
  return updateState({
    unlockedScenes: [...new Set([...state.unlockedScenes, scene])]
  });
}

export async function completeChallenge(challengeId) {
  const state0 = getState();
  const state = updateState({
    completedChallenges: [...new Set([...state0.completedChallenges, challengeId])]
  });

  await logSessionEvent({
    session_id: state.sessionId,
    event_type: 'challenge_complete',
    payload: { challengeId }
  });

  await upsertSession({
    session_id: state.sessionId,
    group_name: state.groupName,
    scene: state.currentScene,
    status: 'active',
    payload: state,
    updated_at: new Date().toISOString()
  });

  return state;
}

export async function discoverClue(clueId) {
  const state0 = getState();
  const state = updateState({
    discoveredClues: [...new Set([...state0.discoveredClues, clueId])]
  });

  await logSessionEvent({
    session_id: state.sessionId,
    event_type: 'clue_discovered',
    payload: { clueId }
  });

  await upsertSession({
    session_id: state.sessionId,
    group_name: state.groupName,
    scene: state.currentScene,
    status: 'active',
    payload: state,
    updated_at: new Date().toISOString()
  });

  return state;
}

export async function increaseEscalation() {
  const state = updateState({ escalationLevel: getState().escalationLevel + 1 });

  await logSessionEvent({
    session_id: state.sessionId,
    event_type: 'escalation',
    payload: { level: state.escalationLevel }
  });

  await upsertSession({
    session_id: state.sessionId,
    group_name: state.groupName,
    scene: state.currentScene,
    status: 'active',
    payload: state,
    updated_at: new Date().toISOString()
  });

  return state;
}
