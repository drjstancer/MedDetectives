import { getEscalationEvents } from '../engine/facilitatorEscalationEngine.js';
import { getTrackedLearningOutcomes } from '../engine/learningOutcomeTracking.js';
import { getDashboardState } from '../engine/facilitatorState.js';

const activeSessionsBoard = document.getElementById('active-sessions-board');
const interventionBoard = document.getElementById('intervention-board');
const competencyBoard = document.getElementById('competency-board');
const reflectionBoard = document.getElementById('reflection-board');

function renderActiveSessions() {
  if (!activeSessionsBoard) return;

  const sessions = getDashboardState().sessions || [];

  activeSessionsBoard.innerHTML = sessions.map((session) => `
    <article class="participant-discovery-card">
      <span>Active Session</span>
      <h3>${session.teamName}</h3>
      <p><strong>Stage:</strong> ${session.currentStage}</p>
      <p><strong>Discoveries:</strong> ${session.discoveries.length}</p>
      <p><strong>Status:</strong> ${session.status}</p>
    </article>
  `).join('');
}

function renderInterventions() {
  if (!interventionBoard) return;

  const events = getEscalationEvents();

  interventionBoard.innerHTML = events.map((event) => `
    <article class="participant-discovery-card">
      <span>Educational Intervention</span>
      <h3>${event.title}</h3>
      <p>${event.description}</p>

      <button
        class="secondary-button"
        onclick="window.triggerEscalation('${event.id}')"
      >
        Trigger Event
      </button>
    </article>
  `).join('');
}

function renderCompetencies() {
  if (!competencyBoard) return;

  const outcomes = getTrackedLearningOutcomes();

  competencyBoard.innerHTML = Object.values(outcomes).map((outcome) => `
    <article class="participant-discovery-card">
      <span>Competency Tracking</span>
      <h3>${outcome.competency}</h3>

      <ul>
        ${outcome.achievedBy.map((item) => `
          <li>${item}</li>
        `).join('')}
      </ul>
    </article>
  `).join('');
}

function renderReflections() {
  if (!reflectionBoard) return;

  const reflections = getDashboardState().reflections || [];

  reflectionBoard.innerHTML = reflections.map((reflection) => `
    <article class="participant-discovery-card">
      <span>Reflection Feed</span>
      <h3>${reflection.team}</h3>
      <p>${reflection.content}</p>
    </article>
  `).join('');
}

window.triggerEscalation = function(eventId) {
  console.log('Trigger escalation:', eventId);

  alert(`Educational escalation triggered: ${eventId}`);
};

export function renderFacilitatorDashboard() {
  renderActiveSessions();
  renderInterventions();
  renderCompetencies();
  renderReflections();
}

renderFacilitatorDashboard();
