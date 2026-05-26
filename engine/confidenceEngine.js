export function calculateConfidenceShift({
  currentConfidence,
  evidenceReliability
}) {
  const modifiers = {
    strong: 15,
    moderate: 8,
    conflicting: -10,
    uncertain: 0
  };

  return Math.max(
    0,
    Math.min(
      100,
      currentConfidence + (modifiers[evidenceReliability] || 0)
    )
  );
}
