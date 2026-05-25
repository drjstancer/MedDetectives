export const evidenceConnections = {
  'qr-01': ['qr-02'],
  'qr-02': ['pin-01'],
  'pin-01': ['qr-01']
};

export function getConnectedEvidence(discoveryId) {
  return evidenceConnections[discoveryId] || [];
}
