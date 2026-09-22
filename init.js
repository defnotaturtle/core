import { resizeCanvas } from "./render.js";

export function init() {
  
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  window.addEventListener("keydown", (event) => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

    if (!keys[key]) {
      pressedOnce[key] = true;
    }

    keys[key] = true;

    if (
      [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        " ",
        "Space",
      ].includes(event.key)
    ) {
      event.preventDefault();
    }
  });

  window.addEventListener("keyup", (event) => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    keys[key] = false;
    pressedOnce[key] = false;
  });
}export const keys = {};
export const pressedOnce = {};

