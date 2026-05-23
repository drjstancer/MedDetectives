export async function loadScenarioData(filePath) {
  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error('Unable to load scenario data');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function renderText(targetId, value) {
  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  target.textContent = value;
}
