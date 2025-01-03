let objects;
let menu = "startMenu";
let textHeight;
let sizing = {
  canvasWidth: 1600,
  canvasHeight: 1000,
  buttonText: 50,
  tileSize: 100,
  buttonGap: 40
}

function preload() {

}

function setup() {
  textHeight = textAscent() + textDescent();
  let scale = window.innerWidth / 1920;
  console.log("Screen:", window.innerWidth)
  console.log("Scale:", scale)

  for (item in sizing) {
    sizing[item] = sizing[item]*scale;
  }

  createCanvas(sizing.canvasWidth, sizing.canvasHeight);
}

function mousePressed() {
  for (i = 0; i < objects.length; i++) {
    if (objects[i] instanceof Button) {
      let action = objects[i].checkClick(mouseX, mouseY);
      if (action == "select") {
        menu = "selectmap"
      } else if (action == "create") {
        menu = "createmap"
      } else if (action == "main") {
        menu = "startMenu"
      }
    }
  }
}

function keyPressed() {
  
}

function draw() {
  objects = [];

  background(255);
  if (menu == "startMenu") {
    startMenu(objects);
  } else if (menu == "createmap") {
    createMap(objects);
  } 

  for (let i = 0; i < objects.length; i++) {
    objects[i].show();
  }

  fill(21,21,21,0)
  stroke(255)
  rect(0,0,sizing.canvasWidth-1,sizing.canvasHeight-1)
}