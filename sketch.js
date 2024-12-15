let cells;
let font;
let currentGuess = 0;
let winTally = 0;
let wrongLetters = [];
let gameLoop = true;

let mode;

function detectDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/mobile/i.test(userAgent)) {
    return "phone";
  } else {
    return "desktop";
  }
}

mode = detectDevice()

const sizing = {
  canvaswidth: 800,
  canvasheight: 1500,
  xposition: 120,
  yposition: 200,
  cellsize: 100,
  distance: 110,
  heading: 80,
  heading2: 60,
  heading3: 30,
  keyboardy: 850,
  keyboarddis : 90
}

let percentSize;
if(mode == "desktop") {
  percentSize = 100;
  sizing.canvaswidth = window.innerWidth;
  sizing.xposition = window.innerWidth/2-270
  sizing.keyboardy = 900;
} else if (mode == "phone") {
  sizing.xposition = 100;
  sizing.canvaswidth = 740
  percentSize = (window.innerWidth/sizing.canvaswidth)*100;
  sizing.yposition = 100;
}

for (let size in sizing) {
  sizing[size] = sizing[size]*(percentSize/100);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const wordToGuess = words[getRandomNumber(0, words.length)];

let guess = "";

const alphabet = "abcdefghijklmnopqrstuvwxyz"
const qwerty = "qwertyuiopasdfghjklzxcvbnm".toUpperCase();


function preload() {
  font = loadFont("fgoth.otf");
}

function setup() {
  createCanvas(sizing.canvaswidth, sizing.canvasheight);
  
  cells = [];
  
  let x = sizing.xposition;
  let y = sizing.yposition;
  let distance = sizing.distance;
  
  for(let i = 0; i < 6; i++) {
    wordGroup = [];
    x = sizing.xposition;
    for(let j = 0; j < 5; j++) {
      wordGroup.push(new Cell(x,y));
      x += distance;
    }
    y += distance;
    cells.push(wordGroup)
  }
  
  virtualKeys = [
    {
      rowWidth: (9*(sizing.cellsize/4)) + (7*(sizing.distance-sizing.cellsize)) ,
      keys: []
    },
    {
      rowWidth: (8*(sizing.cellsize/4))+(6*(sizing.distance-sizing.cellsize)),
      keys: []
    },
    {
      rowWidth: (6*(sizing.cellsize/4))+(5*(sizing.distance-sizing.cellsize)),
      keys: []
    }
  ]
  
  let startingPosition = (sizing.canvaswidth/2)-(virtualKeys[0].rowWidth);
  let iterX = startingPosition;
  for (let i = 0; i < 10; i ++) {
    virtualKeys[0].keys.push(new VirtualKey(iterX, sizing.keyboardy, qwerty[i]))
    iterX += sizing.cellsize/2 + (sizing.distance-sizing.cellsize)
  }
  iterX = (sizing.canvaswidth/2)-(virtualKeys[1].rowWidth);
  for (let i = 0; i < 9; i ++) {
    virtualKeys[1].keys.push(new VirtualKey(iterX, sizing.keyboardy+sizing.keyboarddis, qwerty[i+10]))
    iterX += sizing.cellsize/2 + (sizing.distance-sizing.cellsize)
  }
  iterX = (sizing.canvaswidth/2)-(virtualKeys[2].rowWidth);
  for (let i = 0; i < 7; i ++) {
    virtualKeys[2].keys.push(new VirtualKey(iterX, sizing.keyboardy+(sizing.keyboarddis*2), qwerty[i+19]))
    iterX += sizing.cellsize/2 + (sizing.distance-sizing.cellsize)
  }
  virtualKeys[2].keys.push(new VirtualKey((sizing.canvaswidth/2)-(virtualKeys[0].rowWidth), sizing.keyboardy+sizing.keyboarddis*2, "Enter", (sizing.cellsize/1.5)+5))
  virtualKeys[2].keys.push(new VirtualKey((sizing.canvaswidth/2)+(virtualKeys[0].rowWidth-sizing.cellsize/1.33), sizing.keyboardy+(sizing.keyboarddis*2), "Back", (sizing.cellsize/1.5)+5))
}

function submitGuess() {
  if (guess.length == 5) {
    let wordLetters = wordToGuess.split("");
    let alreadyColored = {};
    let notColored = {};
    let greenColored = {};
    winTally = 0

    for (let i = 0; i < 5; i++) {
      if (wordToGuess[i].toUpperCase() in notColored) {
        notColored[wordToGuess[i].toUpperCase()] += 1;
      } else {
        notColored[wordToGuess[i].toUpperCase()] = 1;
      }

      if (cells[currentGuess][i].text == wordToGuess[i].toUpperCase()) {
        cells[currentGuess][i].outlineColor = color(101, 176, 91);
        cells[currentGuess][i].fillColor = color(101, 176, 91);
        
        virtualKeys.forEach((row) => {
          row.keys.forEach((virtualKey) => {
            if (virtualKey.letter == cells[currentGuess][i].text) {
              virtualKey.fillColor = color(101, 176, 91);
              virtualKey.active = false;
            }
          });
        });

        winTally += 1;
        if (cells[currentGuess][i].text.toUpperCase() in greenColored) {
          greenColored[cells[currentGuess][i].text] += 1;
        } else {
          greenColored[cells[currentGuess][i].text] = 1;
        }
      }
    }
    alreadyColored = greenColored;

    for (let i = 0; i < 5; i++) {
      if (cells[currentGuess][i].text != wordToGuess[i].toUpperCase() && wordToGuess.toUpperCase().includes(cells[currentGuess][i].text)) {
        if (!(cells[currentGuess][i].text in alreadyColored) || (alreadyColored[cells[currentGuess][i].text] < notColored[cells[currentGuess][i].text])) {
          cells[currentGuess][i].outlineColor = color(201, 174, 66);
          cells[currentGuess][i].fillColor = color(201, 174, 66);
          
          virtualKeys.forEach((row) => {
            row.keys.forEach((virtualKey) => {
              if (virtualKey.letter == cells[currentGuess][i].text) {
                virtualKey.fillColor = color(201, 174, 66);
                virtualKey.active = false;
              }
            });
          });
          
          if (cells[currentGuess][i].text in alreadyColored) {
            alreadyColored[cells[currentGuess][i].text] += 1;
          } else {
            alreadyColored[cells[currentGuess][i].text] = 1;
          }
        } else {
          cells[currentGuess][i].outlineColor = color(90);
          cells[currentGuess][i].fillColor = color(90);
          if(!wrongLetters.includes(cells[currentGuess][i].text)) {
            wrongLetters.push(cells[currentGuess][i].text);
          }
        }      
      } else if (cells[currentGuess][i].text != wordToGuess[i].toUpperCase()) {
        cells[currentGuess][i].outlineColor = color(90);
        cells[currentGuess][i].fillColor = color(90);
        if(!wrongLetters.includes(cells[currentGuess][i].text)) {
          wrongLetters.push(cells[currentGuess][i].text);
        }
      }
    }
    currentGuess += 1;
    guess = "";
  }

  virtualKeys.forEach((row) => {
    row.keys.forEach((virtualKey) => {
      if (wrongLetters.includes(virtualKey.letter) && virtualKey.active) {
        virtualKey.active = false;
        virtualKey.fillColor = color(110);
      }
    });
  });
}

function keyPressed() {  
  if(keyCode === BACKSPACE) {
    if (guess.length > 0) {
      guess = guess.slice(0, -1);
    }
  } else if (keyCode === ENTER) {
    submitGuess();
  } else if(guess.length < 5) {
    if (alphabet.includes(key)) {
      guess += key;
    }
  }
  
  for (let i = 0; i < 5; i++) {
    try {
      cells[currentGuess][i].text = guess[i].toUpperCase();
      cells[currentGuess][i].outlineColor = color(140); 
    } 
    catch {
      if (currentGuess <= 5) {
        cells[currentGuess][i].text = "";
        cells[currentGuess][i].outlineColor = color(90); 
      }
    }
  }
}

function mousePressed() {
  virtualKeys.forEach((row) => {
    row.keys.forEach((virtualKey) => {
      if (virtualKey.checkClick(mouseX, mouseY) && guess.length < 5 && alphabet.toUpperCase().includes(virtualKey.letter)) {
        guess += virtualKey.letter.toLowerCase();
      } else if (virtualKey.checkClick(mouseX, mouseY) && guess.length > 0 && virtualKey.letter == "Back") {
        guess = guess.slice(0, -1);
      } else if (virtualKey.checkClick(mouseX, mouseY) && virtualKey.letter == "Enter") {
        submitGuess();
      }
    })
  });
  
  for (let i = 0; i < 5; i++) {
    try {
      cells[currentGuess][i].text = guess[i].toUpperCase();
      cells[currentGuess][i].outlineColor = color(140); 
    } 
    catch {
      if (currentGuess <= 5) {
        cells[currentGuess][i].text = "";
        cells[currentGuess][i].outlineColor = color(90); 
      }
    }
  }
}

let hideKeys = false;

function draw() {
  background(21);
  
  cells.forEach((wordGroup) => {
    wordGroup.forEach((cell) => {
      cell.show();
      
    })
  });
  
  if (mode == "desktop") {
    textFont(font);
    noStroke();
    fill(255);
    textSize(sizing.heading);
    text(`Wordle`, (sizing.canvaswidth/2)-(textWidth(`Wordle`)/2),(sizing.yposition/2)+textDescent()*2)
  }
  
  if (currentGuess > 5 && guess != wordToGuess) {
    hideKeys = true;
    textFont(font);
    noStroke();
    fill(255);
    textSize(sizing.heading2);
    text("You Lose!", (sizing.canvaswidth/2)-(textWidth("You Lose!")/2),sizing.yposition+(sizing.distance*7))
    text(`The word was: ${wordToGuess.toUpperCase()}`, (sizing.canvaswidth/2)-(textWidth(`The word was: ${wordToGuess.toUpperCase()}`)/2),sizing.yposition+(sizing.distance*8)-(sizing.distance/2))
    noLoop()
  } else {
    if (winTally == 5) {
      hideKeys = true;
      textFont(font);
      noStroke();
      fill(255);
      textSize(sizing.heading2);
      text("You Win!", (sizing.canvaswidth/2)-(textWidth("You Win!")/2),sizing.yposition+(sizing.distance*7))
      noLoop()
    }
  }
  
  if (!hideKeys) {
    virtualKeys.forEach((row) => {
      row.keys.forEach((virtualKey) => {
        virtualKey.show();
      })
    });
  } 
}