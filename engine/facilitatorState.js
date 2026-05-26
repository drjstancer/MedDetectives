export function getDashboardState() {
  return {
    sessions: [
      {
        teamName: 'Team Alpha',
        currentStage: 'stage-02-conflicting-narratives',
        discoveries: ['qr-01', 'qr-02'],
        status: 'active'
      },

      {
        teamName: 'Team Delta',
        currentStage: 'stage-03-reinterpretation',
        discoveries: ['qr-01', 'pin-01', 'qr-02'],
        status: 'active'
      }
    ],

    reflections: [
      {
        team: 'Team Alpha',
        content: 'Our interpretation shifted after contradictory physiological evidence emerged.'
      },

      {
        team: 'Team Delta',
        content: 'We realized we anchored too heavily on stress-related explanations.'
      }
    ]
  };
}
