class Button {
    x = 0;
    y = 0;
    label = "button";
    color = color(21);
    outline = false;
    outlineColor = color(0);
    font = 'monospace';
    active = true;
    radius = 10;
    textColor = color(255);

    constructor(x, y, label, color) {
        this.x = x;
        this.y = y;
        this.label = label;
        this.width = textWidth(label)*1.3;
        let textHeight = textAscent() + textDescent();
        this.height = textHeight*1.3;
        this.fillColor = color;
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
        textSize(sizing.buttonText);

        text(this.label, this.x + ((this.width - textWidth(this.label)) / 2), this.y + (this.height / 2) + (textAscent() / 2) - (textDescent() / 2));

    }
}