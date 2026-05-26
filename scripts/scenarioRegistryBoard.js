import { getScenarioRegistry } from '../engine/multiScenarioRegistry.js';

const scenarioBoard = document.getElementById('scenario-registry-board');

export function renderScenarioRegistryBoard() {
  if (!scenarioBoard) return;

  const scenarios = getScenarioRegistry();

  scenarioBoard.innerHTML = scenarios.map((scenario) => `
    <article class="participant-discovery-card">
      <span>Scenario Framework</span>
      <h3>${scenario.title}</h3>
      <p>${scenario.focus}</p>
    </article>
  `).join('');
}

renderScenarioRegistryBoard();
