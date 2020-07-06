import file from './v-dots.txt'

import Vehicle from './vehicles'

export default function sketch(p){
  var vehicles = [];
  var canvas;
  var points = [];
  var ow,oh;

  function Point(x,y) {
    this.x = x;
    this.y = y;
  }

  p.setup = (
    width= 135, 
    height= 280, 
    backgroundColor= '#0d0d0d',
    pixelSize= 2.5,
    borderSize=0,
    maxSpeed= 15,
    maxForce = 1.5,
    arrive= 2,
    flee= 2.5, 
  ) => {
    fetch(file)
    .then((r) => r.text())
    .then(text  => {
      ow = width;//ow = $("#sketch-wrapper").width();
      oh = height;//oh = $("#sketch-wrapper").height();
      var datarows = text.split("\n");
      for (var i = 0; i < datarows.length; i++) {
        var datapaddings = datarows[i].split(".");
        for (var j = 0; j < datapaddings.length; j++) {
            var paddingleft = datapaddings[j];
            paddingleft = ow/7 + (paddingleft*3) + (j*3);
            var paddingtop = ow/6 + (i*5);
            var p = new Point(paddingleft,paddingtop);
            points.push(p);
        }
    }
    }).then(()=>{
      canvas = p.createCanvas(ow, oh)
      p.background(backgroundColor);
      // canvas.parent('sketch-holder');

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
          flee
          );
        vehicles.push(vehicle);
    }
    })
  }

  p.draw = (
    backgroundColor= '#0d0d0d', 
    color='#408033', 
    borderColor= '#000000', 
    arriveMouseDistance= 100, 
    fleeMouseDistance= 50,
    timeToOriginalFormat= 100,
    shake= 0
  ) => {
    p.background(backgroundColor);
    for (var i = 0; i < vehicles.length; i++){
      var v = vehicles[i]

      // let nx = 0
      // let ny = 0
      let nx = p.noise(i * 10.1 + p.frameCount * 0.01) * 10 - 5.0;
      let ny = p.noise(i * 10.2 + p.frameCount * 0.01) * 10 - 5.0;

      v.behaviors(p, arriveMouseDistance, fleeMouseDistance, timeToOriginalFormat, shake);
      v.update();
      v.show(p, color,borderColor, nx, ny);
    }
  }

//   window.onresize = function() {
//     console.log("resize");
//     var newwidth = (ow - (ow - $("#sketch-wrapper").width())) * 0.9;
//     var newheight = (oh - (oh - $("#sketch-wrapper").height())) * 0.9;
//     p.resizeCanvas(newwidth,newheight);
// };


}