export async function startQrScanner({
  videoElement,
  onDiscovery
}) {
  if (!videoElement) return;

  const canvas = document.getElementById('qr-canvas');
  const context = canvas.getContext('2d');

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

  let scanning = true;

  async function scanLoop() {
    if (!scanning) return;

    if (videoElement.readyState !== 4) {
      requestAnimationFrame(scanLoop);
      return;
    }

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const qrResult = window.jsQR(
      imageData.data,
      canvas.width,
      canvas.height
    );

    if (qrResult && qrResult.data) {
      scanning = false;

      stream.getTracks().forEach((track) => track.stop());

      onDiscovery(qrResult.data);

      return;
    }

    requestAnimationFrame(scanLoop);
  }

  requestAnimationFrame(scanLoop);
}
