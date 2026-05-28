export function generateReconnectMessage(session) {
  if (!session) {
    return {
      title: 'Session Recovery Unavailable',
      message: 'Reconnect with your facilitator for session restoration.'
    };
  }

  return {
    title: 'Investigation Reconnected',
    message: `Your team has been restored to the ${session.stage} stage.`
  };
}

export function generateRecoveryStatus(session) {
  return {
    recovered: !!session,
    stage: session?.stage || null,
    active: session?.active || false,
    restoredAt: new Date().toISOString()
  };
}
