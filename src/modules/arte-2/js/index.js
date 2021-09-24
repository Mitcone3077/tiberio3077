import canvasSketch from "canvas-sketch";
import { random, math } from "canvas-sketch-util";
import style from "../css/style.css";

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  fps: 2
  //playbackRate:"throttle"
};



const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = 'black';


    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    let x, y;
    let j;

    const num = 1000;
    const radius = width * 0.35;


    for (var i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);
      

      context.save();
      context.translate(x, y);
      context.rotate(-angle * 2);
      context.scale(random.range(0, 0.02),random.range(-2.5, 200));

      context.beginPath();
      context.rect(-w * 0.5, random.range(0 , -h * 0.5), w, h);
      context.fill();
      context.restore();

      context.save();

      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.arc(0, 0, radius * random.range(0.7, 1.3), slice * -0.1, slice * 0.1);
      //context.stroke();

      context.restore();


    }

  };
};
canvasSketch(sketch, settings);
