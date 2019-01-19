let default_str = "sample text thing";
let default_col;

let psystem;

function getX(len, i) {
  i = floor(i / 4);
  return i % width;
}

function getY(len, i) {
  i = floor(i / 4);
  return floor(i / width);
}

function getPos(len, i) {
  return createVector(getX(len, i), getY(len, i));
}

function init(str) {
  psystem = new ParticleSystem();

  background(0);

  textAlign(CENTER, CENTER);
  textSize(48);
  fill(255);
  text(str, width / 2, height / 2);

  default_col = color(0);

  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let cur_pos = getPos(pixels.length, i);
    let cur_col = get(cur_pos.x, cur_pos.y);
    if (default_col.levels.toString() !== cur_col.toString()) {
      psystem.addParticle(cur_pos, cur_col);
    }
  }
  updatePixels();
}

function setup() {
  createCanvas(800, 400);
  init(default_str);
}

function draw() {
  background(0);
  psystem.update();
  psystem.render();
}
