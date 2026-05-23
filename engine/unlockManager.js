import { getState, updateState } from './state.js';

export function unlockContent(contentId) {
  const currentState = getState();

  const unlockedContent = currentState.unlockedContent || [];

  if (!unlockedContent.includes(contentId)) {
    unlockedContent.push(contentId);
  }

  updateState({
    unlockedContent
  });
}

export function isUnlocked(contentId) {
  const currentState = getState();

  const unlockedContent = currentState.unlockedContent || [];

  return unlockedContent.includes(contentId);
}
