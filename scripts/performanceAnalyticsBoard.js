import { getPerformanceMetrics } from '../engine/performanceAnalyticsEngine.js';

const analyticsBoard = document.getElementById('performance-analytics-board');

export function renderPerformanceAnalyticsBoard() {
  if (!analyticsBoard) return;

  const metrics = getPerformanceMetrics();

  analyticsBoard.innerHTML = metrics.map((metric) => `
    <article class="participant-discovery-card">
      <span>Performance Metric</span>
      <h3>${metric.metric}</h3>
      <p>${metric.description}</p>
    </article>
  `).join('');
}

renderPerformanceAnalyticsBoard();
