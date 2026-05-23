export function createSceneHeader(title, subtitle) {
  return `
    <header class="scene-header">
      <p class="scene-tag">MedDetectives Experience</p>
      <h1>${title}</h1>
      <p class="scene-subtitle">${subtitle}</p>
    </header>
  `;
}
