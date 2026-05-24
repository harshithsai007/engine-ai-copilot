const { ipcRenderer } = require('electron');

const startBtn = document.getElementById('start-btn');
const videoElement = document.getElementById('video');
const guidanceElement = document.getElementById('guidance');

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

  // MVP: Mock periodic analysis
  setInterval(async () => {
    // In a real app, you would capture a frame and send it to the backend
    console.log("Capturing frame for analysis...");
    
    // Simulate API call to backend
    // const response = await fetch('http://localhost:8000/analyze', { ... });
    // const data = await response.json();
    // guidanceElement.innerText = data.guidance;

    guidanceElement.innerText = "Analyzing technical context... [Simulated AI Guidance: Focus on Big O complexity and memory tradeoffs for this approach.]";
  }, 5000);
}
