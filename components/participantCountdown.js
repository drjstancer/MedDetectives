export function renderParticipantCountdown(container, remainingSeconds = 3600) {
  if (!container) return;

  const minutes = Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, '0');

  const seconds = (remainingSeconds % 60)
    .toString()
    .padStart(2, '0');

  container.innerHTML = `
    <section class="participant-countdown-shell">
      <div class="countdown-label">Investigation Time Remaining</div>

      <div class="countdown-display">
        ${minutes}:${seconds}
      </div>
    </section>
  `;
}
