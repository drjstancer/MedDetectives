import { publish } from './eventBus.js';

export function monitorConnectionState() {
  window.addEventListener('offline', () => {
    publish('connectionUnavailable');
  });

  window.addEventListener('online', () => {
    publish('connectionRestored');
  });
}
