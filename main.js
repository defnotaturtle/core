import { init, pressedOnce } from "./init.js";
import { canvasContext, render } from "./render.js";

export const progressBarWidth = 100;
export const progressBarHeight = 10;
export const progressBarX = 120;
export const progressBarY = 130;

const target_frame_rate = 60;
const draw_time_target = 1000 / target_frame_rate;
export const table_flip = "(╯°□°)╯︵ ┻━┻";
export const put_it_back = "┬─┬ノ( º _ ºノ)";
const prime_upgrade = 0.85;

export let delta_time = 0;
export let primes_found_per_second = 0;
export let top_five_candidates = [];
export let top_five_primes = [];
export let top_five_factorizations_by_sequence = [];
export let prime_factorization = "";
let delta_accumulator = 0;
export let prime_update_speed = 800; // ms
let prime_factorizations = [];
let candidates = [2];
let multiples = [];
export let primes = [];
export let filtered_candidates = [];
export let prime_magnitude = 0;
export let composite_magnitude = 0;
let draw_count = 0;
let last_draw_time = performance.now();
let current_time = Date.now();
export let reset_count = 0;
export let progress_bar = 0;

const start_time = Date.now();

init();
filtered_candidates = candidates.filter(
  (candidate) => !primes.includes(candidate),
);

function update() {
  // keyboard input to reset to default values
  if (pressedOnce["r"]) {
    reset();
    pressedOnce["r"] = false;
  }

  top_five_candidates = candidates.slice(-5).sort((a, b) => b - a);
  top_five_primes = primes.slice(-5).sort((a, b) => b - a);
  prime_magnitude = (primes[primes.length - 1] || 0).toString().length;

  top_five_factorizations_by_sequence = prime_factorizations
    .slice(-5)
    .sort((a, b) => b.number - a.number);

    
  // draw/update count
  draw_count++;
  current_time = Date.now();

  // todo: fix this :) -> sync with reset() function
  primes_found_per_second = (
    primes.length /
    ((current_time - start_time) / 1000)
  ).toFixed(2);

  // calculate delta time
  delta_time = performance.now() - last_draw_time;
  delta_accumulator += delta_time;
  last_draw_time = performance.now();

  // call if delta_accumulator greater than prime_update_speed
  if (delta_accumulator >= prime_update_speed) {
    step_primes();
    delta_accumulator = 0;
  }

  // update prime speed progress bar
  progress_bar = (delta_accumulator / prime_update_speed) * progressBarWidth;
}

function reset() {
  if (prime_magnitude > reset_count) {
    candidates = [2];
    multiples = [];
    primes = [];
    filtered_candidates = [];
    prime_factorizations = [];

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
  canvasContext.fillText(
    `Draw target time: ${draw_time_target.toFixed(2)} ms`,
    10,
    60,
  );

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
  canvasContext.fillText(
    `Current time: ${new Date(current_time).toLocaleTimeString()}`,
    10,
    45,
  );
}

function step_primes() {
  // get max candidate
  const max_candidate = Math.max(...candidates);
  const new_candidate = max_candidate + 1;

  // add multiples
  const self = max_candidate * max_candidate;
  primes
    .map((prime) => prime * max_candidate)
    .forEach((multiple) => multiples.push(multiple));
  multiples.push(self);

  // filter primes
  if (!multiples.includes(max_candidate)) {
    primes.push(max_candidate);
  } else {
    filtered_candidates.push(max_candidate);

    // generate prime factorization for max_candidate
    const prime_factors = [];
    let remaining = max_candidate;

    for (const prime of primes) {
      while (remaining % prime === 0) {
        prime_factors.push(prime);
        remaining /= prime;
      }
      if (remaining === 1) break;
    }

    // generate prime factorization string

    // get duplicate counts for prime factors
    let factor_counts = [];
    prime_factors.forEach((factor) => {
      factor_counts[factor] = (factor_counts[factor] || 0) + 1;
    });

    let magnitude = 0;
    // create prime factorization string with exponents
    prime_factorization = Object.entries(factor_counts)
      .map(([factor, count]) => {
        magnitude += 1;
        return count > 1 ? `${factor}^${count}` : factor;
      })
      .join(" × ");

    prime_factorizations.push({
      number: max_candidate,
      factorization: prime_factorization,
    });

    composite_magnitude = Math.max(composite_magnitude, magnitude);
  }

  // todo: factorization list

  // increment candidates
  candidates.push(new_candidate);
}
