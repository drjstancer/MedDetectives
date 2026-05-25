export function saveSessionRecoveryState(sessionCode, state) {
  if (!sessionCode || !state) return;

  localStorage.setItem(
    `meddetectives-session-${sessionCode}`,
    JSON.stringify({
      ...state,
      updatedAt: Date.now()
    })
  );
}

export function loadSessionRecoveryState(sessionCode) {
  if (!sessionCode) return null;

  const raw = localStorage.getItem(
    `meddetectives-session-${sessionCode}`
  );

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}
