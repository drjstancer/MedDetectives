export const multiTeamSessionState = {
  sessions: [
    {
      sessionCode: 'MD-6505',
      teamName: 'Team Echo',
      currentStage: 'timeline-conflict',
      contradictionsActive: 2,
      escalationLevel: 'moderate',
      facilitatorAttention: true
    },

    {
      sessionCode: 'MD-8821',
      teamName: 'Team Delta',
      currentStage: 'hidden-reflection',
      contradictionsActive: 1,
      escalationLevel: 'high',
      facilitatorAttention: false
    }
  ]
};

export function getMultiTeamState() {
  return multiTeamSessionState.sessions;
}
