export function resolveMultiDeviceConflict({
  facilitatorState,
  participantState
}) {
  if (!facilitatorState) {
    return participantState;
  }

  if (!participantState) {
    return facilitatorState;
  }

  const facilitatorTimestamp = new Date(
    facilitatorState.updatedAt || 0
  ).getTime();

  const participantTimestamp = new Date(
    participantState.updatedAt || 0
  ).getTime();

  if (facilitatorTimestamp >= participantTimestamp) {
    return {
      ...participantState,
      ...facilitatorState,
      resolutionSource: 'facilitator'
    };
  }

  return {
    ...facilitatorState,
    ...participantState,
    resolutionSource: 'participant'
  };
}
