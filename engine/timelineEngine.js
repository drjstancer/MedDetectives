export const roomTimelineSequence = [
  'CARD-A',
  'CARD-D',
  'CARD-B',
  'CARD-C'
];

export const timelineRoomInstructions = {
  title: 'Room Timeline Assembly',
  instruction: 'Assemble the printed timeline fragments in the physical room first. Use this digital checkpoint only after your team agrees on the order.',
  roomFirst: true
};

export function checkRoomTimeline(sequence = []) {
  const normalized = sequence.map((item) => item.trim().toUpperCase());

  const correct = roomTimelineSequence.every((card, index) =>
    normalized[index] === card
  );

  return {
    correct,
    expectedCount: roomTimelineSequence.length,
    submittedCount: normalized.length,
    message: correct
      ? 'Timeline checkpoint confirmed. Continue the investigation.'
      : 'Timeline checkpoint not confirmed. Return to the room materials and reassess the order.'
  };
}
