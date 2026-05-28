export function generatePresenceVisualization({
  participants = [],
  telemetry = []
}) {
  return participants.map(participant => {
    const participantEvents = telemetry.filter(event =>
      event.metadata?.participantName === participant.participantName
    );

    return {
      participantName: participant.participantName,
      joinedAt: participant.joinedAt,
      lastSeenAt: participant.lastSeenAt,
      activityCount: participantEvents.length,
      engagementState: determineEngagementState(participantEvents)
    };
  });
}

function determineEngagementState(events) {
  if (events.length === 0) {
    return 'low-visibility';
  }

  if (events.length < 3) {
    return 'lightly-engaged';
  }

  if (events.length < 10) {
    return 'actively-engaged';
  }

  return 'highly-active';
}
