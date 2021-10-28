import p5 from "p5";
import { Vector } from "p5";
import style from "../css/style.css";
import { Pane } from "tweakpane";

// The Chaos Game

// Using p5 in instance mode
// Video: https://www.youtube.com/watch?v=Su792jEauZg&ab_channel=TheCodingTrain
// read more: https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
const init = (p5Instance) => {
  // Keep your variables scoped locally instead of globally
  // Keep your variables declarion consistant instead of mixing vars, lets and consts
  let points;
  let current;
  let percent = 0.5;
  let previous;
  let n = 8; // Use more descriptive names
  let m = 3; // Use more descriptive names
  let rColor = 100;
  let gColor = 100;
  let bColor = 100;
  
  // Reset 
  const reset = () => {
    for (let i = 0; i < n; i++) {
      let angle = (i * p5Instance.TWO_PI) / m;

      // fromAngle() is a static method from the p5.Vector class.
      // read more: https://p5js.org/reference/#/p5.Vector
      let v = p5.Vector.fromAngle(angle);
      v.mult(p5Instance.width / 8);
      v.add(p5Instance.width / 2, p5Instance.height / 2);
      points.push(v);
    }

    current = p5Instance.createVector(
      p5Instance.random(p5Instance.width),
      p5Instance.random(p5Instance.height)
    );

    p5Instance.stroke(255, 0, 0, 255);
    p5Instance.strokeWeight(10);

    points.forEach((point) => p5Instance.point(p5Instance.point(point.x, point.y)))
  }

  // Setup function
  p5Instance.setup = function() {
    p5Instance.createCanvas(p5Instance.windowWidth, p5Instance.windowHeight);
    p5Instance.colorMode(p5Instance.RGB, 255);
    points = [];
    p5Instance.background(51);

    reset();
  };

  // Draw function
  p5Instance.draw = function() {
    if (p5Instance.frameCount % 200 == 0) {
      m += 1;
      percent = 0;
      rColor += 20;
      reset();
    }

    for (let i = 0; i < 10000; i++) {
      p5Instance.strokeWeight(0.3);
      p5Instance.stroke(rColor, gColor, bColor, 5);
      let next = p5Instance.random(points);
      
      if (next !== previous) {
        current.x = p5Instance.lerp(current.x, next.x, percent);
        current.y = p5Instance.lerp(current.y, next.y, percent);
        p5Instance.point(current.x, current.y);
        percent += 0.000001;
      }

      previous = next;
    }
  };
};

// Using p5 in instance mode
// Video: https://www.youtube.com/watch?v=Su792jEauZg&ab_channel=TheCodingTrain
// read more: https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
new p5(init, document.getElementById("p5"));