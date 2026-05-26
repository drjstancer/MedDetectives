export const trackedLearningOutcomes = {
  evidenceCollection: {
    competency: 'Evidence Collection & Analysis',
    achievedBy: ['qr discoveries', 'timeline reconstruction', 'annotation mapping']
  },

  collaborativeReasoning: {
    competency: 'Collaborative Clinical Reasoning',
    achievedBy: ['team reflections', 'reasoning revisions', 'interpretation synthesis']
  },

  uncertaintyManagement: {
    competency: 'Clinical Uncertainty Management',
    achievedBy: ['insufficient evidence decisions', 'delayed conclusions', 'bias reflection']
  },

  metacognition: {
    competency: 'Metacognitive Awareness',
    achievedBy: ['cognitive bias reflection', 'confidence tracking', 'reinterpretation responses']
  }
};

export function getTrackedLearningOutcomes() {
  return trackedLearningOutcomes;
}
