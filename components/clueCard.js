export function createClueCard(clueData) {
  return `
    <article class="clue-card">
      <p class="clue-category">${clueData.category}</p>
      <h3>${clueData.title}</h3>
      <p>${clueData.description}</p>
      <p class="importance-level">
        Importance: ${clueData.importanceLevel}
      </p>
    </article>
  `;
}
