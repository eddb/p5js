const CMYK = [
  { r: 0,   g: 255, b: 255, offset: 0,  stiffness: 0.10 },  // Cyan   — fastest
  { r: 255, g: 0,   b: 255, offset: 5,  stiffness: 0.07 },  // Magenta
  { r: 255, g: 255, b: 0,   offset: 10, stiffness: 0.04 },  // Yellow
  { r: 0,   g: 0,   b: 0,   offset: 15, stiffness: 0.02 },  // Key    — slowest
];

const DAMPING = 0.82;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  noFill();
  strokeWeight(2);
  angleMode(DEGREES);

  for (const layer of CMYK) {
    layer.cx   = width  / 2;
    layer.cy   = height / 2;
    layer.velX = 0;
    layer.velY = 0;
  }
}

function draw() {
  const insideCanvas = mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
  const targetX = insideCanvas ? mouseX : width  / 2;
  const targetY = insideCanvas ? mouseY : height / 2;

  for (const layer of CMYK) {
    layer.velX += (targetX - layer.cx) * layer.stiffness;
    layer.velY += (targetY - layer.cy) * layer.stiffness;
    layer.velX *= DAMPING;
    layer.velY *= DAMPING;
    layer.cx   += layer.velX;
    layer.cy   += layer.velY;
  }

  background(255);
  blendMode(MULTIPLY);

  const rows = 10;
  const cols = 10;
  const marginX    = 40;
  const marginY    = 40;
  const spacingX   = (width  - 2 * marginX) / (cols - 1);
  const spacingY   = (height - 2 * marginY) / (rows - 1);
  const squareSize = 40;
  const maxDist    = dist(marginX, marginY, width / 2, height / 2);

  for (const layer of CMYK) {
    stroke(layer.r, layer.g, layer.b);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = marginX + j * spacingX;
        const y = marginY + i * spacingY;
        const angle = map(dist(x, y, layer.cx, layer.cy), 0, maxDist, 100, 0) + layer.offset;

        push();
        translate(x, y);
        rotate(angle);
        rect(0, 0, squareSize, squareSize);
        pop();
      }
    }
  }

  blendMode(BLEND);
}
