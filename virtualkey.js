class VirtualKey {
  constructor(xoffset, yoffset, letter, cellWidth = 0) {
    this.x = xoffset;
    this.y = yoffset;
    this.xsize = sizing.cellsize + cellWidth;
    this.ysize = sizing.cellsize*0.75;
    this.active = true;
    this.fillColor = color(170);
    this.letter = letter
  }
  
  show() {
    noStroke();
    fill(this.fillColor);
    textFont(font);
    rect(this.x, this.y, this.xsize/2, this.ysize, 5)
    noStroke();
    fill(255);
    textSize(sizing.heading3);
    text(this.letter, (this.x+this.xsize/4)-(textWidth(this.letter)/2), ((this.y+(this.ysize/2)) + (textAscent() + textDescent()) / 2 - textDescent()*.50));
  }
  
  checkClick(xpos, ypos) {
    if (xpos > this.x && xpos < this.x+this.xsize/2 && ypos > this.y && ypos < this.y+this.ysize) {
      return true;
    } else {
      return false;
    }
  }
}