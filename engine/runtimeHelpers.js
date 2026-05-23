export function hasSceneDetails(sceneDetails) {
  return Boolean(
    sceneDetails &&
    sceneDetails.sceneId &&
    sceneDetails.title
  );
}

export function hasInteractionDetails(interactionDetails) {
  return Boolean(
    interactionDetails &&
    interactionDetails.interactionId
  );
}
