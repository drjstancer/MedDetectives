export function createQrPromptPanel(promptText) {
  return `
    <section class="qr-prompt-panel">
      <h2>QR Interaction</h2>
      <p>${promptText}</p>
    </section>
  `;
}
