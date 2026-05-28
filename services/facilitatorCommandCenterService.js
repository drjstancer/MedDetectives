import { generateOrchestrationHud } from './orchestrationHudService.js';
import { generateLiveRoomDiagnostics } from './liveRoomDiagnosticsService.js';
import { generateFacilitatorTelemetryVisualization } from './facilitatorTelemetryVisualizationService.js';
import { generateInterventionRecommendations } from './interventionRecommendationService.js';
import { generateEscalationAnalytics } from './escalationAnalyticsService.js';

export function generateFacilitatorCommandCenter({
  session,
  telemetry = [],
  presence = [],
  integrityReport,
  insights = []
}) {
  const telemetryVisualization =
    generateFacilitatorTelemetryVisualization({ telemetry });

  const diagnostics = generateLiveRoomDiagnostics({
    session,
    telemetry,
    presence,
    integrityReport
  });

  const escalationAnalytics = generateEscalationAnalytics({
    session,
    telemetry
  });

  const recommendations = generateInterventionRecommendations({
    session,
    telemetry: telemetryVisualization,
    insights
  });

  const hud = generateOrchestrationHud({
    session,
    diagnostics,
    integrity: integrityReport,
    telemetryVisualization,
    recommendations
  });

  return {
    hud,
    diagnostics,
    escalationAnalytics,
    recommendations,
    telemetryVisualization,
    generatedAt: new Date().toISOString()
  };
}
