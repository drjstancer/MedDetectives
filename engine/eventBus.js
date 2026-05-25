const listeners = {};

export function subscribe(eventName, callback) {
  (listeners[eventName] ||= []).push(callback);
}

export function publish(eventName, payload = {}) {
  (listeners[eventName] || []).forEach((callback) => callback(payload));
}
