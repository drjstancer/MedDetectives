const activeTracks = {};

export function playLoop(trackName, filePath) {
  if (activeTracks[trackName]) {
    return;
  }

  const audio = new Audio(filePath);
  audio.loop = true;
  audio.volume = 0.35;

  audio.play();

  activeTracks[trackName] = audio;
}

export function stopLoop(trackName) {
  if (!activeTracks[trackName]) {
    return;
  }

  activeTracks[trackName].pause();
  delete activeTracks[trackName];
}

export function playEffect(filePath) {
  const audio = new Audio(filePath);
  audio.volume = 0.55;
  audio.play();
}
