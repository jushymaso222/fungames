function startMenu(objectList) {
    objectList.push(new Button((sizing.canvasWidth-(textWidth("Select Map")*1.3))/2,300,"Select Map",color(0)));
    objectList.push(new Button((sizing.canvasWidth-(textWidth("Create Map")*1.3))/2,370,"Create Map",color(0)));
}