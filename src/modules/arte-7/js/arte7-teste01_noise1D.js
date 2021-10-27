import p5 from "p5";
import style from "../css/style.css";
import { Pane } from 'tweakpane';


const params = {
 noiseFreq: 0.01, // === OFFF
};




const init = (p) =>{          //========================INITIALIZATION
  var inc = 0.01 ;
  var start = 0;
  // var xoff1 = 0;
  // var xoff2 = 1000; 

  p.setup = function setup() {//========================SETUP FUNCTION

    p.createCanvas(400, 400);




   } //===END OF SETUP



  p.draw = function draw() {//============================DRAW FUNCTION
 
    p.background(51);
    p.stroke(255);
    p.noFill();
    p.beginShape();

    var xoff = start; 

    for (var x = 0; x < p.width; x++) {
      
      p.stroke(255);
      // var y = p.random(p.height);
      var y = p.noise(xoff) * p.height;
      p.vertex(x, y);

      xoff += inc;


    }
    p.endShape();
    start += inc;


    //p.noLoop();



    //var x = p.random(p.width);
    // var x = p.map(p.noise(xoff1), 0, 1, 0, p.width);
    // var y = p.map(p.noise(xoff2), 0, 1, 0, p.height);


    // xoff1 += 0.02;
    // xoff2 += 0.02;


    // p.ellipse(x, y, 24, 24);

   } //===END OF DRAW

 }; //===END OF INIT


const createPane = () =>{
  const pane = new Pane();
  let folder;


  folder = pane.addFolder({title: 'noise'});
    folder.addInput(params, 'noiseFreq', {min: 0, max: 1, step: 0.01});
    
};



new p5 (init,document.getElementById("p5")); //== RUN >

createPane();