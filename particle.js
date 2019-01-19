class Particle {

  constructor(pos, col) {
    this.xrange = 100;
    this.yrange = 100;
    this.drag = random(0.0001, 0.004);
    this.threshold = 0.5;
    this.acc_mult = random(1, 5);

    this.init_pos = pos;
    this.curr_pos = createVector(random(- this.xrange * width, this.xrange * width), random(- this.yrange * height, this.yrange * height));
    this.delta_pos = createVector(this.curr_pos.x - this.init_pos.x, this.curr_pos.y - this.init_pos.y);

    this.col = col;
    
    this.vel = p5.Vector.random2D(); //createVector(this.curr_pos.x - this.init_pos.x, this.curr_pos.y - this.init_pos.y);

    this.acc = createVector(0, 0);
  }

  update() {
    // stop if we got to a point where, ye know, we initially started at
    if (Math.abs(this.delta_pos.x) <= this.threshold && Math.abs(this.delta_pos.y) <= this.threshold) {
      return;
    }

    // acc will be the delta * some drag + some random stuff to make it, YES, MORE RANDOM!
    this.acc = this.delta_pos;
    this.acc.mult(-this.drag);
    this.acc.add(p5.Vector.random2D().mult(this.acc_mult));

    this.vel.add(this.acc);
    this.vel.mult(0.85);

    this.curr_pos.add(this.vel);

    this.delta_pos = createVector(this.curr_pos.x - this.init_pos.x, this.curr_pos.y - this.init_pos.y);
    
    this.acc_mult *= 0.9925;
  }

  show() {
    stroke(this.col);
    point(this.curr_pos.x, this.curr_pos.y);
  }

}

class ParticleSystem {

  constructor() {
    this.particles = [];  
  }

  addParticle(pos, col) {
    this.particles.push(new Particle(pos, col));
  }
  
  update() {
    for (let p of this.particles) {
      p.update();
     }    
  }
  
  render() {
    for (let p of this.particles) {
     p.show();
    }
  }
  
}