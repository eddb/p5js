const CMYK = [
  { r: 0,   g: 255, b: 255, offset: 0  },  // Cyan
  { r: 255, g: 0,   b: 255, offset: 5  },  // Magenta
  { r: 255, g: 255, b: 0,   offset: 10 },  // Yellow
  { r: 0,   g: 0,   b: 0,   offset: 15 },  // Key (Black)
];

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  noStroke();
  angleMode(DEGREES);
}

function draw() {
  background(255);
  blendMode(MULTIPLY);

  const rows = 18;
  const cols = 18;

  const marginX = 20;
  const marginY = 20;
  const spacingX = (width - 2 * marginX) / (cols - 1);
  const spacingY = (height - 2 * marginY) / (rows - 1);
  const squareSize = 20;

  const cx = mouseX > 0 && mouseX < width ? mouseX : width / 2;
  const cy = mouseY > 0 && mouseY < height ? mouseY : height / 2;
  const maxDist = dist(marginX, marginY, width / 2, height / 2);

  for (const layer of CMYK) {
    fill(layer.r, layer.g, layer.b);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = marginX + j * spacingX;
        const y = marginY + i * spacingY;

        const rotationAngle = map(dist(x, y, cx, cy), 0, maxDist, 100, 0) + layer.offset;

        push();
        translate(x, y);
        rotate(rotationAngle);
        rect(0, 0, squareSize, squareSize);
        pop();
      }
    }
  }

  blendMode(BLEND);
}
