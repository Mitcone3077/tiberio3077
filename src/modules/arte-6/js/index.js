import canvasSketch from "canvas-sketch";
import { random, math, color } from "canvas-sketch-util";
import { Pane } from 'tweakpane';
import style from "../css/style.css";


const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true

};

const params = {
 scaleMin: 1,
 scaleMax: 2,
 freq: 0.001,
 amp: 0.2,
 animate: true,
 frame: 0,
 lineCap: 'butt',
};


let manager;
let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif';




const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');




const sketch = ({ context, width, height, frame }) => {

  const cell = 10;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

 

  typeCanvas.width = cols;
  typeCanvas.height = rows;




  return ({ context, width, height, frame }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols;

    typeContext.fillStyle = 'white';

    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = 'top';



    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;


    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;


    typeContext.save();
    typeContext.translate(tx, ty);
    

    typeContext.fillText(text, 0, 0);
    typeContext.restore();


    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.drawImage(typeCanvas, 0, 0);


    let cellw = cell;
    let cellh = cell;



    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      //context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.strokeStyle = `rgb(${r}, ${g}, ${b})`;

      const f = params.animate ? frame : params.frame;

      const n = random.noise3D(x, y, f * 10, params.freq);

      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);
      
    
      const angle = n * Math.PI * params.amp;
      const arcFull = math.mapRange(-n, -1, 1, 0, 2);

     cellw = scale;
     cellh = scale;
      

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);
      //context.rotate(angle);

      //context.lineWidth = scale;
      //context.lineCap = params.lineCap;
      //context.fillRect(0, 0, cell, cell);
      context.beginPath();
      context.ellipse(0, 0 , cellw , cellh, angle * 10, Math.PI * arcFull, 2 * Math.PI);
      //context.arc(0, 0, cell * n-1, 0,Math.PI * 2);
      //context.fill();
      context.stroke();


      context.restore();
    

    }
  };
};



const createPane = () =>{
  const pane = new Pane();
  let folder;


  folder = pane.addFolder({title: 'Grid'});
    folder.addInput(params, 'lineCap', {options: {butt: 'butt', round: 'round', square: 'square'}});
    folder.addInput(params, 'scaleMin', {min: 0.1, max: 7, step: 0.1});
    folder.addInput(params, 'scaleMax', {min: 0.1, max: 7, step: 0.1});


folder = pane.addFolder({title: 'noise'});
  folder.addInput(params, 'freq', {min: -0.01, max: 0.01});
  folder.addInput(params, 'amp', {min: 0, max: 1});
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frame', {min: 0, max: 999});


};



const onKeyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render();

};

document.addEventListener('keyup', onKeyUp);

//const start = async () =>{
  /*manager = await*/ canvasSketch(sketch, settings);
//};

createPane();
//start();

