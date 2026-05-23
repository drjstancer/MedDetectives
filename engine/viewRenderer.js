export function renderComponent(targetId, content) {
  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  target.innerHTML = content;
}

export function appendComponent(targetId, content) {
  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  target.innerHTML += content;
}

export function clearComponent(targetId) {
  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  target.innerHTML = '';
}
