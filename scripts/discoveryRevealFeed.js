import { getReveal } from '../engine/discoveryRevealEngine.js';

const feed = document.getElementById('investigative-reveal-feed');

const unlocked = [];

export function revealDiscovery(key) {
  const reveal = getReveal(key);

  if (!reveal || unlocked.includes(key) || !feed) return;

  unlocked.push(key);

  const card = document.createElement('article');

  card.className = 'participant-discovery-card';

  card.innerHTML = `
    <span>${reveal.type}</span>
    <h3>${reveal.title}</h3>
    <p>${reveal.content}</p>
  `;

  feed.prepend(card);
}

window.revealDiscovery = revealDiscovery;
