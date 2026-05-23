export async function fetchScenarioRegistry() {
  const response = await fetch('../data/scenarioRegistry.json');

  return await response.json();
}

export async function fetchScenarioFile(folderName, fileName) {
  const response = await fetch(`../data/scenarios/${folderName}/${fileName}`);

  return await response.json();
}
