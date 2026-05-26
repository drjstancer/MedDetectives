import { getCollaborativeTensionMoment } from '../engine/collaborativeTensionMoments.js';

const feed = document.getElementById('investigative-reveal-feed');

export function triggerCollaborativeTension(key) {
  const moment = getCollaborativeTensionMoment(key);

  if (!moment || !feed) return;

  const card = document.createElement('article');

  card.className = 'participant-discovery-card';

  card.innerHTML = `
    <span>Collaborative Tension</span>
    <h3>Team Interpretation Challenge</h3>
    <p>${moment.prompt}</p>
  `;

  feed.prepend(card);
}

window.triggerCollaborativeTension = triggerCollaborativeTension;
