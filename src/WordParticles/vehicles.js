import p5 from 'p5'

export default function Vehicle(
  p, 
  x, 
  y, 
  pixelSize, 
  borderSize, 
  maxSpeed, 
  maxforce, 
  arriveParameter, 
  fleeParameter
  ) {
  this.pos = p.createVector(p.random(p.width), p.random(p.height));
  this.target = p.createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = p.createVector();
  this.size = pixelSize;
  this.r = borderSize;
  this.maxspeed = maxSpeed;
  this.maxforce = maxforce;
  this.arriveParameter = arriveParameter;
  this.fleeParameter = fleeParameter;
}

Vehicle.prototype.behaviors = function(
  p, 
  arriveMouseDistance, 
  fleeMouseDistance, 
  timeToOriginalFormat, 
  shake
  ) {
  let arrive = this.arrive(p, this.target, arriveMouseDistance, timeToOriginalFormat, shake);
  let mouse = p.createVector(p.mouseX, p.mouseY)
  let flee = this.flee(p, mouse, fleeMouseDistance)

  arrive.mult(this.arriveParameter);
  flee.mult(this.fleeParameter);

  this.applyForce(arrive);
  this.applyForce(flee)
}

Vehicle.prototype.applyForce= function(f) {
  this.acc.add(f);
}

Vehicle.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Vehicle.prototype.show = function(
  p, 
  color, 
  borderColor, 
  nx, 
  ny
  ) {  
  p.fill(color);
  p.stroke(borderColor);
  p.strokeWeight(this.r);
  // ---EXPLOSION---
  // pt.x += p.noise(i * 10.1 + p.frameCount * 0.01) * 2 - 1.0;
  // pt.y += p.noise(i * 10.2 + p.frameCount * 0.01) * 2 - 1.0;
  p.ellipse(this.pos.x + nx, this.pos.y + ny, this.size);
}

Vehicle.prototype.arrive = function(
  p, 
  target, 
  arriveMouseDistance, 
  timeToOriginalFormat, 
  shake
  ) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if(d < arriveMouseDistance) {
    speed = p.map(d, 0, timeToOriginalFormat, shake, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Vehicle.prototype.flee = function(p, target, fleeMouseDistance) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < fleeMouseDistance) {
    desired.setMag(this.maxspeed);
    desired.mult(-1)
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return p.createVector(0, 0)
  }
}