function createMap(objectList) {
    background(40)
    
    let buttonHeight = textHeight*1.3

    if (objectActive) {
        objectList.push(new Button(10,10,"Back",color(68, 235, 171),"main"));
        objectList.push(new Button(1000,100,"Starting Tile",color(68, 235, 171),"startBlock"));
        objectList.push(new Button(1000,200,"Path Tile",color(68, 235, 171),"pathBlock"));
        objectList.push(new Button(1000,300,"Finishing Tile",color(68, 235, 171),"finishBlock"));
        objectList.push(new Button(1000,500,"Save Map",color(68, 235, 171),"saveMap"));

        for (x = 0; x < (sizing.canvasWidth-(5*sizing.tileSize)); x+=sizing.tileSize) {
            for (y = sizing.tileSize; y < sizing.canvasHeight; y+=sizing.tileSize) {
                objectList.push(new Tile(x,y))
            }
        }
    }

    noStroke()
    fill(255)
    text(currentSelection,1000,800)

    objectActive = false;
}