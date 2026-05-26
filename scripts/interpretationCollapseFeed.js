import { getInterpretationCollapse } from '../engine/interpretationCollapseEngine.js';

const feed = document.getElementById('investigative-reveal-feed');

export function triggerInterpretationCollapse(reasoningKey, triggerKey) {
  const collapse = getInterpretationCollapse(reasoningKey, triggerKey);

  if (!collapse || !feed) return;

  const card = document.createElement('article');

  card.className = 'participant-discovery-card';

  card.innerHTML = `
    <span>Interpretation Collapse</span>
    <h3>Assumption Destabilized</h3>
    <p>${collapse}</p>
  `;

  feed.prepend(card);
}

window.triggerInterpretationCollapse = triggerInterpretationCollapse;
