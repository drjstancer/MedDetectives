import { getEnvironmentalControls } from '../engine/facilitatorEnvironmentalControls.js';

const panel = document.getElementById('facilitator-environmental-controls');

export function renderEnvironmentalControls() {
  if (!panel) return;

  const controls = getEnvironmentalControls();

  panel.innerHTML = controls.map((control) => `
    <article class="participant-discovery-card">
      <span>Environmental Control</span>

      <h3>${control.label}</h3>

      <p>${control.effect}</p>

      <button
        class="secondary-button"
        onclick="window.triggerEnvironmentalShift('${control.id}')"
      >
        Activate
      </button>
    </article>
  `).join('');
}

renderEnvironmentalControls();
