export function generateOrchestrationHud({
  session,
  diagnostics,
  integrity,
  telemetryVisualization,
  recommendations = []
}) {
  return {
    sessionCode: session?.code || null,
    stage: session?.stage || 'unknown',
    diagnosticsStatus: diagnostics?.integrityStatus || 'unknown',
    synchronizationState: integrity?.valid
      ? 'stable'
      : 'attention-needed',
    telemetrySummary: telemetryVisualization,
    facilitatorRecommendations: recommendations,
    generatedAt: new Date().toISOString()
  };
}
