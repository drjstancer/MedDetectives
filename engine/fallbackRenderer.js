export function renderFallbackMessage(targetId, messageText) {
  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  target.innerHTML = `
    <section class="fallback-panel">
      <h2>Temporary Interruption</h2>
      <p>${messageText}</p>
    </section>
  `;
}
