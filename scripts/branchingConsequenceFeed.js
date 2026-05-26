import { getBranchingConsequence } from '../engine/branchingConsequences.js';

const feed = document.getElementById('investigative-reveal-feed');

export function triggerBranchingConsequence(reasoningKey) {
  const result = getBranchingConsequence(reasoningKey);

  if (!result || !feed) return;

  const card = document.createElement('article');

  card.className = 'participant-discovery-card';

  card.innerHTML = `
    <span>Interpretation Consequence</span>
    <h3>Reasoning Impact</h3>
    <p>${result.consequence}</p>
  `;

  feed.prepend(card);
}

window.triggerBranchingConsequence = triggerBranchingConsequence;
