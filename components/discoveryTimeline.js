export function renderDiscoveryTimeline(container, discoveries = []) {
  if (!container) return;

  const ordered = [...discoveries].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

  container.innerHTML = ordered.map((discovery) => `
    <article class="discovery-card">
      <h3>${discovery.title || 'Discovery'}</h3>
      <p>${discovery.content || ''}</p>
    </article>
  `).join('');
}
