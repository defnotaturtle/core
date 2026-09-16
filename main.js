const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");

const message = "hello world";

// Example draw
function draw() {
  // clear
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  // rec example
  canvasContext.fillStyle = "red";
  canvasContext.fillRect(0, 0, 10, 10);

  requestAnimationFrame(draw);
}


draw();
