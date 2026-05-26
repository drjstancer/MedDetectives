import { evidenceGraph } from '../engine/evidenceGraph.js';

const board = document.getElementById('evidence-relationship-board');

export function renderEvidenceRelationshipBoard() {
  if (!board) return;

  const entries = Object.entries(evidenceGraph);

  board.innerHTML = entries.map(([source, targets]) => `
    <article class="participant-discovery-card">
      <span>Evidence Relationship</span>
      <h3>${source}</h3>
      <p><strong>Connected Evidence:</strong> ${targets.join(', ')}</p>
      <p>
        Teams should evaluate how these findings reinforce,
        contradict, or destabilize earlier interpretations.
      </p>
    </article>
  `).join('');
}

renderEvidenceRelationshipBoard();
