export function sendPlatformSignal(signalName, signalData) {
  return {
    signalName,
    signalData,
    timestamp: Date.now()
  };
}

export function createPlatformSnapshot(snapshotData) {
  return {
    snapshotData,
    createdAt: Date.now()
  };
}
