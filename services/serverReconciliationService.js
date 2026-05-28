export function reconcileAuthoritativeSession({
  localSession,
  authoritativeSession
}) {
  if (!authoritativeSession) {
    return localSession;
  }

  if (!localSession) {
    return authoritativeSession;
  }

  const authoritativeUpdated = new Date(
    authoritativeSession.updatedAt || 0
  ).getTime();

  const localUpdated = new Date(
    localSession.updatedAt || 0
  ).getTime();

  if (authoritativeUpdated >= localUpdated) {
    return {
      ...localSession,
      ...authoritativeSession,
      reconciliationSource: 'authoritative'
    };
  }

  return {
    ...authoritativeSession,
    ...localSession,
    reconciliationSource: 'local'
  };
}

export function validateSessionIntegrity(session) {
  return {
    valid: !!(
      session?.code &&
      session?.stage &&
      typeof session?.active === 'boolean'
    ),

    issues: generateIntegrityIssues(session)
  };
}

function generateIntegrityIssues(session) {
  const issues = [];

  if (!session?.code) {
    issues.push('Missing session code');
  }

  if (!session?.stage) {
    issues.push('Missing session stage');
  }

  if (typeof session?.active !== 'boolean') {
    issues.push('Missing active session state');
  }

  return issues;
}
