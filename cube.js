const COLS    = 8;
const ROWS    = 8;
const H       = 26;
const SPACING = 74;
const DEPTH   = 380;   // controls how aggressively cubes lean toward mouse

const STIFFNESS = 0.06;
const DAMPING   = 0.80;

let smx = 0;   // smoothed mouse in WEBGL coords (origin = canvas centre)
let smy = 0;
let vx  = 0;
let vy  = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  angleMode(DEGREES);
}

function draw() {
  background(0);
  ambientLight(255);

  // Spring-smooth the mouse; settle to centre when outside canvas
  const inside = mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
  const tx = inside ? mouseX - width  / 2 : 0;
  const ty = inside ? mouseY - height / 2 : 0;

  vx  += (tx - smx) * STIFFNESS;
  vy  += (ty - smy) * STIFFNESS;
  vx  *= DAMPING;
  vy  *= DAMPING;
  smx += vx;
  smy += vy;

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const x  = (j - (COLS - 1) / 2) * SPACING;
      const y  = (i - (ROWS - 1) / 2) * SPACING;
      const tx = j / (COLS - 1);
      const ty = i / (ROWS - 1);

      // Each cube independently faces the mouse
      const rY =      atan2(smx - x,  DEPTH);
      const rX = 20 + atan2(y   - smy, DEPTH);

      push();
      translate(x, y, 0);
      rotateX(rX);
      rotateY(rY);
      coloredBox(H, tx, ty);
      pop();
    }
  }
}

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
