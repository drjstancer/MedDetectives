export const annotationPrompts = [
  {
    id: 'annotation-01',
    category: 'Contradiction Mapping',
    instruction: 'Highlight evidence that directly challenges your leading interpretation.'
  },
  {
    id: 'annotation-02',
    category: 'Confidence Tracking',
    instruction: 'Annotate where your team confidence increased or decreased.'
  },
  {
    id: 'annotation-03',
    category: 'Missing Information',
    instruction: 'Identify what evidence is still missing from the investigation.'
  }
];

export function getAnnotationPrompts() {
  return annotationPrompts;
}
