export function createZoneCard(zoneData) {
  return `
    <article class="zone-card">
      <h3>${zoneData.name}</h3>
      <p>${zoneData.purpose}</p>

      <ul>
        ${zoneData.requiredItems
          .map(item => `<li>${item}</li>`)
          .join('')}
      </ul>
    </article>
  `;
}
