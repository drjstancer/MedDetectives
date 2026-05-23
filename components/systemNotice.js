export function createSystemNotice(title, message) {
  return `
    <section class="system-notice">
      <h2>${title}</h2>
      <p>${message}</p>
    </section>
  `;
}
