function createMap(objectList) {
    background(21)
    
    let buttonHeight = textHeight*1.3
    objectList.push(new Button(10,10,"Back",color(68, 235, 171),"main"));

    for (x = 0; x < sizing.canvasWidth; x+=sizing.tileSize) {
        for (y = sizing.tileSize; y < sizing.canvasHeight; y+=sizing.tileSize) {
            objectList.push(new Tile(x,y))
        }
    }
}