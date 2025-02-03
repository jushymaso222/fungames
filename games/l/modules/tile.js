class Tile {
    piece = null
    origColor;

    constructor(x,y,color,size, name) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.origColor = color;
        this.name = name;
    }

    show() {
        fill(this.color)
        noStroke()
        square(this.x,this.y,this.size)

        if (this.piece != null) {
            image(this.piece, this.x, this.y, this.size, this.size);
        }
    }

    checkClick(mousex, mousey) {
        if (mousex > this.x && mousex < this.x+this.size && mousey > this.y && mousey < this.y+this.size) {
            return this;
        } else {
            return false;
        }
    }
}