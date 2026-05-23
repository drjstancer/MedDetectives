const listeners = {};

export function subscribe(eventName, callback) {
  if (!listeners[eventName]) {
    listeners[eventName] = [];
  }

  listeners[eventName].push(callback);
}

export function publish(eventName, payload = {}) {
  if (!listeners[eventName]) {
    return;
  }

  listeners[eventName].forEach(callback => {
    callback(payload);
  });
}
