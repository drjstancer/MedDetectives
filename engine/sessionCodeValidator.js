export function validateSessionCode(inputCode, activeSessions = []) {
  return activeSessions.find(
    (session) => session.sessionCode === inputCode
  );
}
