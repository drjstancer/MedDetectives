export function buildDebriefExport(session) {
  return {
    sessionCode: session.sessionCode,
    teamName: session.teamName,
    finalStage: session.currentStage,
    contradictionsEncountered: session.contradictionsActive,
    reasoningSummary: [
      'Participants revised assumptions multiple times during the investigation.',
      'Collaborative interpretation evolved as contradictory evidence emerged.',
      'Teams demonstrated increasing tolerance for ambiguity and uncertainty.'
    ],
    facilitatorReflection: 'Facilitator strategically paced destabilization without removing productive uncertainty.'
  };
}
