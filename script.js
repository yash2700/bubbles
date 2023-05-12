const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

// Define the properties for each circle and arrow
const circleAndArrow = [  { x: 100, y: 100, radius: 30, color: 'red' },  { x: 100, y: 200, radius: 30, color: 'blue' },  { x: 100, y: 300, radius: 30, color: 'green' },  { x: 100, y: 400, radius: 30, color: 'purple' },];

// Define the arrow properties
const arrow = {
  width: 8,
  head_len: 16,
  head_angle: Math.PI / 6,
};

// Store the state of moved circles
let moved = [];

// Draw the circles and arrows
function drawCirclesAndArrows() {
  for (let i = 0; i < circleAndArrow.length; i++) {
    const circle = circleAndArrow[i];

    // Draw the circle
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    context.fillStyle = circle.color;
    context.fill();
    context.closePath();

    // Check if the circle has been moved before
    if (!moved.includes(circle.color)) {
      // Define the arrow properties based on the circle position
      const arrowX0 = circle.x + circle.radius+500;
      const arrowY0 = circle.y;
      const arrowX1 = arrowX0 ;
      const arrowY1 = arrowY0;

      // Draw the arrow
      draw_arrow(
        arrowX0,
        arrowY0,
        arrowX1,
        arrowY1,
        arrow.width,
        arrow.head_len,
        arrow.head_angle
      );
    }
  }
}

drawCirclesAndArrows();

// Add event listener to canvas
canvas.addEventListener('click', handleClick);

// Handle click event on circle
let animationFrame;

function handleClick(event) {
  const mouseX = event.clientX - canvas.offsetLeft;
  const mouseY = event.clientY - canvas.offsetTop;

  // Check which circle was clicked
  for (let i = 0; i < circleAndArrow.length; i++) {
    const circle = circleAndArrow[i];

    // Check if click is inside the circle
    if (Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2) <= circle.radius) {
      animateArrow(circle);
      break;
    }
  }
}

function animateArrow(circle) {
    if (!moved.includes(circle.color)) {
      moved.push(circle.color);
  
      const frames = 60;
      const distance = 0; // distance to move the arrow to the left
      const startX = 500
      console.log(startX);  // updated start point
      const endX = circle.x + 55; // updated end point
      const diffX = endX - startX;
      const startY = circle.y;
      const endY = circle.y;
      const diffY = endY - startY;
  
      let currentFrame = 0;

      function animate() {
        context.clearRect(circle.radius, startY - circle.radius - arrow.width, 1000, 2 * (circle.radius + arrow.width));
        drawCircle(circle);
        
        const x = startX + (diffX / frames) * currentFrame;
        const y = startY + (diffY / frames) * currentFrame;
        draw_arrow(x, y, x + distance, y, arrow.width+100, arrow.head_len, arrow.head_angle);
  
        currentFrame++;
        if(currentFrame>=58){
            context.fillStyle="gray";
            circle.color="gray"
            cancelAnimationFrame(animationFrame);
         } 
        if (currentFrame <= frames) {
          animationFrame = requestAnimationFrame(animate);
        }  
        //   
        // }
       
      }
  
      animate();
    }
  }
  
  function drawCircle(circle) {
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    context.fillStyle = circle.color;
    context.fill();
    context.closePath();
  }
  
  function draw_arrow(x0, y0, x1, y1, width, head_len, head_angle) {
    // Save the context
    var width = 8;
    var head_len = 16;
    var head_angle = Math.PI / 6; // angle of arrowhead
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
    // Restore the context
    context.restore();
  }
  
  drawCirclesAndArrows();
  canvas.addEventListener('click', handleClick);
