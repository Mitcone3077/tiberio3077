import p5 from "p5";
import style from "../css/style.css";
import { Pane } from 'tweakpane';


// The Chaos Game


let points;
let current;
let percent = 0.5;
let previous;
var n = 8;
var m = 3;
var rColor = 100;
var gCaolor = 100;
var bColor = 100;



const init = (p) =>{          //========================INITIALIZATION
  
  function reset() {
    for (let i = 0; i < n; i++) {
      // let v = createVector(random(width), random(height));
      let angle = i * p.TWO_PI / m;
      let v = p.Vector.fromAngle(angle);
      v.mult(p.width / 8);
      v.add(p.width / 2, p.height / 2);
      points.push(v);
    }
    
    current = p.createVector(p.random(p.width), p.random(p.height));
    
    p.stroke(255,0,0,255);
    p.strokeWeight(10);
    for (let p of points) {
      p.point(p.x, p.y);
    }
  }


  p.setup = function setup() {//========================SETUP FUNCTION

  p.createCanvas(p.windowWidth, p.windowHeight);
  p.colorMode(p.RGB,255);
  points = [];
  p.background(51);

  
  reset();



   } //===END OF SETUP


  


  p.draw = function draw() {//============================DRAW FUNCTION


    if (frameCount % 200 == 0) {
      m += 1;
      percent = 0;
      rColor += 20;
      p.reset();
    }

    for (let i = 0; i < 10000; i++) {
      p.strokeWeight(0.3);
      p.stroke(rColor,gColor,bColor,5);
      let next = p.random(points);
      if (next !== previous) {
        current.x = p.lerp(current.x, next.x, percent);
        current.y = p.lerp(current.y, next.y, percent);
        p.point(current.x, current.y);
        percent+= 0.000001;
      }
      
      previous = next;
    }

   } //===END OF DRAW






 }; //===END OF INIT


new p5 (init,document.getElementById("p5")); //== RUN >




/* ===================== TO REFACTOR  =================







function setup() {
  
}



function draw() {




}







================================= End of Code ====================================*/
