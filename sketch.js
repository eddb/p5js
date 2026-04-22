function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  stroke(0);
  strokeWeight(1);
  fill(255);
  angleMode(DEGREES);
}

function draw() {
  background(255);

  const rows = 18;
  const cols = 18;

  const marginX = 20;
  const marginY = 20;
  const spacingX = (width - 2 * marginX) / (cols - 1);
  const spacingY = (height - 2 * marginY) / (rows - 1);

  const squareSize = 20;

  // Bulge origin follows the mouse; falls back to center when outside canvas
  const cx = mouseX > 0 && mouseX < width ? mouseX : width / 2;
  const cy = mouseY > 0 && mouseY < height ? mouseY : height / 2;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = marginX + j * spacingX;
      const y = marginY + i * spacingY;

      const distFromCenter = dist(x, y, cx, cy);
      const maxDist = dist(marginX, marginY, width / 2, height / 2);
      const rotationAngle = map(distFromCenter, 0, maxDist, 100, 0);

      push();
      translate(x, y);
      rotate(rotationAngle);
      rect(0, 0, squareSize, squareSize);
      pop();
    }
  }
}
