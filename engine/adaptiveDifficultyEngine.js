export const adaptiveDifficultyLevels = [
  {
    level: 'Foundational',
    description: 'Provides clearer evidence relationships and guided reflection prompts.'
  },
  {
    level: 'Intermediate',
    description: 'Introduces moderate ambiguity and conflicting interpretations.'
  },
  {
    level: 'Advanced',
    description: 'Includes layered uncertainty, misleading assumptions, and evolving reinterpretation triggers.'
  }
];

export function getAdaptiveDifficultyLevels() {
  return adaptiveDifficultyLevels;
}
