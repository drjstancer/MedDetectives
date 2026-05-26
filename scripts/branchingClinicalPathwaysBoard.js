import { getBranchingClinicalPathways } from '../engine/branchingClinicalPathways.js';

const pathwaysBoard = document.getElementById('branching-pathways-board');

export function renderBranchingPathwaysBoard() {
  if (!pathwaysBoard) return;

  const pathways = getBranchingClinicalPathways();

  pathwaysBoard.innerHTML = pathways.map((pathway) => `
    <article class="participant-discovery-card">
      <span>Clinical Pathway</span>
      <h3>${pathway.pathway}</h3>
      <p>${pathway.consequence}</p>
    </article>
  `).join('');
}

renderBranchingPathwaysBoard();
