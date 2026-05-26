import { getEvidenceRelationships } from '../engine/evidenceRelationshipUnlocks.js';

const board = document.getElementById('evidence-relationship-board');

export function revealEvidenceRelationships(key) {
  if (!board) return;

  const relationships = getEvidenceRelationships(key);

  relationships.forEach((item) => {
    const card = document.createElement('article');

    card.className = 'participant-discovery-card';

    card.innerHTML = `
      <span>Evidence Connection</span>
      <h3>${item.relationship}</h3>
      <p>${item.implication}</p>
    `;

    board.prepend(card);
  });
}

window.revealEvidenceRelationships = revealEvidenceRelationships;
