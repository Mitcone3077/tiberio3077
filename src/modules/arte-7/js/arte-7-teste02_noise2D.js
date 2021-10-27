import p5 from "p5";
import style from "../css/style.css";
import { Pane } from 'tweakpane';

//=========================== 2D NOISE ===============================

const params = {
 noiseFreq: 0, // === OFFF
};




const init = (p) =>{          //========================INITIALIZATION
  var inc = 0.01;      //params.noiseFreq ;
  //p.noiseDetail(params.noiseFreq);

  p.setup = function setup() {//========================SETUP FUNCTION

    p.createCanvas(500, 500);




   } //===END OF SETUP



  p.draw = function draw() {//============================DRAW FUNCTION
    
    
    var yoff = 0;
    p.loadPixels();


    for (var x = 0; x < p.width; x++) {
      var xoff = 0;                  //<<======== needs to be here!!
      for (var y = 0; y < p.width; y++) {
      
      var index = (x + y * p.width) * 4;        //==== rgbA index 
      //var r = p.random(255);
      var r = p.noise(xoff, yoff) * 255;

      p.pixels[index + 0] = r;
      p.pixels[index + 1] = r;
      p.pixels[index + 2] = r;
      p.pixels[index + 3] = 255;

      xoff += inc;
      
      }


    yoff += inc;
    
    }
   
   p.updatePixels();
   // p.noLoop();
   p.noiseDetail(4, 0.5);



;
   } //===END OF DRAW


// const rd = () =>{


// };


// const createPane = () =>{
//   const pane = new Pane();
//   let folder;


//   folder = pane.addFolder({title: 'noise'});
//     folder.addInput(params, 'noiseFreq', {min: 1, max: 256, step: 4});
//     pane.on('change', (ev) =>{  p.draw(); console.log(inc);})
    
// };



// createPane();

 }; //===END OF INIT







new p5 (init,document.getElementById("p5")); //== RUN >

