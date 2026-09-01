const canvas = document.getElementById('helloCanvas');
const canvasContext = canvas.getContext('2d');

const screenHeight = 200;
const screenWidth = 200;
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


canvas.width = screenWidth;
canvas.height = screenHeight;


// Draw the canvas border and text
drawCanvasBorder(canvasContext, canvas.width, canvas.height, canvasBorderColor, canvasBorder);
canvasContext.fillText('heyo from code to canvas', 50, 50);


