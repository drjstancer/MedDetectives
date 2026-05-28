import {
  recoverSessionState,
  persistSessionState
} from './sessionPersistenceService.js';

const RECOVERY_KEY = 'meddetectives-recovery-state';

export async function saveRecoverySnapshot(session) {
  localStorage.setItem(
    RECOVERY_KEY,
    JSON.stringify({
      ...session,
      recoverySavedAt: new Date().toISOString()
    })
  );

  await persistSessionState(session);
}

export async function recoverParticipantSession(sessionCode) {
  const persistedSession = await recoverSessionState(sessionCode);

  if (persistedSession) {
    return persistedSession;
  }

  const localRecovery = JSON.parse(
    localStorage.getItem(RECOVERY_KEY) || 'null'
  );

  if (
    localRecovery &&
    localRecovery.code === sessionCode
  ) {
    return localRecovery;
  }

  return null;
}

export function clearRecoverySnapshot() {
  localStorage.removeItem(RECOVERY_KEY);
}
