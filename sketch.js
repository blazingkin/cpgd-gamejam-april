function preload(){
  soundFormats('wav', 'ogg');
  snare = loadSound('snare.ogg');
}

function changeChannels(){
  numStreams = document.getElementById('numChannels').value;
  console.log("numStreams: "+numStreams);
  onStream = 0;
}

function changeBPM(){
  msDelay = (60 * 1000) / document.getElementById('bpm').value;
  console.log("new delay: "+msDelay);
}

function setup() {
  createCanvas(windowWidth, windowHeight * (2/3));
  stroke(0,0,0,0);
  snare.setVolume(0.1);
  for (var i = 0; i <= width / blockWidth; i++){
    addStreamElement();
  }
  changeChannels();
  changeBPM();
}

var snare = null;

function mod(a, n) {
  return a - (n * Math.floor(a/n));
}

function addStreamElement(){
  if (streams.length == 0){
    streams.push(Math.floor(Math.random() * numStreams));
  }else{
    var newLevel = streams[streams.length - 1];
    if (Math.random() >= 0.5){
      newLevel += 1;
    }else{
      newLevel -= 1;
    }
    newLevel = mod(newLevel, numStreams);
    streams.push(newLevel);
  }
}

let buttonOne = "a"
let buttonTwo = "s"

var numStreams = 4;
var onStream = 0;
var streams = [];
var lastStream = 0;
var misses = 0;
var hits = 0;

var lastHit = 0;
let tolerance = 150;

function onButtonOne(){
  onStream = mod((onStream - 1), numStreams);
  lastHit = (+ new Date());
}

function onButtonTwo(){
  onStream = mod((onStream + 1), numStreams);
  lastHit = (+ new Date());
}

function checkForLate(){
  var newTime = (+ new Date());
  if (lastHit - newTime <= -tolerance ||
      onStream != lastStream){
    misses++;
    document.getElementById("misses").innerText = misses;
  }else{
    hits++;
    document.getElementById('hits').innerText = hits;
  }
}

/* 120 bpm */
let msDelay = 500;
function onBeat() {
  var newTime = (+ new Date());
  if (newTime - lastHit >= tolerance ||
      onStream != streams[0]){
        lastStream = streams[0];
        setTimeout(checkForLate, tolerance);    
  }else{
    hits++;
    document.getElementById('hits').innerText = hits;
  }
  if (snare != null){
    snare.play();
  }
  streams = streams.slice(1, streams.length);
  addStreamElement();
  
  setTimeout(onBeat, msDelay);
}
setTimeout(onBeat, msDelay);


var blockWidth =  100;
function draw() {
  // put drawing code here
  clear();
  background(0);
  fill('red');
  drawPlayer();
  fill('blue')
  drawBeats();
}

function drawPlayer(){
  let pHeight = height / numStreams;
  rect(0, pHeight * onStream, blockWidth, pHeight);
}

function drawBeats(){
  let bHeight = height / numStreams;
  for (var i = 0; i < streams.length; i++){
    rect((1 + i) * blockWidth, streams[i] * bHeight, blockWidth, bHeight);
  }
}

document.onkeypress = function(evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var charStr = String.fromCharCode(charCode);
  if (charStr == buttonOne){
    onButtonOne();
  }else if (charStr == buttonTwo) {
    onButtonTwo();
  }
};
