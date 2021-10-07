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


    context.fillStyle = 'black';
    context.fillRect(50,50,50,50);
    context.fill();

  };
};

canvasSketch(sketch, settings);
