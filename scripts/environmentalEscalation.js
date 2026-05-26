const shell = document.querySelector('.immersive-environment');

export function triggerEnvironmentalShift(shift) {
  if (!shell) return;

  shell.dataset.escalation = shift;

  if (shift === 'uncertainty-rise') {
    shell.style.filter = 'brightness(0.95)';
  }

  if (shift === 'contradiction-detected') {
    shell.style.filter = 'contrast(1.08) brightness(0.9)';
  }

  if (shift === 'emotional-destabilization') {
    shell.style.filter = 'saturate(0.9) brightness(0.85)';
  }

  if (shift === 'confidence-collapse') {
    shell.style.filter = 'contrast(1.12) brightness(0.82)';
  }
}

window.triggerEnvironmentalShift = triggerEnvironmentalShift;
