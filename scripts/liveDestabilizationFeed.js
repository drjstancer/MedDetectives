import { getDestabilizationEvents } from '../engine/facilitatorDestabilizationEvents.js';

const feed = document.getElementById('investigative-reveal-feed');

export function triggerDestabilization(eventId) {
  const events = getDestabilizationEvents();

  const match = events.find((event) => event.id === eventId);

  if (!match || !feed) return;

  const card = document.createElement('article');

  card.className = 'participant-discovery-card';

  card.innerHTML = `
    <span>Facilitator Escalation</span>
    <h3>${match.title}</h3>
    <p>${match.effect}</p>
  `;

  feed.prepend(card);
}

window.triggerDestabilization = triggerDestabilization;
