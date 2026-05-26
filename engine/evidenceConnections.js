export const evidenceConnections = {
  'qr-01': ['qr-02', 'pin-01'],
  'qr-02': ['pin-01'],
  'pin-01': ['qr-01'],
  'witness-04': ['qr-02']
};

export function getConnectedEvidence(discoveryId) {
  return evidenceConnections[discoveryId] || [];
}
