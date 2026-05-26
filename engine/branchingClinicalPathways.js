export const branchingClinicalPathways = [
  {
    pathway: 'Stress Escalation Interpretation',
    consequence: 'Teams may overlook physiological warning signs if stress becomes the sole explanation.'
  },
  {
    pathway: 'Physiological Event Interpretation',
    consequence: 'Teams may underweight emotional and interpersonal contextual evidence.'
  },
  {
    pathway: 'Incomplete Evidence Interpretation',
    consequence: 'Teams appropriately delay conclusions while continuing evidence collection.'
  }
];

export function getBranchingClinicalPathways() {
  return branchingClinicalPathways;
}
