/**
 * engine/qrCoordinator.js — QR-Based Physical Discovery Handler
 *
 * Handles the primary physical↔digital bridge:
 * students scan QR codes in the physical room, which load
 * the investigation page with URL parameters that trigger
 * evidence discoveries.
 *
 * QR codes in the physical room link to:
 *   .../investigation.html?clue=CLUE-001
 *   .../investigation.html?clue=CLUE-002
 *   .../investigation.html?zone=ZONE-001
 *
 * This keeps the hybrid interaction extremely simple:
 * no app install, no Bluetooth, no NFC — just a URL.
 */

import { discoverClue } from './challengeEngine.js';
import { publish } from './eventBus.js';

/**
 * Checks the current page URL for QR discovery parameters.
 * Should be called once on page load for every stage page.
 *
 * Returns the parsed discovery object, or null if no QR params present.
 */
export function parseQRFromURL() {
  const params = new URLSearchParams(window.location.search);
  const clueId = params.get('clue');
  const zoneId = params.get('zone');
  const stageId = params.get('stage');

  if (clueId) {
    const normalized = clueId.toUpperCase().trim();
    discoverClue(normalized);
    publish('discovery:clue-found', { clueId: normalized, source: 'qr' });
    _clearQRParams();
    return { type: 'clue', id: normalized };
  }

  if (zoneId) {
    const normalized = zoneId.toUpperCase().trim();
    publish('discovery:zone-entered', { zoneId: normalized, source: 'qr' });
    _clearQRParams();
    return { type: 'zone', id: normalized };
  }

  if (stageId) {
    publish('discovery:stage-marker', { stageId, source: 'qr' });
    _clearQRParams();
    return { type: 'stage', id: stageId };
  }

  return null;
}

/**
 * Generates the QR target URL for a given clue ID.
 * Used by facilitator print tools to create QR codes.
 */
export function getQRTargetURL(type, id) {
  const base = window.location.origin + '/pages/investigation.html';
  return `${base}?${type}=${id}`;
}

/**
 * Removes QR parameters from the URL after processing.
 * Keeps the browser history clean during the session.
 */
function _clearQRParams() {
  const clean = window.location.pathname;
  window.history.replaceState({}, '', clean);
}
