import { publish } from './eventBus.js';

export function beginEscalationTimeline(timelineData) {
  timelineData.forEach(stage => {
    setTimeout(() => {
      publish('timelineEscalationTriggered', stage);
    }, stage.delayMilliseconds);
  });
}
