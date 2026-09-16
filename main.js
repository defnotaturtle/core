const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");

const target_frame_rate = 60;
const draw_time_target = 1000 / target_frame_rate;

let draw_count = 0;
let last_draw_time = performance.now();
let current_time = Date.now();

// game loop?
function draw() {

  // draw/update count
  draw_count++;

  current_time = Date.now();

  // calculate delta time
  delta_time = performance.now() - last_draw_time;
  last_draw_time = performance.now();

  // clear
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  // draw FPS / time stats
  // draw_time_stats();
  draw_fps(canvas.width - 45, 10);

  // rec example
  canvasContext.fillStyle = "red";
  canvasContext.fillRect(0, 0, 10, 10);

  requestAnimationFrame(draw);
}

// starts game loop
draw();



// function things

function draw_time_stats() {

  // show draw_target_time
  canvasContext.fillStyle = "black";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Draw target time: ${draw_time_target.toFixed(2)} ms`, 10, 60);

  // show draw count
  canvasContext.fillStyle = "black";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Draw count: ${draw_count}`, 10, 30);

  // draw delta time
  canvasContext.fillStyle = "black";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Delta time: ${delta_time.toFixed(2)} ms`, 10, 15);

  // draw current time
  canvasContext.fillStyle = "black";
  canvasContext.font = "8px Arial";
  // format current time as a human-readable string
  const current_time_string = new Date(current_time).toLocaleTimeString();
  canvasContext.fillText(`Current time: ${current_time_string}`, 10, 45);
}

function draw_fps(x = 10, y = 75) {
  const fps = (1000 / delta_time).toFixed(2);
  canvasContext.fillStyle = "black";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`FPS: ${fps}`, x, y);
}

