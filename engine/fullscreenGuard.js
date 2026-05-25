export function initializeFullscreenGuard(onForfeit) {
  let warningCount = 0;

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      warningCount += 1;

      alert(
        'To preserve the integrity of the collaborative investigation, the scenario must remain active on screen.'
      );

      if (warningCount >= 3 && typeof onForfeit === 'function') {
        onForfeit();
      }
    }
  });
}
