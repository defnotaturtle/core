const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");

const target_frame_rate = 60;
const draw_time_target = 1000 / target_frame_rate;
const table_flip = '(╯°□°)╯︵ ┻━┻'

let prime_update_speed = 1000; // ms
let candidates = [2];
let multiples = [];
let primes = [];

let draw_count = 0;
let last_draw_time = performance.now();
let current_time = Date.now();
let delta_time = 0;

const start_time = Date.now();

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
  canvasContext.fillStyle = "lightblue";
  canvasContext.fillRect(10, 10, 20, 20);

  // draw table flip
  canvasContext.fillStyle = "white";
  canvasContext.font = "10px Arial";
  canvasContext.fillText(table_flip, 10, 200);

  // todo: move logic

  // call once per second
  if ((delta_time * 1000) % prime_update_speed === 0) {
    step_primes();
  }


  // print top ten candidates in descending order
  const topTenCandidates = candidates.slice(-10).sort((a, b) => b - a);
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Top 10 candidates: ${topTenCandidates.join(", ")}`, 10, 80);

  // print top ten primes in descending order
  const topTenPrimes = primes.slice(-10).sort((a, b) => b - a);
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Top 10 primes: ${topTenPrimes.join(", ")}`, 10, 100);

  // print max candidate
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Current candidate: ${Math.max(...candidates)}`, 10, 110);

  // print prime count
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Prime count:`, 10, 160);
  canvasContext.fillStyle = "lightblue";
  canvasContext.font = "18px Arial";
  canvasContext.fillText(`${primes.length}`, 80, 160);

  // print first 10 primes
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`First 10 primes: ${primes.slice(0, 10).join(", ")}`, 10, 130);



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

  // format current time as a human-readable string
  canvasContext.fillStyle = "black";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Current time: ${new Date(current_time).toLocaleTimeString()}`, 10, 45);

}


function step_primes() {

  // get max candidate
  const max_candidate = Math.max(...candidates);
  const new_candidate = max_candidate + 1;

  // add multiples
  const self = max_candidate * max_candidate;
  primes.map(prime => prime * max_candidate).forEach(multiple => multiples.push(multiple));
  multiples.push(self);

  // filter primes
  if (!multiples.includes(max_candidate)) {
    primes.push(max_candidate);
  }

  // todo: factorization list


  // increment candidates
  candidates.push(new_candidate);
}

function draw_fps(x = 10, y = 75) {
  const fps = (1000 / delta_time).toFixed(2);
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`FPS: ${fps}`, x, y);
}

