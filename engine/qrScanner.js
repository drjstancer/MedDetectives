export async function startQrScanner({
  videoElement,
  onDiscovery
}) {
  if (!videoElement) return;

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'environment'
    }
  });

  videoElement.srcObject = stream;
  videoElement.setAttribute('playsinline', true);

  await videoElement.play();

  const detector = new BarcodeDetector({
    formats: ['qr_code']
  });

  async function scanFrame() {
    if (videoElement.readyState !== 4) {
      requestAnimationFrame(scanFrame);
      return;
    }

    try {
      const barcodes = await detector.detect(videoElement);

      if (barcodes.length > 0) {
        const value = barcodes[0].rawValue;

        stream.getTracks().forEach((track) => track.stop());

        onDiscovery(value);
        return;
      }
    } catch (error) {
      console.warn('QR scan error', error);
    }

    requestAnimationFrame(scanFrame);
  }

  scanFrame();
}
