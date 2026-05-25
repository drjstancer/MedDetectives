const listeners = {};

const eventHistory = [];

export function subscribe(eventName, callback) {
  (listeners[eventName] ||= []).push(callback);

  return () => unsubscribe(eventName, callback);
}

export function unsubscribe(eventName, callback) {
  if (!listeners[eventName]) {
    return;
  }

  listeners[eventName] = listeners[eventName]
    .filter((listener) => listener !== callback);
}

export function publish(eventName, payload = {}) {
  eventHistory.push({
    eventName,
    payload,
    occurredAt: new Date().toISOString()
  });

  (listeners[eventName] || []).forEach((callback) => {
    callback(payload);
  });
}

export function getRecentEvents(limit = 25) {
  return eventHistory.slice(-limit);
}
