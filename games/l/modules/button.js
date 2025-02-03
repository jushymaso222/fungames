class Button {
    x = 0;
    y = 0;
    label = "button";
    color = color(21);
    outline = false;
    outlineColor = color(0);
    font = 'monospace';
    active = true;
    radius = 15;
    textColor = color(255);

    constructor(x, y, label, color, action) {
        this.x = x;
        this.y = y;
        this.label = label;
        textSize(canvas.buttonText);
        this.width = textWidth(this.label)*1.5;
        this.textHeight = textAscent() + textDescent();
        this.height = this.textHeight*1.3;
        this.fillColor = color;
        this.action = action;
    }

    show() {
        if (this.outline) {
            stroke(this.outlineColor);
            strokeWeight(2);
        } else {
            noStroke();
        }

        fill(this.fillColor);

        rect(this.x, this.y, this.width, this.height, this.radius);

        noStroke();
        fill(this.textColor);

        text(this.label, this.x + ((this.width - textWidth(this.label)) / 2), this.y + (this.height / 2) + (textAscent() / 2) - (textDescent() / 2));
    }

    checkClick(mousex, mousey) {
        if (mousex > this.x && mousex < this.x+this.width && mousey > this.y && mousey < this.y+this.height) {
            return this.action;
        } else {
            return false;
        }
    }
}