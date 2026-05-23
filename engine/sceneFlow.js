export function createSceneFlow(sceneData) {
  return {
    sceneId: sceneData.sceneId,
    title: sceneData.title,
    startedAt: Date.now()
  };
}

export function createStageFlow(stageData) {
  return {
    stageId: stageData.stageId,
    label: stageData.label,
    startedAt: Date.now()
  };
}
