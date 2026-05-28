export function validateRealtimeSynchronization({
  facilitatorState,
  participantStates = []
}) {
  const mismatches = participantStates.filter(participant => {
    return participant.stage !== facilitatorState.stage;
  });

  return {
    synchronized: mismatches.length === 0,
    mismatchCount: mismatches.length,
    mismatches,
    recommendation: generateRecommendation(mismatches)
  };
}

function generateRecommendation(mismatches) {
  if (mismatches.length === 0) {
    return 'Realtime synchronization appears stable.';
  }

  return 'Pause escalation pacing and restore participant synchronization continuity.';
}
