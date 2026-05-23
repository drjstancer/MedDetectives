export function createAlertPanel(title, message) {
  return `
    <section class="alert-panel">
      <h2>${title}</h2>
      <p>${message}</p>
    </section>
  `;
}
