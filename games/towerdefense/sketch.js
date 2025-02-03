let objects = [];
let objectActive = true;
let menu = "startMenu";
let textHeight;
let currentSelection;
let sizing = {
  canvasWidth: 1600,
  canvasHeight: 1000,
  buttonText: 50,
  tileSize: 100,
  buttonGap: 40
}

function preload() {

}

function dumpObjects() {
  objects = [];
  objectActive = true;
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
  dumpObjects();
}

function mousePressed() {
  for (i = 0; i < objects.length; i++) {
    if (objects[i] instanceof Button) {
      let action = objects[i].checkClick(mouseX, mouseY);
      if (action == "select") {
        menu = "selectmap"
        dumpObjects()
      } else if (action == "create") {
        menu = "createmap"
        dumpObjects()
      } else if (action == "main") {
        menu = "startMenu"
        dumpObjects()
      } else if (action == "startBlock") {
        currentSelection = "Starting Block"
      } else if (action == "pathBlock") {
        currentSelection = "Path Block"
      } else if (action == "finishBlock") {
        currentSelection = "Finishing Block"
      } else if (action == "saveMap") {
        
      }
    } else if (objects[i] instanceof Tile) {
      let con = objects[i].checkClick(mouseX, mouseY, currentSelection)
      console.log(con)
    }
  }
}

function keyPressed() {
  
}

function draw() {
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