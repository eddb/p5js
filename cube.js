const COLS    = 8;
const ROWS    = 8;
const H       = 26;
const SPACING = 74;

const STIFFNESS = 0.06;
const DAMPING   = 0.80;

let rotX = 20;
let rotY = 0;
let velX = 0;
let velY = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  angleMode(DEGREES);
}

function draw() {
  background(0);
  ambientLight(255);

  const inside  = mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
  const targetX = inside ? map(mouseY, 0, height, 38, -8) : 20;
  const targetY = inside ? map(mouseX, 0, width, -45, 45) : 0;

  velX += (targetX - rotX) * STIFFNESS;
  velY += (targetY - rotY) * STIFFNESS;
  velX *= DAMPING;
  velY *= DAMPING;
  rotX += velX;
  rotY += velY;

  rotateX(rotX);
  rotateY(rotY);

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const x  = (j - (COLS - 1) / 2) * SPACING;
      const y  = (i - (ROWS - 1) / 2) * SPACING;
      const tx = j / (COLS - 1);
      const ty = i / (ROWS - 1);

      push();
      translate(x, y, 0);
      coloredBox(H, tx, ty);
      pop();
    }
  }
}

// Cycles through an iridescent hue range, offset in degrees
function iridColor(t, hueOffset) {
  const h = ((t * 300 + hueOffset) % 360 + 360) % 360;
  return hsbToRgb(h, 0.93, 1.0);
}

function coloredBox(h, tx, ty) {
  const t  = tx * 0.55 + ty * 0.45;
  const c0 = iridColor(t, 0);
  const c1 = iridColor(t, 120);
  const c2 = iridColor(t, 240);

  fill(...c0);
  beginShape(); vertex(-h,-h, h); vertex( h,-h, h); vertex( h, h, h); vertex(-h, h, h); endShape(CLOSE);
  beginShape(); vertex( h,-h,-h); vertex(-h,-h,-h); vertex(-h, h,-h); vertex( h, h,-h); endShape(CLOSE);

  fill(...c1);
  beginShape(); vertex(-h,-h, h); vertex( h,-h, h); vertex( h,-h,-h); vertex(-h,-h,-h); endShape(CLOSE);
  beginShape(); vertex(-h, h,-h); vertex( h, h,-h); vertex( h, h, h); vertex(-h, h, h); endShape(CLOSE);

  fill(...c2);
  beginShape(); vertex( h,-h, h); vertex( h,-h,-h); vertex( h, h,-h); vertex( h, h, h); endShape(CLOSE);
  beginShape(); vertex(-h,-h,-h); vertex(-h,-h, h); vertex(-h, h, h); vertex(-h, h,-h); endShape(CLOSE);
}

function hsbToRgb(h, s, b) {
  const c = b * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = b - c;
  let r = 0, g = 0, bl = 0;
  if      (h < 60)  { r = c; g = x;  }
  else if (h < 120) { r = x; g = c;  }
  else if (h < 180) { g = c; bl = x; }
  else if (h < 240) { g = x; bl = c; }
  else if (h < 300) { r = x; bl = c; }
  else              { r = c; bl = x; }
  return [(r + m) * 255, (g + m) * 255, (bl + m) * 255];
}
