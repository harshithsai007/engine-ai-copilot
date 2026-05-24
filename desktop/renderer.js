const { ipcRenderer } = require('electron');

const startBtn = document.getElementById('start-btn');
const videoElement = document.getElementById('video');
const guidanceElement = document.getElementById('guidance');

let captureInterval;

startBtn.onclick = async () => {
  const sources = await ipcRenderer.invoke('get-sources');
  
  // For MVP, just pick the first screen
  const source = sources[0];

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: source.id,
          minWidth: 1280,
          maxWidth: 1280,
          minHeight: 720,
          maxHeight: 720
        }
      }
    });
    
    handleStream(stream);
  } catch (e) {
    console.error(e);
  }
};

function handleStream(stream) {
  videoElement.srcObject = stream;
  videoElement.onloadedmetadata = (e) => videoElement.play();

  // Create a canvas to capture frames
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  if (captureInterval) clearInterval(captureInterval);

  captureInterval = setInterval(async () => {
    console.log("Capturing frame for analysis...");
    
    // Draw current video frame to canvas
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    // Convert to Blob
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append('image', blob, 'frame.jpg');

      try {
        // We will update this URL after backend deployment
        const response = await fetch('http://localhost:8000/analyze', {
          method: 'POST',
          body: formData
        });
        
        const data = await response.json();
        guidanceElement.innerText = data.guidance;
      } catch (error) {
        console.error("Analysis failed:", error);
        guidanceElement.innerText = "Connection error. Retrying...";
      }
    }, 'image/jpeg', 0.8);

  }, 10000); // Analyze every 10 seconds for MVP
}
