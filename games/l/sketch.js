let objects = [];
let symbols = [];
let menu = "startingMenu";
let selectedPiece = null;
let turn = "white";
alpha = ["A","B","C","D","E","F","G","H"]

let canvas = {
  canvasWidth: 1600,
  canvasHeight: 1000,
  buttonText: 60
}

function scaleList(li) {
  for (item in li) {
    li[item] = li[item] * (window.innerWidth / 1920)
  }
}

function preload() {
  symbols["pawnW"] = loadImage("pieces/pawnWhite.png");
  symbols["rookW"] = loadImage("pieces/rookWhite.png");
  symbols["kingW"] = loadImage("pieces/kingWhite.png");
  symbols["queenW"] = loadImage("pieces/queenWhite.png");
  symbols["bishopW"] = loadImage("pieces/bishopWhite.png");
  symbols["knightW"] = loadImage("pieces/horseWhite.png");
  symbols["pawnB"] = loadImage("pieces/pawnBlack.png");
  symbols["kingB"] = loadImage("pieces/kingBlack.png");
  symbols["queenB"] = loadImage("pieces/queenBlack.png");
  symbols["rookB"] = loadImage("pieces/rookBlack.png");
  symbols["bishopB"] = loadImage("pieces/bishopBlack.png");
  symbols["knightB"] = loadImage("pieces/horseBlack.png");
  symbols["checkerW"] = loadImage("pieces/checkerW.png");
  symbols["checkerB"] = loadImage("pieces/checkerB.png");
}

function setup() {
  scaleList(canvas);
  createCanvas(canvas.canvasWidth, canvas.canvasHeight);
}

function mousePressed() {
  for (i = 0; i < objects.length; i++) {
    if (objects[i] instanceof Button) {
      let action = objects[i].checkClick(mouseX, mouseY);
      switch (action) {
        case "startChess":
          objects = [];
          menu = "chess";
          break;
        case "mainMenu":
          objects = []
          menu = "startingMenu";
          break;
          case "startCheckers":
            objects = []
            menu = "checkers";
            break;
      }
    }

    if (objects[i] instanceof Tile) {
      let action = objects[i].checkClick(mouseX, mouseY);
      if (action != false) {
        if (action.piece != null) {
          selectedPiece = [action.name,action.piece]
        }
        if (red(action.color) === 0 && green(action.color) === 255 && blue(action.color) === 0) {
          for (i = 0; i < objects.length; i++) {
            if (objects[i] instanceof Tile) {
              if (objects[i].name == action.name) {
                objects[i].piece = selectedPiece[1]
              }
              if (objects[i].name == selectedPiece[0]) {
                objects[i].piece = null
              }
              objects[i].color = objects[i].origColor
            }
          }
          if (turn == "white") {
            turn = "black"
          } else {
            turn = "white"
          }
          selectedPiece = null
        } else if (objects[i].piece == null) {
          for (i = 0; i < objects.length; i++) {
            if (objects[i] instanceof Tile) {
              objects[i].color = objects[i].origColor
            }
          }
        }
        if (action.piece == symbols.pawnW && turn == "white") {
          let code = Array.from(action.name)
          index = alpha.indexOf(code[0])
          for (i = 0; i < objects.length; i++) {
            if (objects[i] instanceof Tile) {
              if (code[0] == "G") {
                if ((objects[i].name == `${alpha[index-1]}${code[1]}` && objects[i].piece == null) || objects[i].name == `${alpha[index-2]}${code[1]}`) {
                  objects[i].color = color(0,255,0)
                } else {
                  objects[i].color = objects[i].origColor
                }
              } else if ((objects[i].name == `${alpha[index-1]}${code[1]+1}` && objects[i].piece != null) || (objects[i].name == `${alpha[index-1]}${code[1]-1}` && objects[i].piece != null)) {
                objects[i].color = color(0,255,0)
              } else {
                if (objects[i].name == `${alpha[index-1]}${code[1]}` && objects[i].piece == null) {
                  objects[i].color = color(0,255,0)
                } else {
                  objects[i].color = objects[i].origColor
                }
              }
            }
          }
        }

        if (action.piece == symbols.pawnB && turn == "black") {
          let code = Array.from(action.name)
          index = alpha.indexOf(code[0])
          for (i = 0; i < objects.length; i++) {
            if (objects[i] instanceof Tile) {
              if (code[0] == "B") {
                if ((objects[i].name == `${alpha[index+1]}${code[1]}` && objects[i].piece == null) || objects[i].name == `${alpha[index+2]}${code[1]}`) {
                  objects[i].color = color(0,255,0)
                } else {
                  objects[i].color = objects[i].origColor
                }
              } else if ((objects[i].name == `${alpha[index+1]}${code[1]+1}` && objects[i].piece != null) || (objects[i].name == `${alpha[index+1]}${code[1]-1}` && objects[i].piece != null)) {
                objects[i].color = color(0,255,0)
              } else {
                if (objects[i].name == `${alpha[index+1]}${code[1]}` && objects[i].piece == null) {
                  objects[i].color = color(0,255,0)
                } else {
                  objects[i].color = objects[i].origColor
                }
              }
            }
          }
        }
      }
    }
  }
}

function keyPressed() {
  
}

function draw() {
  background(255);

  switch (menu) {
    case "startingMenu":
      temp = startMenu();
      break;
    case "chess":
      temp = chess();
      break;
    case "checkers":
      temp = checkers();
      break;
  }

  if (objects.length == 0) {
    objects = temp
  }

  if (objects != [] && objects.length > 0) {
    for (i = 0; i < objects.length; i++) {
      objects[i].show();
    }
  }
}