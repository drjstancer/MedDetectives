export function renderReasoningReflectionCard(container, reasoningPrompt) {
  if (!container || !reasoningPrompt) return;

  container.innerHTML = `
    <section class="reasoning-reflection-card">
      <div class="reflection-label">
        Collaborative Interpretation Reflection
      </div>

      <h2>${reasoningPrompt.prompt}</h2>

      <div class="reflection-options">
        ${reasoningPrompt.options.map((option) => `
          <button class="reflection-option">
            ${option}
          </button>
        `).join('')}
      </div>
    </section>
  `;
}
