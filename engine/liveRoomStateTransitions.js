export const liveRoomStateTransitions = {
  orientation: {
    lighting: 'Warm ambient collaborative investigation lighting.',
    roomState: 'Teams orienting to evidence landscape.'
  },

  'timeline-conflict': {
    lighting: 'Slight dimming with sharper contrast around evidence stations.',
    roomState: 'Contradictions beginning to emerge across witness narratives.'
  },

  'hidden-reflection': {
    lighting: 'Cooler directional lighting emphasizing isolation and uncertainty.',
    roomState: 'Participants discovering deeper emotional context.'
  },

  'escalation-evidence': {
    lighting: 'Heightened environmental tension with focused evidence illumination.',
    roomState: 'Interpretive certainty destabilizing rapidly.'
  },

  'collaborative-synthesis': {
    lighting: 'Reflective stabilization lighting encouraging collaborative meaning-making.',
    roomState: 'Teams preparing final synthesis and reflective interpretation.'
  }
};

export function getRoomStateTransition(stage) {
  return liveRoomStateTransitions[stage];
}
