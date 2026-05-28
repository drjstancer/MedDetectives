const PRESENCE_KEY = 'meddetectives-presence-state';

export function registerParticipantPresence({
  sessionCode,
  participantName
}) {
  const presence = getPresenceState();

  presence.push({
    sessionCode,
    participantName,
    joinedAt: new Date().toISOString(),
    lastSeenAt: new Date().toISOString()
  });

  localStorage.setItem(PRESENCE_KEY, JSON.stringify(presence));
}

export function updateParticipantHeartbeat({
  sessionCode,
  participantName
}) {
  const presence = getPresenceState();

  const updated = presence.map(entry => {
    if (
      entry.sessionCode === sessionCode &&
      entry.participantName === participantName
    ) {
      return {
        ...entry,
        lastSeenAt: new Date().toISOString()
      };
    }

    return entry;
  });

  localStorage.setItem(PRESENCE_KEY, JSON.stringify(updated));
}

export function getSessionPresence(sessionCode) {
  return getPresenceState().filter(
    entry => entry.sessionCode === sessionCode
  );
}

function getPresenceState() {
  return JSON.parse(localStorage.getItem(PRESENCE_KEY) || '[]');
}
