const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

// Define the circle properties
const circles = [
  { x: 50, y: 50, radius: 30, color: 'red' },
  { x: 50, y: 120, radius: 30, color: 'blue' },
  { x: 50, y: 190, radius: 30, color: 'green' },
  { x: 50, y: 260, radius: 30, color: 'purple' }
];

// Draw the circles and arrows on the canvas
circles.forEach((circle, index) => {
  // Draw the circle
  context.beginPath();
  context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
  context.fillStyle = circle.color;
  context.fill();
  context.closePath();

  // Draw the arrow
  draw_arrow(circle.x + circle.radius + 500, circle.y, circle.x + circle.radius + 600, circle.y);
});

// Add event listeners to each circle
canvas.addEventListener('click', function(event) {
  const mousePos = getMousePos(canvas, event);
  circles.forEach(circle => {
    const distFromCenter = Math.sqrt(
      Math.pow(mousePos.x - circle.x, 2) +
      Math.pow(mousePos.y - circle.y, 2)
    );
    if (distFromCenter <= circle.radius) {
      console.log(`Clicked on circle with color ${circle.color}`);
    }
  });
});

 
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
    context.moveTo(x0, y0);
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
  
function getMousePos(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}
