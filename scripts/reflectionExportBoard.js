import { generateReflectionExport } from '../engine/reflectionExportEngine.js';

const exportBoard = document.getElementById('reflection-export-board');

export function renderReflectionExportBoard() {
  if (!exportBoard) return;

  const exportData = generateReflectionExport('Demo Team', [
    'Our interpretation shifted after contradictory witness evidence emerged.',
    'We initially anchored too heavily on stress-related explanations.'
  ]);

  exportBoard.innerHTML = `
    <article class="participant-discovery-card">
      <span>Reflection Export</span>
      <h3>${exportData.generatedFor}</h3>
      <p>${exportData.summary}</p>
      <pre>${JSON.stringify(exportData, null, 2)}</pre>
    </article>
  `;
}

renderReflectionExportBoard();
