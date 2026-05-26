export const environmentalShiftRefinement = {
  orientation: {
    visualCue: 'Warm collaborative investigation atmosphere with broad room visibility.',
    facilitatorAction: 'Allow exploratory movement and open interpretation.'
  },

  'timeline-conflict': {
    visualCue: 'Focused lighting around evidence clusters and timeline reconstruction stations.',
    facilitatorAction: 'Encourage teams to physically revisit prior evidence placements.'
  },

  'hidden-reflection': {
    visualCue: 'Subtle environmental isolation emphasizing emotional-context evidence.',
    facilitatorAction: 'Slow pacing slightly to encourage reflective synthesis.'
  },

  'escalation-evidence': {
    visualCue: 'Increased visual tension through narrowed focus and intensified contrast.',
    facilitatorAction: 'Release contradictions carefully without collapsing productive ambiguity.'
  },

  'collaborative-synthesis': {
    visualCue: 'Environmental stabilization supporting collaborative interpretation and reflection.',
    facilitatorAction: 'Shift teams toward defending reasoning journeys instead of final answers.'
  }
};

export function getEnvironmentalShiftRefinement(stage) {
  return environmentalShiftRefinement[stage];
}
