export function createRecoveryPanel(messageText) {
  return `
    <section class="recovery-panel">
      <h2>Session Recovery</h2>
      <p>${messageText}</p>
    </section>
  `;
}
