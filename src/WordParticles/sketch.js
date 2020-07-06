import AvenirNextLTPro from './AvenirNextLTPro-Demi.otf'

import Vehicle from './vehicles'

export default function sketch(p){
  let font;
  var vehicles = [];

  p.preload  =() => {
     font = p.loadFont(AvenirNextLTPro)    
  }

  let points;
  let bounds;
  p.setup = (
      width= 500, 
      height= 500, 
      backgroundColor= '#ffffff',
      text= 'Cactus',
      left= 100, 
      top= 300, 
      fontSize= 120,
      pixelSize= 4,
      borderSize=1,
      pixelDensity= 0.1,
      maxSpeed= 10,
      maxForce = 1,
      arrive= 1,
      flee= 5, 
    ) => {
    p.createCanvas(width, height);
    p.background(backgroundColor);

    points = font.textToPoints(text, left, top, fontSize, {
      sampleFactor: pixelDensity,
      simplifyThreshold:0,
    });

    for (var i = 0; i < points.length; i++) {
      var pt = points[i];
      var vehicle = new Vehicle(
        p, 
        pt.x, 
        pt.y, 
        pixelSize, 
        borderSize, 
        maxSpeed, 
        maxForce, 
        arrive, 
        flee)
      vehicles.push(vehicle)
    }
  }

  p.draw = (
    backgroundColor= '#ffffff', 
    color='#cccccc', 
    borderColor= '#000000', 
    arriveMouseDistance= 100, 
    fleeMouseDistance= 50,
    timeToOriginalFormat= 100,
    shake= 0
    ) => {
    p.background(backgroundColor);

    for (let i = 0; i < vehicles.length; i++){
      let v = vehicles[i]

      let nx = p.noise(i * 10.1 + p.frameCount * 0.01) * 10 - 5.0;
      let ny = p.noise(i * 10.2 + p.frameCount * 0.01) * 10 - 5.0;

      v.behaviors(p, arriveMouseDistance, fleeMouseDistance, timeToOriginalFormat, shake);
      v.update();
      v.show(p, color,borderColor, nx, ny);
    }
    
    // for(let i = 0; i < points.length; i++){
    //   let pt = points[i];
      
    //   let nx = p.noise(i * 10.1 + p.frameCount * 0.01) * 10 - 5.0;
    //   let ny = p.noise(i * 10.2 + p.frameCount * 0.01) * 10 - 5.0;
      
    //   // ---EXPLOSION---
    //   // pt.x += p.noise(i * 10.1 + p.frameCount * 0.01) * 2 - 1.0;
    //   // pt.y += p.noise(i * 10.2 + p.frameCount * 0.01) * 2 - 1.0;
      
    //   p.ellipse(pt.x + nx, pt.y + ny, 3);
    // }

  }
}