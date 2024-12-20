class Cell {
  
  constructor(xoffset, yoffset) {
    this.x = xoffset;
    this.y = yoffset;
    this.size = sizing.cellsize;
    this.fillColor = color(21);
    this.outlineColor = color(90);
    this.textColor = color(255);
    this.text = "";
  }
  
  show() {
    stroke(this.outlineColor);
    strokeWeight(2);
    fill(this.fillColor);
    textFont(font);
    square(this.x, this.y, this.size); 
    noStroke();
    fill(this.textColor);
    textSize(sizing.heading2);
    text(this.text, (this.x+this.size/2)-(textWidth(this.text)/2), ((this.y+(this.size/2)) + (textAscent() + textDescent()) / 2 - textDescent()*.50));
  }
}