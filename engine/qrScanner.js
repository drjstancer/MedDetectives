export async function startQrScanner({
  videoElement,
  onDiscovery
}) {
  if (!videoElement) return;

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: {
        ideal: 'environment'
      }
    },
    audio: false
  });

  videoElement.srcObject = stream;
  videoElement.setAttribute('playsinline', true);
  videoElement.muted = true;

  await videoElement.play();

  if (!('BarcodeDetector' in window)) {
    console.warn('BarcodeDetector API not supported in this browser');
    return;
  }

  const detector = new BarcodeDetector({
    formats: ['qr_code']
  });

  let scanning = true;

  async function scanLoop() {
    if (!scanning) return;

    if (videoElement.readyState !== 4) {
      requestAnimationFrame(scanLoop);
      return;
    }

    try {
      const barcodes = await detector.detect(videoElement);

      if (barcodes.length > 0) {
        const value = barcodes[0].rawValue;

        scanning = false;

        stream.getTracks().forEach((track) => track.stop());

        onDiscovery(value);

        return;
      }
    } catch (error) {
      console.warn('QR scan error', error);
    }

    requestAnimationFrame(scanLoop);
  }

  requestAnimationFrame(scanLoop);
}
