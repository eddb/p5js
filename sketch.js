const CMYK = [
  { r: 0,   g: 255, b: 255, offset: 0  },  // Cyan
  { r: 255, g: 0,   b: 255, offset: 5  },  // Magenta
  { r: 255, g: 255, b: 0,   offset: 10 },  // Yellow
  { r: 0,   g: 0,   b: 0,   offset: 15 },  // Key (Black)
];

let cx, cy;
let velX = 0, velY = 0;

const STIFFNESS = 0.04;
const DAMPING   = 0.82;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  noStroke();
  angleMode(DEGREES);
  cx = width  / 2;
  cy = height / 2;
}

function draw() {
  // Spring physics — target is mouse when inside canvas, else canvas center
  const insideCanvas = mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
  const targetX = insideCanvas ? mouseX : width  / 2;
  const targetY = insideCanvas ? mouseY : height / 2;

  velX += (targetX - cx) * STIFFNESS;
  velY += (targetY - cy) * STIFFNESS;
  velX *= DAMPING;
  velY *= DAMPING;
  cx += velX;
  cy += velY;

  background(255);
  blendMode(MULTIPLY);

  const rows = 10;
  const cols = 10;
  const marginX  = 40;
  const marginY  = 40;
  const spacingX = (width  - 2 * marginX) / (cols - 1);
  const spacingY = (height - 2 * marginY) / (rows - 1);
  const squareSize = 40;
  const maxDist  = dist(marginX, marginY, width / 2, height / 2);

  for (const layer of CMYK) {
    fill(layer.r, layer.g, layer.b);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = marginX + j * spacingX;
        const y = marginY + i * spacingY;
        const angle = map(dist(x, y, cx, cy), 0, maxDist, 100, 0) + layer.offset;

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
