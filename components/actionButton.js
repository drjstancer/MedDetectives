export function createActionButton(label, buttonId) {
  return `
    <button class="action-button" id="${buttonId}">
      ${label}
    </button>
  `;
}
