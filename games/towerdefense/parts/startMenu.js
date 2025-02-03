function startMenu(objectList) {
    background(21)

    if (objectActive) {
        let buttonHeight = textHeight*1.3
        objectList.push(new Button((sizing.canvasWidth-(textWidth("Select Map")*1.3))/2,(sizing.canvasHeight/2)-(buttonHeight+sizing.buttonGap),"Select Map",color(68, 235, 171),"select"));
        objectList.push(new Button((sizing.canvasWidth-(textWidth("Create Map")*1.3))/2,(sizing.canvasHeight/2)+sizing.buttonGap,"Create Map",color(68, 235, 171),"create"));
    }

    objectActive = false;
}