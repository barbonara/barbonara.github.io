const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let points = [];
let isDrawingComplete = false;


canvas.addEventListener('click', (event) => {
  if (isDrawingComplete) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  points.push({ x, y });

  if (points.length === 3) {
    drawTriangle(points);
    isDrawingComplete = true;
  }
});

canvas.addEventListener('mousemove', (event) => {
  if (isDrawingComplete) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  drawInProgress(points, { x, y });
});

function drawTriangle(points) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  ctx.lineTo(points[1].x, points[1].y);
  ctx.lineTo(points[2].x, points[2].y);
  ctx.closePath();
  ctx.stroke();
  
  
  points.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
  });
}


function drawInProgress(points, cursorPosition) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  points.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
    ctx.fill();
  });

  if (points.length === 1) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(cursorPosition.x, cursorPosition.y);
    ctx.stroke();
  }

  if (points.length === 2) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(cursorPosition.x, cursorPosition.y);
    ctx.closePath();
    ctx.stroke();
  }
}
