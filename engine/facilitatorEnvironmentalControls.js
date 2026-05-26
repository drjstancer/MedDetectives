export const facilitatorEnvironmentalControls = [
  {
    id: 'dim-environment',
    label: 'Dim Investigation Environment',
    effect: 'Increase emotional uncertainty and tension.'
  },

  {
    id: 'contradiction-alert',
    label: 'Trigger Contradiction Alert',
    effect: 'Force teams to reassess earlier assumptions.'
  },

  {
    id: 'escalation-silence',
    label: 'Silence Release',
    effect: 'Create reflective emotional pause before next reveal.'
  }
];

export function getEnvironmentalControls() {
  return facilitatorEnvironmentalControls;
}
