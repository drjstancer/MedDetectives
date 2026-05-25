export function renderFacilitatorInvestigationMap(container, currentStage) {
  if (!container) return;

  const stages = [
    'Orientation',
    'Initial Discovery',
    'Timeline Conflict',
    'Interpretation Shift',
    'Escalation Evidence',
    'Collaborative Synthesis'
  ];

  container.innerHTML = `
    <section class="facilitator-map-shell">
      <h2>Live Investigation Flow</h2>

      <div class="facilitator-stage-list">
        ${stages.map((stage) => `
          <div class="facilitator-stage ${stage === currentStage ? 'active-stage' : ''}">
            ${stage}
          </div>
        `).join('')}
      </div>
    </section>
  `;
}
