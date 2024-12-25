class Card {

    constructor(x, y, suit, rank, visible = false) {
        this.x = x;
        this.y = y;
        this.suit = suit;
        this.rank = rank;
        this.color;
        this.shape = symbols[suit]
    }

    show() {
        if (this.suit == "spade" || this.suit == "club") {
            this.color = color(0);
        } else if (this.suit) {
            this.color = color(255,0,0);
        }


        stroke(255);
        strokeWeight(5);
        fill(this.color);
        rect(this.x, this.y, sizing["cardWidth"], sizing["cardHeight"], 5)

        fill(255);
        noStroke();
        rect(this.x+10, this.y+10, sizing["cardWidth"]-20, sizing["cardHeight"]-20)

        fill(this.color);
        textSize(40);
        textFont(font);
        text(this.rank, this.x+20, this.y+50);
        if (this.rank == "10") {
            text(this.rank, this.x+sizing["cardWidth"]-65, this.y+sizing["cardHeight"]-20);
        } else {
            text(this.rank, this.x+sizing["cardWidth"]-45, this.y+sizing["cardHeight"]-20);
        }

        image(this.shape, this.x+25, this.y+95, 100, 100);
    }

    checkClick(mousex, mousey) {
        // console.log(`Card X: ${this.x}, Mouse X: ${mousex}, Card X2: ${this.x+sizing["cardWidth"]}\nCard Y: ${this.y}, Mouse Y: ${mousey}, Card Y2: ${this.y+sizing["cardHeight"]}`)
        if (mousex > this.x && mousex < this.x+sizing["cardWidth"] && mousey > this.y && mousey < this.y+sizing["cardHeight"]) {
            return this.suit, this.rank;
        } else {
            return false;
        }
    }
}