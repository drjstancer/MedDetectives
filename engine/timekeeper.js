import { updateState, getState } from './state.js';

let activeClock = null;

export function beginClock() {
  if (activeClock) {
    return;
  }

  activeClock = setInterval(() => {
    const currentState = getState();

    updateState({
      elapsedMinutes: currentState.elapsedMinutes + 1
    });
  }, 60000);
}

export function haltClock() {
  clearInterval(activeClock);
  activeClock = null;
}
