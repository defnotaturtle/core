const canvas = document.getElementById('helloCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = Math.max(320, rect.width * ratio);
  canvas.height = Math.max(220, rect.width * 0.52 * ratio);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(ratio, ratio);
}

function drawFrame(time) {
  const w = canvas.width;
  const h = canvas.height;
  const scale = window.devicePixelRatio || 1;

  ctx.clearRect(0, 0, w, h);

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#e0f2fe');
  bg.addColorStop(0.5, '#f8fafc');
  bg.addColorStop(1, '#e2e8f0');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 22; i += 1) {
    const x = ((i * 97) + time * 0.02) % (w + 80) - 40;
    const y = (i * 43) % (h + 60) - 20;
    const radius = 10 + (i % 7) * 3;
    ctx.beginPath();
    ctx.fillStyle = `rgba(59, 130, 246, ${0.08 + (i % 4) * 0.04})`;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const pulse = (Math.sin(time / 500) + 1) / 2;
  const fontSize = 66 + pulse * 24;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 6;
  ctx.lineJoin = 'round';

  const gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, '#7c3aed');
  gradient.addColorStop(0.5, '#2563eb');
  gradient.addColorStop(1, '#06b6d4');

  ctx.font = `700 ${fontSize}px Arial`;
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.22)';
  ctx.strokeText('Hello World', w / 2 / scale, h / 2 / scale + Math.sin(time / 600) * 10);
  ctx.fillStyle = gradient;
  ctx.fillText('Hello World', w / 2 / scale, h / 2 / scale + Math.sin(time / 600) * 10);

  requestAnimationFrame(drawFrame);
}

function init() {
  resizeCanvas();
  requestAnimationFrame(drawFrame);
}

window.addEventListener('resize', resizeCanvas);
init();
