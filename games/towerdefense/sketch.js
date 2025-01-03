
let menu = "startMenu";
let sizing = {
  canvasWidth: 1600,
  canvasHeight: 1000,
  buttonText: 50,
  buttonHeight: 100
}

function preload() {

}

function setup() {
  let scale = window.innerWidth / 1920;
  console.log("Screen:", window.innerWidth)
  console.log("Scale:", scale)

  for (item in sizing) {
    sizing[item] = sizing[item]*scale;
  }

  createCanvas(sizing.canvasWidth, sizing.canvasHeight);
}

function mousePressed() {
  
}

function keyPressed() {
  
}

function draw() {
  let objects = [];

  background(255);
  if (menu == "startMenu") {
    startMenu(objects);
  }

  for (let i = 0; i < objects.length; i++) {
    objects[i].show();
  }
}