class Button {

    constructor(x, y, name, color) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.color = color;
    }

    show() {
        stroke(0);
        strokeWeight(2);
        fill(this.color);
        rect(this.x, this.y, sizing["buttonWidth"], sizing["buttonHeight"], 5)

        textSize(40);
        textFont(font);
        noStroke();
        fill(255)
        text(this.name, this.x+(sizing["buttonWidth"]/2 - (textWidth(this.name)/2)), this.y+50);
    }

    checkClick(mousex, mousey) {
        if (mousex > this.x && mousex < this.x+sizing["buttonWidth"] && mousey > this.y && mousey < this.y+sizing["buttonHeight"]) {
            return this.name;
        } else {
            return false;
        }
    }
}