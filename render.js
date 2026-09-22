import { composite_magnitude, delta_time, filtered_candidates, prime_factorization, prime_magnitude, prime_update_speed, primes, primes_found_per_second, progress_bar, progressBarHeight, progressBarWidth, progressBarX, progressBarY, put_it_back, reset_count, table_flip, top_five_candidates, top_five_factorizations_by_sequence, top_five_primes } from "./main.js";

export const game_width = 256;
export const game_height = 256;
export const canvas = document.getElementById("gameCanvas");
export const canvasContext = canvas.getContext("2d");

export function resizeCanvas() {
  const pixelRatio = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
  const scale = Math.max(
    1,
    Math.min(
      Math.floor(window.innerWidth / game_width),
      Math.floor(window.innerHeight / game_height)
    )
  );
  
  canvas.width = game_width * pixelRatio;
  canvas.height = game_height * pixelRatio;
  canvas.style.width = `${game_width * scale}px`;
  canvas.style.height = `${game_height * scale}px`;
  
  canvasContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  canvasContext.imageSmoothingEnabled = false;
  
}export function draw_fps(x = 10, y = 75) {
  const fps = (1000 / delta_time).toFixed(2);
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`FPS: ${fps}`, x, y);
}
export function render() {
  // clear
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  // print delta_time
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(
    `Delta time: ${delta_time.toFixed(2)} ms`,
    canvas.width - 80,
    20
  );

  // draw FPS / time stats
  // draw_time_stats();
  draw_fps(canvas.width - 45, 10);

  // rec example
  canvasContext.fillStyle = "lightblue";
  canvasContext.fillRect(10, 10, 20, 20);

  // todo: animate between flip and put it back
  canvasContext.fillStyle = "white";
  canvasContext.font = "10px Arial";
  canvasContext.fillText(table_flip, 10, 240);

  // draw put_it_back
  canvasContext.fillStyle = "white";
  canvasContext.font = "10px Arial";
  canvasContext.fillText(put_it_back, 110, 240);

  // print top five candidates in descending order
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(
    `Top 5 candidates: ${top_five_candidates.join(", ")}`,
    10,
    80
  );

  // print top five primes in descending order
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(
    `Top 5 primes: ${top_five_primes.join(", ")}`,
    10,
    100
  );

  // print reset count
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Reset count: ${reset_count}`, 10, 120);

  // print prime update speed in seconds
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(
    `Prime update speed: ${(prime_update_speed / 1000).toFixed(2)} s`,
    10,
    140
  );

  // display progress bar for prime update speed
  canvasContext.fillStyle = "gray";
  canvasContext.fillRect(
    progressBarX,
    progressBarY,
    progressBarWidth,
    progressBarHeight
  );
  canvasContext.fillStyle = "lightblue";
  canvasContext.fillRect(
    progressBarX,
    progressBarY,
    progress_bar,
    progressBarHeight
  );
  canvasContext.strokeStyle = "white";
  canvasContext.strokeRect(
    progressBarX,
    progressBarY,
    progressBarWidth,
    progressBarHeight
  );

  // print first 5 primes
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(
    `First 5 primes: ${primes.slice(0, 5).join(", ")}`,
    10,
    130
  );

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
  canvasContext.fillText(
    `Primes found per second: ${primes_found_per_second}`,
    10,
    180
  );

  // print prime magnitude - digit count of largest found prime
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Prime magnitude:`, 10, 200);
  canvasContext.fillStyle = "lightblue";
  canvasContext.font = "12px Arial";
  canvasContext.fillText(`${prime_magnitude}`, 120, 200);

  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Composite magnitude:`, 150, 50);
  canvasContext.fillStyle = "lightblue";
  canvasContext.font = "12px Arial";
  canvasContext.fillText(`${composite_magnitude}`, 185, 70);

  // print prime_factorization
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(
    `Prime factorization of ${Math.max(...filtered_candidates)}: ${prime_factorization}`,
    10,
    220
  );

  // print top_five_factorizations as a vertical list with number and factorization
  canvasContext.fillStyle = "white";
  canvasContext.font = "8px Arial";
  canvasContext.fillText(`Top 5 prime factorizations:`, 50, 20);
  top_five_factorizations_by_sequence.forEach((item, index) => {
    canvasContext.fillStyle = "lightblue";
    canvasContext.font = "8px Arial";
    canvasContext.fillText(
      `${item.number}: ${item.factorization}`,
      50,
      30 + index * 8
    );
  });
}

