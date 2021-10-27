import p5 from "p5";
import style from "../css/style.css";
import { Pane } from 'tweakpane';

//=========================== 2D NOISE ===============================

// const params = {
//  noiseFreq: 0, // === OFFF
// };

let hue;
let sat;
let bri;
let alp;
let inc;
let inc2;
let xoff;
let xoff2;
let hxoff;
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
let forceX;
let forceY;

let xlmin = -3;
let xlmax = 3;
let ylmin = -3;
let ylmax = 3;



const init = (p) =>{          //========================INITIALIZATION
  


  //let dir[u,ur,r,dr,d,dl,l,ul];


  p.setup = function setup() {//========================SETUP FUNCTION

    p.createCanvas(600, 600);


    inc = 0.04;
    
    hxoff = 0.01;
    xoff = 0.05;
    xoff2 = 14.85;
    
    
  

    x = p.width/2;
    y = p.height/2;
    xpos = x;
    ypos = y;
    h = 50;
    sW = 4;
    rectX = 15;
    rectY = 23;
    rX = [0,1,2,3,4,5,6,7];
    p.colorMode(p.HSB, p.width);
    p.background(0,0,p.width);






   } //===END OF SETUP



  p.draw = function draw() {//============================DRAW FUNCTION


    // if (xpos > p.width){
    //   //console.log("passou!");
    //   xlmin = 0;
    //   xlmax = 2;
    // }else if (xpos < 0) {
    //   xlmin = ;
    //   xlmax = ;
    // }



    nx = p.map(p.noise(xoff,xoff2), 0, 1, xlmin, xlmax);
    ny = p.map(p.noise(xoff2,xoff), 0, 1, ylmin, ylmax);



    let k = p.int(nx);
    let j = p.int(ny);
    console.log(nx, k);
   
    
    
    //for (var i = 0; i < 1000; i++) {

    if (xpos > p.width){
     forceX = 2;
    } 
    else if(xpos < 0){
      forceX = 4;
    }
    else if((xpos > (p.width * 0.3))&&(xpos < (p.width * 0.7))){
      forceX = 0;  
    }



    if (ypos > p.height){
      forceX = 1;
    } 
    else if(ypos < 0){
      forceX = 3;
    }
    else if((ypos > (p.height * 0.3))&&(ypos < (p.height * 0.7))){
      forceX = 0;  
    }

    


    xpos = direction(xpos, k, xlmin, xlmax, forceX);
    ypos = direction(ypos, j, ylmin, ylmax, forceY);


    
      
    hue = p.map(p.noise(hxoff), 0, 1, 0, 600);
    sat = p.map(p.noise(xoff2), 0, 1, 250, 600);
    bri = p.map(p.noise(xoff2), 0, 1, 150, 500);
    alp = p.map(p.noise(xoff2), 0, 1, 0, 12);;

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
       "ypos: "+ ypos,
      );

  //}

    inc2 = inc % 2;
    //hue += 1;
    hxoff += 0.01;
    xoff += inc;
    xoff2 += inc2;

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


// const isOut = (v) =>{
//   ///verificar se esta out e retornar 1 a 4 para direcao 1 = up;; 2= right...
//   return force;

// }




 const direction = (hpos, k, xmin, xmax, force) =>{

  console.log("directoion function");
  //force = 0;

 

  let aPos;
  aPos = hpos;

  let xlenght = xmax - xmin;

  if ((k - xmin) > (xlenght * 0.625)){
    force == 1 || force == 2 ? aPos += 0 : aPos += 1;
    
  }else if ((k - xmin) < (xlenght * 0.375)){
    force == 3 || force == 4 ? aPos -= 0 : aPos -= 1;
  }else{
    aPos += 0;
  }

  return aPos;

 

}








new p5 (init,document.getElementById("p5")); //== RUN >

