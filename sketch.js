document.addEventListener('DOMContentLoaded', function() {
    const captureVideo = document.getElementById('captureVideo');
    const canvas = document.getElementById('captureCanvas');
    const context = canvas.getContext('2d');
    const textInput = document.getElementById('textInput');
    let lastInputTime = Date.now();

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            captureVideo.srcObject = stream;
            captureVideo.play();
            captureVideo.addEventListener('loadedmetadata', () => {
                canvas.width = captureVideo.videoWidth;
                canvas.height = captureVideo.videoHeight;
            });
        })
        .catch(function(error) {
            console.error("Error accessing the webcam: ", error);
        });

    function captureFrame() {
        if (Date.now() - lastInputTime < 1000) { // Update the frame if within 1 second of last input
            context.drawImage(captureVideo, 0, 0, canvas.width, canvas.height);
        }
    }

    function updateFrame() {
        requestAnimationFrame(updateFrame);
        captureFrame();
    }

    textInput.addEventListener('input', function() {
        lastInputTime = Date.now();
        captureVideo.style.display = 'none';
        canvas.style.display = 'block';
    });

    updateFrame(); // Start the frame update loop
});

