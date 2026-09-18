const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");

const keys = {};
const pressedOnce = {};

const progressBarWidth = 100;
const progressBarHeight = 10;
const progressBarX = 120;
const progressBarY = 130;

window.addEventListener("keydown", (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

  if (!keys[key]) {
    pressedOnce[key] = true;
  }

  keys[key] = true;

  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Space"].includes(event.key)) {
    event.preventDefault();
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  keys[key] = false;
  pressedOnce[key] = false;
});

const target_frame_rate = 60;
const draw_time_target = 1000 / target_frame_rate;
const table_flip = '(╯°□°)╯︵ ┻━┻'
const prime_upgrade = 0.85;

let delta_accumulator = 0;
let prime_update_speed = 100; // ms

let candidates = [2];
let multiples = [];
let primes = [];
let prime_magnitude = 0;

let draw_count = 0;
let last_draw_time = performance.now();
let current_time = Date.now();
let delta_time = 0;
let reset_count = 0;
let progress_bar = 0;

const start_time = Date.now();

function reset() {
  if (prime_magnitude > reset_count) {
    candidates = [2];
    multiples = [];
    primes = [];
    draw_count = 0;
    last_draw_time = performance.now();
    current_time = Date.now();
    delta_time = 0;

    // reset primes_found_per_second
    primes_found_per_second = 0;

    //
    reset_count = reset_count + 1;
    prime_update_speed = prime_update_speed * prime_upgrade;

    // reset progress bar
    // todo: sync this properly with cycle reset
    progress_bar = 0;
  }
}

function update() {

  // keyboard input to reset to default values
  if (pressedOnce['r']) {
    reset();
    pressedOnce['r'] = false;
  }

  // draw/update count
  draw_count++;
  current_time = Date.now();

  // todo: fix this :)
  primes_found_per_second = (primes.length / ((current_time - start_time) / 1000)).toFixed(2);

  // calculate delta time
  delta_time = performance.now() - last_draw_time;
  delta_accumulator += delta_time;
  last_draw_time = performance.now();

  // call if delta_accumulator greater than prime_update_speed
  if ((delta_accumulator) >= prime_update_speed) {
    step_primes();
    delta_accumulator = 0;
  }

}

function render() {

  // clear
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);


  // print delta_time
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Delta time: ${delta_time.toFixed(2)} ms`, canvas.width - 80, 20);


  // draw FPS / time stats
  // draw_time_stats();
  draw_fps(canvas.width - 45, 10);

  // rec example
  canvasContext.fillStyle = "lightblue";
  canvasContext.fillRect(10, 10, 20, 20);

  // draw table flip
  canvasContext.fillStyle = "white";
  canvasContext.font = "10px Arial";
  canvasContext.fillText(table_flip, 10, 240);


  // print top five candidates in descending order
  const topFiveCandidates = candidates.slice(-5).sort((a, b) => b - a);
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Top 5 candidates: ${topFiveCandidates.join(", ")}`, 10, 80);

  // print top five primes in descending order
  const topFivePrimes = primes.slice(-5).sort((a, b) => b - a);
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Top 5 primes: ${topFivePrimes.join(", ")}`, 10, 100);

  // print reset count
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Reset count: ${reset_count}`, 10, 120);

  // print prime update speed in seconds
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Prime update speed: ${(prime_update_speed / 1000).toFixed(2)} s`, 10, 140);

  // display progress bar for prime update speed
  progress_bar = (delta_accumulator / prime_update_speed) * progressBarWidth;
  
  canvasContext.fillStyle = "gray";
  canvasContext.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);
  canvasContext.fillStyle = "lightblue";
  canvasContext.fillRect(progressBarX, progressBarY, progress_bar, progressBarHeight);
  canvasContext.strokeStyle = "white";
  canvasContext.strokeRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);

  // print first 5 primes
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`First 5 primes: ${primes.slice(0, 5).join(", ")}`, 10, 130);

  // print prime count
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Prime count:`, 10, 160);
  canvasContext.fillStyle = "lightblue";
  canvasContext.font = "18px Arial";
  canvasContext.fillText(`${primes.length}`, 80, 160);

  // print primes found per second
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Primes found per second: ${primes_found_per_second}`, 10, 180);

  // print prime magnitude - digit count of largest found prime
  const largest_prime = primes[primes.length - 1] || 0;
  prime_magnitude = largest_prime.toString().length;
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Largest prime magnitude:`, 10, 200);
  canvasContext.fillStyle = "lightblue";
  canvasContext.font = "12px Arial";
  canvasContext.fillText(`${prime_magnitude}`, 120, 200);

}

// game loop?
function game_loop() {

  update();
  render();

  requestAnimationFrame(game_loop);
}

// starts game loop
game_loop();

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

