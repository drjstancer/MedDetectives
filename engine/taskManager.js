import { publish } from './eventBus.js';
import { getState, updateState } from './state.js';

export function updateTasks(taskList) {
  updateState({
    activeTasks: taskList
  });

  publish('tasksUpdated', {
    taskList
  });
}

export function finishTask(taskId) {
  const currentState = getState();

  const finishedTasks = currentState.finishedTasks || [];

  if (!finishedTasks.includes(taskId)) {
    finishedTasks.push(taskId);
  }

  updateState({
    finishedTasks
  });
}
