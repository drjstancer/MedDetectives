export function createScenarioConsole(consoleData) {
  return `
    <section class="scenario-console">
      <h2>${consoleData.title}</h2>
      <p>${consoleData.description}</p>

      <div class="console-grid">
        <div>
          <span>Current Stage</span>
          <strong>${consoleData.currentStage}</strong>
        </div>

        <div>
          <span>Escalation</span>
          <strong>${consoleData.escalationLevel}</strong>
        </div>
      </div>
    </section>
  `;
}
