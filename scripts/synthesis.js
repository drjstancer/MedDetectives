import { getState } from '../engine/state.js';
import {
  getSynthesisSnapshot
} from '../engine/runtime/synthesisRuntime.js';

function renderEvidenceConnections() {
  const state = getState();

  const container = document.getElementById('evidence-connections');

  const connections = state.evidenceConnections || [];

  if (!connections.length) {
    container.innerHTML = `
      <p class="empty-state">
        Your team has not connected evidence yet.
        Begin discussing relationships between discoveries.
      </p>
    `;

    return;
  }

  container.innerHTML = connections.map((connection) => `
    <article class="connection-card">
      <h3>${connection.sourceId} → ${connection.targetId}</h3>
      <p>${connection.rationale}</p>
    </article>
  `).join('');
}

function renderHypotheses() {
  const state = getState();

  const container = document.getElementById('hypothesis-list');

  const hypotheses = state.hypotheses || [];

  if (!hypotheses.length) {
    container.innerHTML = `
      <p class="empty-state">
        No emerging interpretations yet.
        Discuss what your evidence may collectively suggest.
      </p>
    `;

    return;
  }

  container.innerHTML = hypotheses.map((hypothesis) => `
    <article class="hypothesis-card">
      <p class="confidence-level">
        Confidence: ${hypothesis.confidenceLevel}
      </p>

      <h3>${hypothesis.title}</h3>

      <p>${hypothesis.rationale}</p>
    </article>
  `).join('');
}

function renderReflectionQuestions() {
  const state = getState();

  const container = document.getElementById('reflection-questions');

  const unresolvedQuestions = (state.hypotheses || [])
    .flatMap((hypothesis) => hypothesis.unresolvedQuestions || []);

  if (!unresolvedQuestions.length) {
    container.innerHTML = `
      <p class="empty-state">
        Strong collaborative reasoning leaves room for uncertainty.
        Continue identifying unanswered questions.
      </p>
    `;

    return;
  }

  container.innerHTML = unresolvedQuestions.map((question) => `
    <article class="reflection-card">
      <p>${question}</p>
    </article>
  `).join('');
}

function renderSynthesisExperience() {
  const snapshot = getSynthesisSnapshot();

  console.info('Synthesis Snapshot', snapshot);

  renderEvidenceConnections();
  renderHypotheses();
  renderReflectionQuestions();
}

renderSynthesisExperience();
