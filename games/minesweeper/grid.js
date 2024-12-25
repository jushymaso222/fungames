let arr = []
let bombs;
let shown = [];
let visited = [];
let flagged = [];

function revealZeros(x, y) {
    try {
      if (x < 0 || x >= this.width || y < 0 || y >= this.height || shown[x][y] == "Y" || flagged[x][y]) {
        return;
      }
    } catch {
      return;
    }
    
    shown[x][y] = "Y"; // Mark the cell as revealed

    // If the current cell has no adjacent mines (value is 0), recursively reveal its neighbors
    if (arr[x][y] === 0) {
        // Define adjacent offsets (assuming 8-directional neighbors)
        const dx = [-1, 0, 1, -1, 1, -1, 0, 1];
        const dy = [-1, -1, -1, 0, 0, 1, 1, 1];
        
        for (let i = 0; i < 8; i++) {
            revealZeros(x + dx[i], y + dy[i]);
        }
    }
}

class Grid {
  
  constructor(stw, sth) {
    this.width = stw;
    this.height = sth;
    this.pix = 40;
    
    for (let x=0; x<this.width; x++) {
      arr[x] = [];
      shown[x] = [];
      visited[x] = [];
      flagged[x] = [];
      for (let y=0; y<this.height; y++) {
        arr[x][y] = 0;
        shown[x][y] = "N";
        visited[x][y] = false;
        flagged[x][y] = false;
      }
    }  
  }
  
  display() {
    for (let i=0; i<this.width; i++) {
      for (let r=0; r<this.height; r++) {
        let x = i*this.pix, y = r*this.pix;
        stroke(21);
        strokeWeight(2);
        textSize(10);
        if (flagged[i][r]) {
          fill(204,102,0);
        } else {
          fill(40);
        }
        square(x, y, this.pix)
        
        
        
        if (shown[i][r] == "Y") {
          if (arr[i][r] != -1) {
            let textCol;
            switch (arr[i][r]) {
              case 1:
                textCol = color(0,0,255);
                break;
              case 2:
                textCol = color(0,170,0);
                break;
              case 3:
                textCol = color(190,0,0);
                break;
              case 4:
                textCol = color(102,0,102);
                break;
              case 5:
                textCol = color(102,0,0);
                break;
              case 6:
                textCol = color(0,153,153);
                break;
              case 7:
                textCol = color(0,0,0);
                break;
              case 8:
                textCol = color(117,117,117);
                break;
              default:
                textCol = color(180,180,180);
                break;
            }
            fill(180,180,180);
            square(x, y, this.pix)
            if (arr[i][r] != 0) {
              fill(textCol)
              stroke(textCol);
              textSize(30);
              text(arr[i][r],x+11,y+30);
            }
          } else {
            fill(255,0,0);
            square(x, y, this.pix)
          }
        }
      }
    }
  }
  
  loseGame() {
    for (let i=0; i<this.width; i++) {
      for (let r=0; r<this.height; r++) {
        if (arr[i][r] == -1) {
          shown[i][r] = "Y"
        }
      }
    }
  }
  
  showCell(x,y) {
    if (!flagged[x][y]) {
      if (arr[x][y] == 0) { 
        revealZeros(x,y);
      } else {
        if (arr[x][y] != -1 && shown[x][y] != "Y") {
          shown[x][y] = "Y";
        } else {
          if (arr[x][y] == -1 && !flagged[x][y]) {
            this.loseGame();
          }
        }
      }
    }
  }
  
  flagCell(x,y) {
    if (flagged[x][y] == false) {
      flagged[x][y] = true;
    } else {
      flagged[x][y] = false;
    }
  }
  
  checkWin() {
    let tally = 0;
    for (let i=0; i<this.width; i++) {
      for (let r=0; r<this.height; r++) {
        if (arr[i][r] == -1 && flagged[i][r] == true) {
          tally++;
        }
      }
    }
    if (tally == bombs) {
      return true;
    } else {
      return false;
    }
  }
  
  checkLose() {
    let tally = 0;
    for (let i=0; i<this.width; i++) {
      for (let r=0; r<this.height; r++) {
        if (arr[i][r] == -1 && shown[i][r] == "Y") {
          tally++;
        }
      }
    }
    if (tally == bombs) {
      return true;
    } else {
      return false;
    }
  }
  
  getBombs() {
    let tally = 0;
    for (let i=0; i<this.width; i++) {
      for (let r=0; r<this.height; r++) {
        if (flagged[i][r] == true) {
          tally++;
        }
      }
    }
    return bombs-tally;
  }
  
  setDiff(diff) {
    switch(diff) {
      case "easy":
        bombs = floor((stw*sth)*0.10);
        break;
      case "medium":
        bombs = floor((stw*sth)*0.15);
        break;
      case "hard":
        bombs = floor((stw*sth)*0.20);
        break;
      default:
        break;
    }
    
    for (let i=0; i<bombs; i++) {
      let x = floor(random(0,this.width));
      let y = floor(random(0,this.height));
      while (arr[x][y] != 0) {
        x = floor(random(0,this.width));
        y = floor(random(0,this.height));
      }
      arr[x][y] = -1;
    }
    
    let tally;
    for (let i=0; i<this.width; i++) {
      for (let r=0; r<this.height; r++) {
        
        if (arr[i][r] != -1) {
          tally = 0;
          for (let f=-1; f<2; f++) {
            for (let s=-1; s<2; s++) {
              if (i+f > -1 && r+s > -1 && i+f < this.width && r+s < this.height) {
                if (arr[i+f][r+s] == -1) {
                  tally++;
                }
              }
            }
          }
          arr[i][r] = tally;
        }  
      }
    }
  }
  
  
  
}