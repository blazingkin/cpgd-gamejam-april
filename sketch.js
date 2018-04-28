function setup() {
  createCanvas(800, 800);
  stroke(0,0,0,0);
  background(0);
  oscillator = new p5.Oscillator();
  oscillator.setType('sine');
}

let button_one = "a"
let button_two = "s"
var oscillator;

function onButtonOne(){

}

function onButtonTwo(){

}

/* 120 bpm */
let msDelay = 500;

var recSize = 1;
function onBeat() {
  recSize+= 10;
  setTimeout(onBeat, msDelay);
}
setTimeout(onBeat, msDelay);

function draw() {
  // put drawing code here
  fill('red');
  rect((width-recSize)/2,(height-recSize)/2,recSize,recSize);
}

document.onkeypress = function(evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var charStr = String.fromCharCode(charCode);
  if (charStr == button_one){
    onButtonOne();
  }else if (charStr == button_two) {
    onButtonTwo();
  }
};