export function renderEvidenceBoard(container, discoveries = []) {
  if (!container) return;

  container.innerHTML = `
    <section class="evidence-board-shell">
      <div class="evidence-board-header">
        <h2>Collaborative Evidence Board</h2>

        <p>
          Organize discoveries, contradictions, observations,
          and evolving interpretations collaboratively.
        </p>
      </div>

      <div class="evidence-board-grid">
        ${discoveries.map((discovery) => `
          <article class="evidence-board-card">
            <span class="evidence-category">
              ${discovery.category || 'Discovery'}
            </span>

            <h3>${discovery.title}</h3>

            <p>${discovery.content}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}
