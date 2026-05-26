export const performanceMetrics = [
  {
    metric: 'Evidence Completion',
    description: 'Tracks how thoroughly teams explored available evidence pathways.'
  },
  {
    metric: 'Reasoning Revision',
    description: 'Measures whether teams appropriately revised interpretations after conflicting evidence.'
  },
  {
    metric: 'Bias Recognition',
    description: 'Evaluates recognition of anchoring, confirmation bias, and premature closure.'
  },
  {
    metric: 'Uncertainty Management',
    description: 'Assesses whether teams appropriately acknowledged incomplete evidence.'
  }
];

export function getPerformanceMetrics() {
  return performanceMetrics;
}
