export const facilitatorLiveMonitorState = {
  activeTeams: [
    {
      team: 'Team Echo',
      stage: 'timeline-conflict',
      confidenceState: 'unstable',
      unresolvedContradictions: 2,
      facilitatorAttention: true
    },

    {
      team: 'Team Delta',
      stage: 'hidden-reflection',
      confidenceState: 'overconfident',
      unresolvedContradictions: 1,
      facilitatorAttention: true
    }
  ]
};

export function getFacilitatorLiveState() {
  return facilitatorLiveMonitorState;
}
