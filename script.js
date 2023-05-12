const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

// Define the circle properties
const circle = { x: 100, y: 100, radius: 50, color: 'red' };

// Define the arrow properties
const arrow = {
  x0: circle.x + circle.radius+500,
  y0: circle.y,
  x1: circle.x + circle.radius + 500,
  y1: circle.y,
  width: 8,
  head_len: 16,
  head_angle: Math.PI / 6,
  angle: Math.atan2(circle.y - circle.y, circle.x + circle.radius - circle.x),
};

// Draw the circle
context.beginPath();
context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
context.fillStyle = circle.color;
context.fill();
context.closePath();

// Draw the arrow
draw_arrow(arrow.x0, arrow.y0, arrow.x1, arrow.y1, arrow.width, arrow.head_len, arrow.head_angle, arrow.angle);

// Add event listener to canvas
canvas.addEventListener('click', handleClick);

// Handle click event on circle
function handleClick(event) {
  const mouseX = event.clientX - canvas.offsetLeft;
  const mouseY = event.clientY - canvas.offsetTop;

  // Check if click is inside the circle
  if (Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2) <= circle.radius) {
    animateArrow();
  }
}

// Animate arrow moving towards circle
function animateArrow() {
  const frames = 60;
  const distance = 0;
  const startX = arrow.x0;
  const endX = circle.x+30 + circle.radius - arrow.head_len;
  const diffX = endX - startX;
  const startY = arrow.y0;
  const endY = circle.y;
  const diffY = endY - startY;

  let currentFrame = 0;

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    console.log(currentFrame);

    // Draw circle
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    if (currentFrame < frames) {
      context.fillStyle = circle.color;
    } if(currentFrame>=59){
        console.log(currentFrame);
      context.fillStyle = "gray"; // change circle color to gray
    }
    context.fill();
    context.closePath();

    // Draw arrow
    const x = startX + (diffX / frames) * currentFrame;
    const y = startY + (diffY / frames) * currentFrame;
    draw_arrow(x, y, x + distance, y, arrow.width, arrow.head_len, arrow.head_angle, arrow.angle);

    currentFrame++;

    if (currentFrame < frames) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}


function draw_arrow(x0, y0, x1, y1) {
  const width = 8;
  const head_len = 16;
  const head_angle = Math.PI / 6; // angle of arrowhead
  const angle = Math.atan2(y1 - y0, x1 - x0);
  const vertical_angle = Math.atan2(1, 0);

  context.lineWidth = width;

  // Adjust the point
  x0 -= head_len * Math.cos(angle);
  y0 -= head_len * Math.sin(angle);

  context.beginPath();
  context.moveTo(x0+100, y0);
  context.lineTo(x1, y1);
  context.stroke();

  context.beginPath();
  context.lineTo(x0, y0);
  context.lineTo(x0 + head_len * Math.cos(angle - head_angle), y0 + head_len * Math.sin(angle - head_angle)); // rotate head_angle clockwise to make arrow point left
  context.lineTo(x0 + head_len * Math.cos(angle + head_angle), y0 + head_len * Math.sin(angle + head_angle)); // rotate head_angle clockwise to make arrow point left
  context.closePath();
  context.fillStyle = "black";
  context.stroke();
  context.fill();
}
