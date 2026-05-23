export function createObjectivePanel(objectives) {
  return `
    <section class="objective-panel">
      <h2>Current Objectives</h2>

      <ul>
        ${objectives
          .map(objective => `<li>${objective}</li>`)
          .join('')}
      </ul>
    </section>
  `;
}
