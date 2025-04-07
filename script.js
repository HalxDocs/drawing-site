const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const brushSize = document.getElementById('brush-size');
const sizeValue = document.getElementById('size-value');
const clearBtn = document.getElementById('clear');
const saveBtn = document.getElementById('save');

let isDrawing = false;
let currentColor = '#000000';
let currentSize = 5;

// Set canvas size to match display size (fixes blurriness)
function resizeCanvas() {
  const container = canvas.parentElement;
  canvas.width = container.offsetWidth;
  canvas.height = 500; // Fixed height, but can be responsive
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Drawing functions
function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath(); // Reset path
}

function draw(e) {
  if (!isDrawing) return;
  
  ctx.lineWidth = currentSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;
  
  // Get correct position (mouse or touch)
  let x, y;
  if (e.type.includes('touch')) {
    const rect = canvas.getBoundingClientRect();
    x = e.touches[0].clientX - rect.left;
    y = e.touches[0].clientY - rect.top;
  } else {
    x = e.offsetX;
    y = e.offsetY;
  }
  
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Event Listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch support for mobile
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  startDrawing(e);
});
canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  draw(e);
});
canvas.addEventListener('touchend', stopDrawing);

// Update brush size display
brushSize.addEventListener('input', () => {
  currentSize = brushSize.value;
  sizeValue.textContent = currentSize;
});

// Update color
colorPicker.addEventListener('input', () => {
  currentColor = colorPicker.value;
});

// Clear canvas
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save as image
saveBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'drawing.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});