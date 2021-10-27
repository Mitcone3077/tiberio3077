import canvasSketch from "canvas-sketch";
import { random, math, color } from "canvas-sketch-util";
//import { Pane } from 'tweakpane';
import style from "../css/style.css";


const settings = {
  dimensions: [ 1080, 1080 ]
};




const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


  };
};

canvasSketch(sketch, settings);





/* ===================== TO REFACTOR  =================





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

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB,255);
  points = [];
  background(51);
  
  
  
  
  
  reset();
}

function reset() {
  for (let i = 0; i < n; i++) {
    // let v = createVector(random(width), random(height));
    let angle = i * TWO_PI / m;
    let v = p5.Vector.fromAngle(angle);
    v.mult(width / 8);
    v.add(width / 2, height / 2);
    points.push(v);
  }
  
  current = createVector(random(width), random(height));
  
  stroke(255,0,0,255);
  strokeWeight(10);
  for (let p of points) {
    point(p.x, p.y);
  }


}

function draw() {

  if (frameCount % 200 == 0) {
    m += 1;
    percent = 0;
    rColor += 20;
    reset();
  }

  for (let i = 0; i < 10000; i++) {
    strokeWeight(0.3);
    stroke(rColor,gColor,bColor,5);
    let next = random(points);
    if (next !== previous) {
      current.x = lerp(current.x, next.x, percent);
      current.y = lerp(current.y, next.y, percent);
      point(current.x, current.y);
      percent+= 0.000001;
    }
    
    previous = next;
  }



}







================================= End of Code ====================================*/
