import { getState } from '../engine/state.js';
import { handleQR } from '../engine/qrCoordinator.js';
import { completeChallenge, unlockScene, setScene } from '../engine/progression.js';

document.getElementById('scan-btn')?.addEventListener('click', async () => {
  await handleQR();
  alert('Discovery logged');
});

document.getElementById('next-btn')?.addEventListener('click', async () => {
  await completeChallenge('timeline-sequence');
  await unlockScene('interpretation');
  await setScene('interpretation');
  location.href = './interpretation.html';
});

console.log('investigation', getState());
