import p5 from "p5";
import style from "../css/style.css";
import { Pane } from 'tweakpane';

//=========================== 2D NOISE ===============================

// const params = {
//  noiseFreq: 0, // === OFFF
// };




const init = (p) =>{          //========================INITIALIZATION
  
  let hue;
  let sat;
  let bri;
  let alp;
  let inc;
  let xoff;
  let xoff2;
  let nx;
  let ny;
  let x;
  let y;
  let h;
  let sX;
  let sY;
  let sW;
  let rX; //random control;
  let rectX;
  let rectY;
  let xpos;
  let ypos;


  p.setup = function setup() {//========================SETUP FUNCTION

    p.createCanvas(600, 600);


    inc = 0.1;
    xoff = 0.01;
    xoff2 = 12.42;
    
    
    alp = 360;

    x = p.width/2;
    y = p.height/2;
    xpos = x;
    ypos = y;
    h = 50;
    sW = 4;
    rectX = 7;
    rectY = 15;
    rX = [0,1,2,3,4,5,6,7];
    p.colorMode(p.HSB, p.width);
    p.background(0,0,p.width);




   } //===END OF SETUP



  p.draw = function draw() {//============================DRAW FUNCTION


    
    nx = p.noise(xoff);
    ny = p.noise(xoff2);
    

    x = p.map(nx, 0, 1, -1, 1);
    y = p.map(ny, 0, 1, -1, 1);

    let k = Math.sign(x);
    let j = Math.sign(y);
    //console.log(k, xoff);
   
    
    
    for (var i = 0; i < 100; i++) {

   
    switch(k) {
      case 0:
      case 1:
        xpos += 1
        break;

      case -0:
      case -1:
        xpos -= 1;
        break;
      default:
        // code block
    }

     switch(j) {
      case 0:
      case 1:
        ypos += 1
        break;

      case -0:
      case -1:
        ypos -= 1;
        break;
      default:
        // code block
    }
      
    hue = p.map(p.noise(xoff2), 0, 1, 0, 600);
    sat = p.map(p.noise(xoff), 0, 1, 0, 600);
    bri = p.map(p.noise(xoff), 0, 1, 0, 600);

    p.fill(hue, sat, bri, alp);
    //strokeWeight(sW);
    p.noStroke();
   
    p.rect(xpos,ypos,rectX,rectY);
    

    // if (hue % 360 === 0){
    //   hue = 0;
    //   bri += 10;
    //   if (bri % 100 === 0){
    //     bri = 0;
    //     sat += 10;

    //   };
     

    // };

    
    


    console.log("hue: " + hue,
      // "sat: "+ sat ,
      // "bri: "+ bri,
      // "alp: "+ alp,
      "xpos: "+ xpos,
      );

  }

    //hue += 1;
    xoff += inc;
    xoff2 += inc;

   } //===END OF DRAW





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

