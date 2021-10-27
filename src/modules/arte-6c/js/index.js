import canvasSketch from "canvas-sketch";
import { random, math, color } from "canvas-sketch-util";
import style from "../css/style.css";


const settings = {
  dimensions: [ 1920, 1080 ],
  animate: true
};


let manager;
let text = '3077';
let fontSize = 12;
let fontFamily = 'impact';




const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');




const sketch = ({ context, width, height, frame}) => {


//================*******==================******===============


  //const cell = 30;
  const cols = Math.floor(width / 26);
  const rows = Math.floor(height / 26);
  const numCells = cols * rows;
  const ratio = width/height


  const gridw = width * 0.5;
  const gridh = height * 0.5;
  const cellw = gridw / cols;
  const cellh = gridh / rows;
  const margX = width * 0.015;
  const margY = height * 0.015 ;
  



  typeCanvas.width = cols;
  typeCanvas.height = rows;




  return ({ context, width, height, frame}) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols * 0.3;

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




    context.textBaseline = 'middle';
    context.texAlign = 'center';

    



//================*******==================******===============

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.drawImage(typeCanvas, 0, 0);



    






    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);


      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;


      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];
     

  


  
    //if (Math.random() < 0.1) context.font = `${cell * 8}px ${fontFamily}`;

    // random.noise3D(x, y, f * 10, params.freq);


      //let n = random.noise2D(x + frame * 10, y, 0.001); // noise2D(x, y, frequency = 1)
      const n = random.noise3D(x, y, frame * 10, 0.0018);


      const angle = n * Math.PI * 0.2;
    //const scale = (n + 1) / 2 * 30; //converting a -1~1 random to 0~1;
      const scale = math.mapRange(n, -1, 1, 1, 5);
      const arcFull = math.mapRange(-n, -1, 1, 2, 4);; // * Math.PI




      context.lineWidth = scale;
    //context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.strokeStyle = `rgb(${r}, ${g}, ${b})`;


      context.save();
      context.translate(x, y);
      context.translate(margX, margY);
      context.translate(cellw * 0.5 , cellh * 0.5 );

      

    //context.fillRect(0, 0, cell, cell);
      context.beginPath();
    //context.fillText(text, 0, 0,);
      context.ellipse(x  , y  , w , h , angle * 10, Math.PI * arcFull, 2 * Math.PI);
    //context.ellipse(x * 0.0001  y * 0.0001, w * 0.58 , h * 0.6, angle * 10, Math.PI * arcFull, 2 * Math.PI);


    //context.fillText(text, 0, 0);
    //context.fill();
      context.stroke();


      context.restore();

    



    } //END FOR-LOOP



  };
};


const getGlyph = (v) => {

  //if (v < 50) return '';
  //if (v < 100) return '.';
  //if (v < 150) return '-';
  //if (v < 200) return '+';


  //const glyphs = '_= /'.split('');



};


const onKeyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render();

};

document.addEventListener('keyup', onKeyUp);

//const start = async () =>{
  /*manager = await*/ canvasSketch(sketch, settings);
//};

//start();



/*


context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  

      let n = random.noise2D(x + frame * 10, y, 0.001); // noise2D(x, y, frequency = 1)

      const angle = n * Math.PI * 0.2;
      //const scale = (n + 1) / 2 * 30; //converting a -1~1 random to 0~1;
      const scale = math.mapRange(n, -1, 1, 0, 4);
      const arcFull = math.mapRange(-n, -1, 1, 0, 2);; // * Math.PI





context.save();
      context.translate(x, y);
      context.translate(margX, margY);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);
      //context.fillStyle = math.mapRange(scale, 0, 6.2, 0, 150)

      context.lineWidth = scale;


      context.strokeStyle = strColor;

      context.beginPath();
      

      //context.beginPath();
      //context.moveTo(w * -0.5, 0);
      //context.lineTo(w * 0.5, 0);

      context.ellipse(x * 0.0001 , y * 0.0001, w * 0.58 , h * 0.6, angle * 10, Math.PI * arcFull, 2 * Math.PI);
      
      //context.fill();
      context.stroke();
      context.restore();

      */