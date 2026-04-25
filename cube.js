const COLS     = 8;
const ROWS     = 8;
const H        = 26;   // half cube side
const SPACING  = 74;
const TILT     = 18;   // degrees down from horizontal

// 3 spin-speed bands by column group
const SPIN_RATES = [1.5, 1.0, 0.55];

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  angleMode(DEGREES);
}

function draw() {
  background(0);
  ambientLight(255);

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const x  = (j - (COLS - 1) / 2) * SPACING;
      const y  = (i - (ROWS - 1) / 2) * SPACING;
      const tx = j / (COLS - 1);   // 0→1 left to right
      const ty = i / (ROWS - 1);   // 0→1 top to bottom

      // Diagonal wave phase so cubes don't all face the same way
      const phase = (j - i) * 28;

      // Column group determines spin speed
      const band     = min(floor(j / (COLS / 3)), 2);
      const spinRate = SPIN_RATES[band];

      push();
      translate(x, y, 0);
      rotateX(TILT);
      rotateY(frameCount * spinRate + phase);
      coloredBox(H, tx, ty);
      pop();
    }
  }
}

function coloredBox(h, tx, ty) {
  // Front/back: magenta (left) → cyan (right)
  const fMC = [lerp(255, 0, tx), lerp(0, 215, tx), lerp(200, 255, tx)];

  // Top/bottom: purple (top) → green (bottom)
  const fPG = [lerp(120, 0, ty), lerp(0, 255, ty), lerp(255, 100, ty)];

  // Left/right: orange
  const fO  = [255, 88, 0];

  // Front (z = +h)
  fill(...fMC);
  beginShape();
  vertex(-h, -h, h); vertex(h, -h, h); vertex(h, h, h); vertex(-h, h, h);
  endShape(CLOSE);

  // Back (z = -h)
  beginShape();
  vertex(h, -h, -h); vertex(-h, -h, -h); vertex(-h, h, -h); vertex(h, h, -h);
  endShape(CLOSE);

  // Top (y = -h)
  fill(...fPG);
  beginShape();
  vertex(-h, -h, h); vertex(h, -h, h); vertex(h, -h, -h); vertex(-h, -h, -h);
  endShape(CLOSE);

  // Bottom (y = +h)
  beginShape();
  vertex(-h, h, -h); vertex(h, h, -h); vertex(h, h, h); vertex(-h, h, h);
  endShape(CLOSE);

  // Right (x = +h)
  fill(...fO);
  beginShape();
  vertex(h, -h, h); vertex(h, -h, -h); vertex(h, h, -h); vertex(h, h, h);
  endShape(CLOSE);

  // Left (x = -h)
  beginShape();
  vertex(-h, -h, -h); vertex(-h, -h, h); vertex(-h, h, h); vertex(-h, h, -h);
  endShape(CLOSE);
}
