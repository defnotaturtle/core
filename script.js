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

const squares = [];

function createSquare() {
  const randomAngle = Math.random() * Math.PI * 2;
  const randomSquareSpeed = 1 + Math.random() * 2;
  const randomColor = `hsl(${Math.random() * 360}, 80%, 60%)`;

  return {
    x: Math.random() * (canvas.width - defaultSquareSize),
    y: Math.random() * (canvas.height - defaultSquareSize),
    size: defaultSquareSize,
    color: randomColor,
    velocityX: Math.cos(randomAngle) * randomSquareSpeed,
    velocityY: Math.sin(randomAngle) * randomSquareSpeed,
  };
}

function drawSquare(square) {
  canvasContext.fillStyle = square.color;
  canvasContext.fillRect(square.x, square.y, square.size, square.size);
}

// draw the square in a new position
function spawnSquares(numSquaresToGenerate = 1) {
  while (squares.length < numSquaresToGenerate) {
    squares.push(createSquare());
  }

  // Clear the canvas
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  for (const square of squares) {
    // Update square position
    square.x += square.velocityX;
    square.y += square.velocityY;

    // Check for collisions with the canvas edges and reverse direction if necessary
    if (square.x <= 0 || square.x + square.size >= canvas.width) {
      square.velocityX = -square.velocityX; // Reverse horizontal direction
    }
    if (square.y <= 0 || square.y + square.size >= canvas.height) {
      square.velocityY = -square.velocityY; // Reverse vertical direction
    }

    // draw square
    drawSquare(square);
  }

  // Request the next animation frame
  // main draw call?
  requestAnimationFrame(() => spawnSquares(numSquaresToGenerate));

  // Draw the canvas border and text
  drawCanvasBorder(canvasContext, canvas.width, canvas.height, canvasBorderColor, canvasBorder);

  canvasContext.font = '20px Arial';
  canvasContext.fillStyle = 'blue';
  canvasContext.fillText('heyo from code to canvas', 150, 150);
}

// Start the animation
spawnSquares(1005);


