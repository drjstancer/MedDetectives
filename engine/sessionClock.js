export function createSessionClock(startTimestamp, durationMinutes) {
  const duration = (durationMinutes || 60) * 60 * 1000;

  return {
    getRemainingMilliseconds() {
      const elapsed = Date.now() - startTimestamp;
      return Math.max(duration - elapsed, 0);
    },

    getFormattedRemainingTime() {
      const remaining = this.getRemainingMilliseconds();
      const minutes = Math.floor(remaining / 60000)
        .toString()
        .padStart(2, '0');

      const seconds = Math.floor((remaining % 60000) / 1000)
        .toString()
        .padStart(2, '0');

      return minutes + ':' + seconds;
    }
  };
}
