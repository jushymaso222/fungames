class Tile {
    fillColor = color(200);
    outlineColor = color(21);


    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    show() {
        fill(this.fillColor)
        stroke(this.outlineColor)
        strokeWeight(1)
        square(this.x, this.y, sizing.tileSize)
    }
}