import { getUrgencyEscalation } from '../engine/urgencyEscalationEngine.js';

const header = document.querySelector('.session-header');

export function updateUrgencyBanner(stage) {
  if (!header) return;

  const escalation = getUrgencyEscalation(stage);

  if (!escalation) return;

  let banner = document.getElementById('urgency-banner');

  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'urgency-banner';
    banner.style.marginTop = '1rem';
    banner.style.padding = '1rem';
    banner.style.borderRadius = '12px';
    banner.style.fontWeight = '600';

    header.appendChild(banner);
  }

  banner.innerHTML = escalation.banner;

  if (escalation.urgencyLevel === 'moderate') {
    banner.style.background = 'rgba(255, 196, 0, 0.15)';
  }

  if (escalation.urgencyLevel === 'high') {
    banner.style.background = 'rgba(255, 120, 0, 0.18)';
  }

  if (escalation.urgencyLevel === 'critical') {
    banner.style.background = 'rgba(255, 0, 0, 0.18)';
  }

  if (escalation.urgencyLevel === 'resolution') {
    banner.style.background = 'rgba(0, 180, 255, 0.16)';
  }
}

window.updateUrgencyBanner = updateUrgencyBanner;
