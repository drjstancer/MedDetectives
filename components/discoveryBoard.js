export function createDiscoveryBoard(discoveryItems) {
  return `
    <section class="discovery-board">
      <h2>Discovery Board</h2>

      <div class="discovery-grid">
        ${discoveryItems
          .map(item => `
            <article class="discovery-card">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </article>
          `)
          .join('')}
      </div>
    </section>
  `;
}
