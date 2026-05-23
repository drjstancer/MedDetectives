export function createStatusPanel(statusData) {
  return `
    <section class="status-panel">
      <div class="status-item">
        <span>Current Stage</span>
        <strong>${statusData.currentScene}</strong>
      </div>

      <div class="status-item">
        <span>Escalation</span>
        <strong>${statusData.escalationLevel}</strong>
      </div>

      <div class="status-item">
        <span>Attempts</span>
        <strong>${statusData.remainingAttempts}</strong>
      </div>
    </section>
  `;
}
