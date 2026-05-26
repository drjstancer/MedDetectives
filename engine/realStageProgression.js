export const liveStageProgression = {
  currentStage: 'orientation',
  completedDiscoveries: []
};

export function completeDiscovery(discoveryKey) {
  if (!liveStageProgression.completedDiscoveries.includes(discoveryKey)) {
    liveStageProgression.completedDiscoveries.push(discoveryKey);
  }

  if (discoveryKey === 'qr_01') {
    liveStageProgression.currentStage = 'timeline-conflict';
  }

  if (discoveryKey === 'timeline_checkpoint') {
    liveStageProgression.currentStage = 'hidden-reflection';
  }

  if (discoveryKey === 'qr_02') {
    liveStageProgression.currentStage = 'escalation-evidence';
  }

  if (discoveryKey === 'pin_unlock') {
    liveStageProgression.currentStage = 'collaborative-synthesis';
  }

  return liveStageProgression;
}

export function getCurrentStage() {
  return liveStageProgression.currentStage;
}
