import { getState, updateState } from './state.js';
import { publish } from './eventBus.js';

const SESSION_DURATION_MS = 60 * 60 * 1000;
const MAX_CLUES = 3;

function generateSessionCode() {
  return `MD-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function createFacilitatorSession(scenarioId = 'jordan-carter-case') {
  const sessionCode = generateSessionCode();
  const startedAt = new Date();
  const expiresAt = new Date(startedAt.getTime() + SESSION_DURATION_MS);

  const state = updateState({
    scenarioId,
    sessionCode,
    sessionStatus: 'active',
    currentStage: 'Scenario Activation',
    clueRequests: [],
    cluesUsed: 0,
    sentClues: [],
    startedAt: startedAt.toISOString(),
    expiresAt: expiresAt.toISOString()
  });

  publish('FACILITATOR_SESSION_CREATED', {
    scenarioId,
    sessionCode,
    startedAt: startedAt.toISOString(),
    expiresAt: expiresAt.toISOString()
  });

  return state;
}

export function activateParticipantSession({ teamName, sessionCode }) {
  const state = updateState({
    groupName: teamName,
    sessionCode,
    sessionStatus: 'active',
    cluesUsed: getState().cluesUsed || 0,
    clueRequests: getState().clueRequests || [],
    startedAt: getState().startedAt,
    expiresAt: getState().expiresAt
  });

  publish('PARTICIPANT_SESSION_ACTIVATED', {
    teamName,
    sessionCode,
    startedAt: state.startedAt,
    expiresAt: state.expiresAt
  });

  return state;
}

export function getRemainingMilliseconds() {
  const state = getState();

  if (!state.expiresAt) {
    return SESSION_DURATION_MS;
  }

  return Math.max(0, new Date(state.expiresAt).getTime() - Date.now());
}

export function formatRemainingTime(milliseconds = getRemainingMilliseconds()) {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
}

export function requestClue() {
  const state = getState();
  const cluesUsed = state.cluesUsed || 0;

  if (cluesUsed >= MAX_CLUES) {
    return {
      accepted: false,
      message: 'All clue requests have been used.'
    };
  }

  const request = {
    id: `clue-${Date.now()}`,
    requestedAt: new Date().toISOString(),
    stageId: state.currentStage,
    status: 'requested'
  };

  updateState({
    cluesUsed: cluesUsed + 1,
    clueRequests: [...(state.clueRequests || []), request]
  });

  publish('CLUE_REQUESTED', request);

  return {
    accepted: true,
    remaining: MAX_CLUES - cluesUsed - 1,
    request
  };
}

export function sendClue(message = 'Revisit your evidence board and look for a connection your team may have overlooked.') {
  const state = getState();

  const clue = {
    id: `sent-clue-${Date.now()}`,
    message,
    sentAt: new Date().toISOString(),
    stageId: state.currentStage
  };

  updateState({
    sentClues: [...(state.sentClues || []), clue]
  });

  publish('CLUE_SENT', clue);

  return clue;
}

export function markForfeit(reason = 'Session focus was lost.') {
  return updateState({
    sessionStatus: 'forfeit',
    forfeitReason: reason,
    forfeitedAt: new Date().toISOString()
  });
}
