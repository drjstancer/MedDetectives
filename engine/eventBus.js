/**
 * engine/eventBus.js — Experience Event Bus
 *
 * Lightweight pub/sub system that decouples engine modules,
 * UI components, and facilitator controls from each other.
 *
 * Events flow between:
 *   - Physical QR discoveries
 *   - Facilitator dashboard triggers
 *   - Stage progression milestones
 *   - Escalation updates
 *   - Component render requests
 *
 * Named events use namespaced dot notation:
 *   'session:activated'
 *   'discovery:clue-found'
 *   'stage:unlocked'
 *   'escalation:triggered'
 *   'challenge:complete'
 */

const _listeners = {};

/**
 * Subscribe to an event.
 * Returns an unsubscribe function for cleanup.
 */
export function subscribe(eventName, callback) {
  if (!_listeners[eventName]) {
    _listeners[eventName] = [];
  }
  _listeners[eventName].push(callback);

  // Return unsubscribe function
  return () => {
    _listeners[eventName] = _listeners[eventName].filter(fn => fn !== callback);
  };
}

/**
 * Publish an event with an optional payload.
 * All registered listeners for this event are called synchronously.
 */
export function publish(eventName, payload = {}) {
  if (!_listeners[eventName]) return;

  _listeners[eventName].forEach(callback => {
    try {
      callback(payload);
    } catch (err) {
      console.error(`[EventBus] Error in listener for '${eventName}':`, err);
    }
  });
}

/**
 * Remove all listeners for a given event.
 * Useful for stage teardown.
 */
export function clearEvent(eventName) {
  delete _listeners[eventName];
}

/**
 * Returns list of all active event names (for debugging).
 */
export function getActiveEvents() {
  return Object.keys(_listeners);
}
