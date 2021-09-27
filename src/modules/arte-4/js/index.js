import canvasSketch from "canvas-sketch";
import { random, math, color } from "canvas-sketch-util";
//import Tweakpane from "tweakpane";
//const Tweakpane = require("tweakpane");
//import style from "../css/style.css";


const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  
    const cols = 20;
    const rows = 20;
    const numCells = cols * rows;

    


    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margX = (width - gridw) * 0.5;
    const margY = (height - gridh) * 0.5;


    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;
     

      const n = random.noise2D(x + frame * 10, y, 0.001); // noise2D(x, y, frequency = 1)
      const angle = n * Math.PI * 0.2;
      //const scale = (n + 1) / 2 * 30; //converting a -1~1 random to 0~1;
      const scale = math.mapRange(n, -1, 1, 1, 30);
      //const arcFull = math.mapRange(-n, -1, 1, 0, 2);; // * Math.PI



      context.save();
      context.translate(x, y);
      context.translate(margX, margY);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);
      //context.fillStyle = math.mapRange(scale, 0, 6.2, 0, 150)

      context.lineWidth = scale;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      //context.ellipse(x * 0.0001 , y * 0.0001, w * 0.58 , h * 0.6, angle * 10, Math.PI * arcFull, 2 * Math.PI);
      //context.fill();
      context.stroke();
      context.restore();

    }



  };
};
/*
const createPane = () =>{
  const pane = new Tweakpane.Pane();
  let folder;


  folder = pane.addFolder({title: 'Grid'});


};


createPane();
*/
canvasSketch(sketch, settings);
