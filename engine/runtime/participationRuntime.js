import { getState, updateState } from '../state.js';

export function recordParticipationMoment({
  participantLabel,
  contributionType,
  notes = ''
}) {
  const state = getState();

  const moments = state.participationMoments || [];

  return updateState({
    participationMoments: [
      ...moments,
      {
        participantLabel,
        contributionType,
        notes,
        createdAt: new Date().toISOString()
      }
    ]
  });
}

export function getParticipationSnapshot() {
  const state = getState();

  const moments = state.participationMoments || [];

  const contributionMap = {};

  moments.forEach((moment) => {
    contributionMap[moment.participantLabel] ||= 0;
    contributionMap[moment.participantLabel] += 1;
  });

  return {
    participantEngagement: contributionMap,
    totalMoments: moments.length,
    facilitatorRecommendation: generateRecommendation(contributionMap)
  };
}

function generateRecommendation(contributionMap) {
  const participants = Object.keys(contributionMap);

  if (participants.length <= 1) {
    return 'Encourage broader collaborative contribution and shared interpretation.';
  }

  return 'Continue supporting balanced collaborative reasoning conversations.';
}
