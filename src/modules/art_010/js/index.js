import p5 from "p5";
import style from "../css/style.css";
import { Pane } from 'tweakpane';



const init = (p) =>{          //========================INITIALIZATION
  



  p.setup = function setup() {//========================SETUP FUNCTION

    p.createCanvas(600, 600);
    p.background(240);





   } //===END OF SETUP



  p.draw = function draw() {//============================DRAW FUNCTION



   } //===END OF DRAW






 }; //===END OF INIT


new p5 (init,document.getElementById("p5")); //== RUN >