export function renderScenarioOverviewCard(container, scenario) {
  if (!container || !scenario) return;

  container.innerHTML = `
    <section class="scenario-overview-card">
      <div class="scenario-overview-header">
        <h2>${scenario.title}</h2>

        <div class="scenario-meta">
          <span>${scenario.durationMinutes} Minutes</span>
          <span>${scenario.difficulty}</span>
        </div>
      </div>

      <p>${scenario.overview}</p>

      <div class="scenario-stage-preview">
        ${scenario.stages.map((stage) => `
          <div class="scenario-stage-chip">${stage}</div>
        `).join('')}
      </div>
    </section>
  `;
}
