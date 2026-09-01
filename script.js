const canvas = document.getElementById('helloCanvas');
const canvasContext = canvas.getContext('2d');

const defaultScreenHeight = 500;
const defaultScreenWidth = 500;
canvas.width = defaultScreenWidth;
canvas.height = defaultScreenHeight;

const canvasBorder = canvasContext.lineWidth = 5;
const canvasBorderColor = canvasContext.strokeStyle = 'black';

function drawCanvasBorder(context, width, height, borderColor = 'black', borderWidth = 5) {
  context.beginPath();
  context.lineWidth = borderWidth;
  context.strokeStyle = borderColor;
  context.moveTo(0, 0); // set origin
  context.lineTo(width, 0); // top
  context.lineTo(width, height); // right
  context.lineTo(0, height); // bottom
  context.lineTo(0, 0); // left
  context.stroke();
}

// setup square
const defaultSquareSize = 50;
const defaultSquareColor = 'blue';

let squarePositionX = (canvas.width - defaultSquareSize) / 2; // center horizontally
let squarePositionY = (canvas.height - defaultSquareSize) / 2; // center vertically

// Draw the square
canvasContext.fillStyle = defaultSquareColor;
canvasContext.fillRect(squarePositionX, squarePositionY, defaultSquareSize, defaultSquareSize);

// initiate square movement in random direction
const randomAngle = Math.random() * Math.PI * 2;
const squareSpeed = 2;
let squareVelocityX = Math.cos(randomAngle) * squareSpeed;
let squareVelocityY = Math.sin(randomAngle) * squareSpeed;

// draw the square in a new position
function updateSquarePosition() {
  // Clear the canvas
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  // Update square position
  squarePositionX += squareVelocityX;
  squarePositionY += squareVelocityY;

  // Check for collisions with the canvas edges and reverse direction if necessary
  if (squarePositionX <= 0 || squarePositionX + defaultSquareSize >= canvas.width) {
    squareVelocityX = -squareVelocityX; // Reverse horizontal direction
  }
  if (squarePositionY <= 0 || squarePositionY + defaultSquareSize >= canvas.height) {
    squareVelocityY = -squareVelocityY; // Reverse vertical direction
  }

  // draw square
  canvasContext.fillRect(squarePositionX, squarePositionY, defaultSquareSize, defaultSquareSize);

  // Request the next animation frame
  // main draw call?
  requestAnimationFrame(updateSquarePosition);
  
  // Draw the canvas border and text
  drawCanvasBorder(canvasContext, canvas.width, canvas.height, canvasBorderColor, canvasBorder);
  canvasContext.fillText('heyo from code to canvas', 200, 200);
}

// Start the animation
updateSquarePosition();


