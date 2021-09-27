import canvasSketch from "canvas-sketch";
import { random, math } from "canvas-sketch-util";
import style from "../css/style.css";

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < 50; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const qAgent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        let dist = qAgent.pos.getDistance(other.pos);

        if (dist > 300) continue;

        context.lineWidth = math.mapRange(dist, 0, 300, 1, 0.007);
        context.strokeStyle = "black";
        context.beginPath();
        context.moveTo(qAgent.pos.x, qAgent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy); // Pitagoras...
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-5, 5), random.range(-5, 5));
    this.radius = 2; //random.range(4, 12);
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 1;
    //context.lineWidth = math.mapRange(dist, 0, 100, 10, 1);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    //context.stroke();

    context.restore();
  }
}
