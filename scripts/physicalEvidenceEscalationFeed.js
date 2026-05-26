import { getPhysicalEvidenceUnlock } from '../engine/physicalEvidenceProgression.js';

const feed = document.getElementById('investigative-reveal-feed');

export function triggerPhysicalEvidenceUnlock(key) {
  const unlock = getPhysicalEvidenceUnlock(key);

  if (!unlock || !feed) return;

  const card = document.createElement('article');

  card.className = 'participant-discovery-card';

  card.innerHTML = `
    <span>Room Escalation</span>
    <h3>Physical Evidence Released</h3>
    <p><strong>Room Action:</strong> ${unlock.roomAction}</p>
    <p>${unlock.escalation}</p>
  `;

  feed.prepend(card);
}

window.triggerPhysicalEvidenceUnlock = triggerPhysicalEvidenceUnlock;
