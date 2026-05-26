const SESSION_TIMER_KEY = 'meddetectives-live-session-timer';
const SESSION_TIMER_ACTIVE_KEY = 'meddetectives-live-session-active';

let interval;

export function initializeSharedSessionTimer(displayElementId) {
  const display = document.getElementById(displayElementId);

  if (!display) return;

  syncDisplay(display);

  window.addEventListener('storage', () => {
    syncDisplay(display);
  });

  if (localStorage.getItem(SESSION_TIMER_ACTIVE_KEY) === 'true') {
    startInterval(display);
  }
}

export function activateSharedSession() {
  localStorage.setItem(SESSION_TIMER_KEY, Date.now().toString());
  localStorage.setItem(SESSION_TIMER_ACTIVE_KEY, 'true');
}

function startInterval(display) {
  clearInterval(interval);

  interval = setInterval(() => {
    syncDisplay(display);
  }, 1000);
}

function syncDisplay(display) {
  const startTime = Number(localStorage.getItem(SESSION_TIMER_KEY));

  if (!startTime) {
    display.textContent = '00:00:00';
    return;
  }

  const elapsed = Math.floor((Date.now() - startTime) / 1000);

  const hours = String(Math.floor(elapsed / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');

  display.textContent = `${hours}:${minutes}:${seconds}`;

  if (localStorage.getItem(SESSION_TIMER_ACTIVE_KEY) === 'true' && !interval) {
    startInterval(display);
  }
}
