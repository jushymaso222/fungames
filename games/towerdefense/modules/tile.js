class Tile {
    fillColor = color(200);
    outlineColor = color(21);
    tileType = "default";

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    show() {
        if (this.tileType == "startBlock") {
            this.fillColor = color(0,255,0);
        } else if (this.tileType == "pathBlock") {
            this.fillColor = color(255,248,220);
        } else if (this.tileType == "finishBlock") {
            this.fillColor = color(255, 0, 0);
        } else {
            this.fillColor = color(200);
        }

        fill(this.fillColor)
        stroke(this.outlineColor)
        strokeWeight(1)
        square(this.x, this.y, sizing.tileSize)
    }

    checkClick(mousex, mousey, cS) {
        if (mousex > this.x && mousex < this.x+sizing.tileSize && mousey > this.y && mousey < this.y+sizing.tileSize) {
            if (cS == "Starting Block") {
                this.tileType = "startBlock"
            } else if (cS == "Path Block") {
                this.tileType = "pathBlock"
            } else if (cS == "Finishing Block") {
                this.tileType = "finishBlock"
            }
            return this;
        } else {
            return false;
        }
    }
}