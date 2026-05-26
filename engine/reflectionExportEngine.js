export function generateReflectionExport(teamName, reflections = []) {
  return {
    generatedFor: teamName,
    exportedAt: new Date().toISOString(),
    reflections,
    summary: 'Clinical reasoning reflections exported successfully.'
  };
}
