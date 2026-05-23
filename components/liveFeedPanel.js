export function createLiveFeedPanel(feedItems) {
  return `
    <section class="live-feed-panel">
      <h2>Live Updates</h2>

      <ul>
        ${feedItems
          .map(item => `<li>${item}</li>`)
          .join('')}
      </ul>
    </section>
  `;
}
