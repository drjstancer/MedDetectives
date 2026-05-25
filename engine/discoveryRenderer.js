export function renderDiscovery(discovery, timelineContainer) {
  if (!timelineContainer || !discovery) return;

  const card = document.createElement('article');
  card.className = 'discovery-reveal-card';

  card.innerHTML = `
    <div class="discovery-reveal-inner">
      <span class="discovery-label">
        ${discovery.category || 'Discovery'}
      </span>

      <h3>${discovery.title || 'New Discovery'}</h3>

      <p>${discovery.content || ''}</p>
    </div>
  `;

  card.animate(
    [
      { opacity: 0, transform: 'translateY(12px)' },
      { opacity: 1, transform: 'translateY(0px)' }
    ],
    {
      duration: 500,
      easing: 'ease-out'
    }
  );

  timelineContainer.prepend(card);
}
