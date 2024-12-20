let grid;
let gridX;
let gridY;
const stw = 30, sth = 20;
const diff = "medium";
let setupD = false;
let rectWidth;
let rectHeight;
let padding;
let buttonColors;


function preload() {
  rectWidth = 600;
  rectHeight = 100;
  padding = 20;
  buttonColors = [color(66,66,66,150), color(66,66,66,150), color(66,66,66,150)];
}

function setup() {
  grid = new Grid(stw, sth);
  let canvas = createCanvas(grid.width*grid.pix, grid.height*grid.pix+grid.pix);
  canvas.parent('main');
}

function mouseMoved() {
  let centerX = width / 2;
  let centerY = height / 2;

  // Calculate the vertical offset to center the entire block of elements
  let totalHeight = (rectHeight * 3) + (padding * 2) + 30; // Total height of all elements
  let startY = centerY - totalHeight / 2; // Starting Y position to center vertically

  // Check if the mouse is hovering over any of the difficulty rectangles
  if (mouseX >= centerX - rectWidth / 2 && mouseX <= centerX + rectWidth / 2 && !setupD) {
    if (mouseY >= startY && mouseY <= startY + rectHeight) {
      cursor('pointer'); // Change cursor to pointer for "Easy"
      buttonColors[0] = color(30,30,30,150);
      buttonColors[1] = color(66,66,66,150);
      buttonColors[2] = color(66,66,66,150);
    } else if (mouseY >= startY + rectHeight + padding && mouseY <= startY + 2 * rectHeight + padding) {
      cursor('pointer'); // Change cursor to pointer for "Medium"
      buttonColors[1] = color(30,30,30,150);
      buttonColors[0] = color(66,66,66,150);
      buttonColors[2] = color(66,66,66,150);
    } else if (mouseY >= startY + 2 * (rectHeight + padding) && mouseY <= startY + 3 * rectHeight + 2 * padding) {
      cursor('pointer'); // Change cursor to pointer for "Hard"
      buttonColors[2] = color(30,30,30,150);
      buttonColors[1] = color(66,66,66,150);
      buttonColors[0] = color(66,66,66,150);
    } else {
      cursor('default'); // Set to default cursor when not hovering over a button
    }
  } else {
    cursor('default'); // Set to default cursor if not hovering over any button
    if (buttonColors != [color(66,66,66,150), color(66,66,66,150), color(66,66,66,150)]) {
      buttonColors = [color(66,66,66,150), color(66,66,66,150), color(66,66,66,150)];
    }
  }
}

function mousePressed() {
  gridX = floor(mouseX/grid.pix)
  gridY = floor(mouseY/grid.pix)
  
  if (mouseButton === LEFT && setupD) {
    grid.showCell(gridX,gridY)
    clickTrue = false;
  } else if (mouseButton === RIGHT && setupD) {
    grid.flagCell(gridX,gridY)
    clickTrue = false;
  } else if (mouseButton === LEFT && !setupD) {
    let centerX = width / 2;
    let centerY = height / 2;

    // Calculate the vertical offset to center the entire block of elements
    let totalHeight = (rectHeight * 3) + (padding * 2) + 30; // Total height of all elements
    let startY = centerY - totalHeight / 2; // Starting Y position to center vertically

    // Check if mouse is within the bounds of the "Easy" rectangle
    if (mouseX >= centerX - rectWidth / 2 && mouseX <= centerX + rectWidth / 2 &&
        mouseY >= startY && mouseY <= startY + rectHeight) {
      grid.setDiff("easy");
      setupD = true;
    }

    // Check if mouse is within the bounds of the "Medium" rectangle
    if (mouseX >= centerX - rectWidth / 2 && mouseX <= centerX + rectWidth / 2 &&
        mouseY >= startY + rectHeight + padding && mouseY <= startY + 2 * rectHeight + padding) {
      grid.setDiff("medium");
      setupD = true;
    }

    // Check if mouse is within the bounds of the "Hard" rectangle
    if (mouseX >= centerX - rectWidth / 2 && mouseX <= centerX + rectWidth / 2 &&
        mouseY >= startY + 2 * (rectHeight + padding) && mouseY <= startY + 3 * rectHeight + 2 * padding) {
      grid.setDiff("hard");
      setupD = true;
    }
  }
}

function draw() {
  background(220);
  
  if (!setupD) {
    let centerX = width / 2; // Center X of the canvas
    let centerY = height / 2; // Center Y of the canvas

    // Calculate the vertical offset to center the entire block of text and rectangles
    let totalHeight = (rectHeight * 3) + (padding * 2) + 30; // Total height of all elements
    let startY = centerY - totalHeight / 2; // Starting Y position to center vertically

    // Draw rectangles
    fill(0, 0, 0);
    stroke(0, 0, 0);
    fill(buttonColors[0]);
    rect(centerX - rectWidth / 2, startY, rectWidth, rectHeight);
    fill(buttonColors[1]);
    rect(centerX - rectWidth / 2, startY + rectHeight + padding, rectWidth, rectHeight);
    fill(buttonColors[2]);
    rect(centerX - rectWidth / 2, startY + 2 * (rectHeight + padding), rectWidth, rectHeight);

    // Draw text on the rectangles
    textSize(50);
    fill(255, 255, 255);
    text("Easy", centerX - textWidth("Easy") / 2, startY + rectHeight / 2 + 15);
    text("Medium", centerX - textWidth("Medium") / 2, startY + rectHeight + padding + rectHeight / 2 + 15);
    text("Hard", centerX - textWidth("Hard") / 2, startY + 2 * (rectHeight + padding) + rectHeight / 2 + 15);

    // Draw the title above the rectangles
    fill(0, 0, 0);
    textSize(30);
    text("Choose your difficulty:", centerX - textWidth("Choose your difficulty:") / 2, startY - 30);
  } else {
    grid.display();
    fill(98,98,98);
    stroke(0,0,0);
    rect(0,grid.height*grid.pix,grid.width*grid.pix,grid.height*grid.pix+grid.pix);

    fill(255);
    textSize(20);
    stroke(0,0,0);
    
    text(`Bombs: ${grid.getBombs()}`,20,grid.height*grid.pix+18+8);
  }
  
  let result = grid.checkWin();
  if (result) {
    noLoop();
    textSize(100)
    fill(0,0,0);
    text("You Win!",370,height/2)
  }
  
  result = grid.checkLose();
  if (result) {
    noLoop();
    textSize(100)
    fill(0,0,0);
    text("You Lose!",400,height/2)
  }
}