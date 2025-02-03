function startMenu() {
    let sizing = {

    }
    let positions = {
        chessY: 375,
        checkersY: 525
    }

    scaleList(sizing);
    scaleList(positions);

    fill(21)
    stroke(255)
    strokeWeight(1)
    rect(0,0,canvas.canvasWidth-.5, canvas.canvasHeight-.5)

    let obj = []
    textSize(canvas.buttonText)
    obj.push(new Button(((canvas.canvasWidth-textWidth("Chess")*1.5)/2),positions.chessY,"Chess",color(45),"startChess"))
    obj.push(new Button(((canvas.canvasWidth-textWidth("Checkers")*1.5)/2),positions.checkersY,"Checkers",color(45),"startCheckers"))


    return obj;
}

function chess() {
    background(21)

    let sizing = {
        tileSize: 100
    }
    let positions = {
        startingX: 100,
        startingY: 100,
        rowLabelY: 170,
        rowLabelX: 330,
        colLabelY: 70,
        colLabelX: 430,
        movesLabelX: 1250,
        backButtonX: 10,
        backButtonY: 10
    }

    scaleList(sizing);
    scaleList(positions);

    fill(21)
    stroke(255)
    strokeWeight(1)
    rect(0,0,canvas.canvasWidth-.5, canvas.canvasHeight-.5)

    let obj = []

    alpha = ["A","B","C","D","E","F","G","H"]
    tileX = (canvas.canvasWidth-(sizing.tileSize*8))/2;

    noStroke()
    fill(255)
    text("A",positions.rowLabelX, positions.rowLabelY)
    text("B",positions.rowLabelX, positions.rowLabelY+sizing.tileSize*1)
    text("C",positions.rowLabelX, positions.rowLabelY+sizing.tileSize*2)
    text("D",positions.rowLabelX, positions.rowLabelY+sizing.tileSize*3)
    text("E",positions.rowLabelX, positions.rowLabelY+sizing.tileSize*4)
    text("F",positions.rowLabelX, positions.rowLabelY+sizing.tileSize*5)
    text("G",positions.rowLabelX, positions.rowLabelY+sizing.tileSize*6)
    text("H",positions.rowLabelX, positions.rowLabelY+sizing.tileSize*7)

    text("1",positions.colLabelX, positions.colLabelY)
    text("2",positions.colLabelX+sizing.tileSize*1, positions.colLabelY)
    text("3",positions.colLabelX+sizing.tileSize*2, positions.colLabelY)
    text("4",positions.colLabelX+sizing.tileSize*3, positions.colLabelY)
    text("5",positions.colLabelX+sizing.tileSize*4, positions.colLabelY)
    text("6",positions.colLabelX+sizing.tileSize*5, positions.colLabelY)
    text("7",positions.colLabelX+sizing.tileSize*6, positions.colLabelY)
    text("8",positions.colLabelX+sizing.tileSize*7, positions.colLabelY)

    fill(100)
    text("Moves:",positions.movesLabelX, positions.colLabelY)

    temp = new Button(positions.backButtonX,positions.backButtonY,"< Back",color(21),"mainMenu")
    temp.textColor = color(100)
    obj.push(temp)

    inverse = false
    for (i = 0; i < 8; i++) {
        tileY = positions.startingY;
        for (j = 0; j < 8; j++) {
            if ((j % 2) == 0 && !inverse) {
                tileColor = color(251,247,245)
            } else if (!inverse) {
                tileColor = color(50)
            } else if ((j % 2) != 0) {
                tileColor = color(251,247,245)
            } else {
                tileColor = color(50)
            }
            tileName = `${alpha[j]}${i+1}`
            obj.push(new Tile(tileX,tileY,tileColor,sizing.tileSize,tileName))
            tileY += sizing.tileSize
        }
        if (inverse) {
            inverse = false
        } else {
            inverse = true
        }
        tileX += sizing.tileSize
    }

    for (i = 0; i < obj.length; i++) {
        if (obj[i] instanceof Tile) {
            if (obj[i].name.includes("G")) {
                obj[i].piece = symbols.pawnW;
            } else if (obj[i].name == "H1" || obj[i].name == "H8") {
                obj[i].piece = symbols.rookW;
            } else if (obj[i].name == "H2" || obj[i].name == "H7") {
                obj[i].piece = symbols.knightW;
            } else if (obj[i].name == "H3" || obj[i].name == "H6") {
                obj[i].piece = symbols.bishopW;
            } else if (obj[i].name == "H4") {
                obj[i].piece = symbols.queenW;
            } else if (obj[i].name == "H5") {
                obj[i].piece = symbols.kingW;
            } else if (obj[i].name.includes("B")) {
                obj[i].piece = symbols.pawnB;
            } else if (obj[i].name == "A1" || obj[i].name == "A8") {
                obj[i].piece = symbols.rookB;
            } else if (obj[i].name == "A2" || obj[i].name == "A7") {
                obj[i].piece = symbols.knightB;
            } else if (obj[i].name == "A3" || obj[i].name == "A6") {
                obj[i].piece = symbols.bishopB;
            } else if (obj[i].name == "A4") {
                obj[i].piece = symbols.queenB;
            } else if (obj[i].name == "A5") {
                obj[i].piece = symbols.kingB;
            }
        }
    }

    return obj
}

function checkers() {
    background(21)

    let sizing = {
        tileSize: 100
    }
    let positions = {
        startingX: 100,
        startingY: 100,
        rowLabelY: 170,
        rowLabelX: 330,
        colLabelY: 70,
        colLabelX: 430,
        movesLabelX: 1250,
        backButtonX: 10,
        backButtonY: 10
    }

    scaleList(sizing);
    scaleList(positions);

    fill(21)
    stroke(255)
    strokeWeight(1)
    rect(0,0,canvas.canvasWidth-.5, canvas.canvasHeight-.5)

    let obj = []

    tileX = (canvas.canvasWidth-(sizing.tileSize*8))/2;

    noStroke()
    fill(255)
    text("A",positions.rowLabelX, positions.rowLabelY)
    text("B",positions.rowLabelX, positions.rowLabelY+sizing.tileSize*1)
    text("C",positions.rowLabelX, positions.rowLabelY+sizing.tileSize*2)
    text("D",positions.rowLabelX, positions.rowLabelY+sizing.tileSize*3)
    text("E",positions.rowLabelX, positions.rowLabelY+sizing.tileSize*4)
    text("F",positions.rowLabelX, positions.rowLabelY+sizing.tileSize*5)
    text("G",positions.rowLabelX, positions.rowLabelY+sizing.tileSize*6)
    text("H",positions.rowLabelX, positions.rowLabelY+sizing.tileSize*7)

    text("1",positions.colLabelX, positions.colLabelY)
    text("2",positions.colLabelX+sizing.tileSize*1, positions.colLabelY)
    text("3",positions.colLabelX+sizing.tileSize*2, positions.colLabelY)
    text("4",positions.colLabelX+sizing.tileSize*3, positions.colLabelY)
    text("5",positions.colLabelX+sizing.tileSize*4, positions.colLabelY)
    text("6",positions.colLabelX+sizing.tileSize*5, positions.colLabelY)
    text("7",positions.colLabelX+sizing.tileSize*6, positions.colLabelY)
    text("8",positions.colLabelX+sizing.tileSize*7, positions.colLabelY)

    temp = new Button(positions.backButtonX,positions.backButtonY,"< Back",color(21),"mainMenu")
    temp.textColor = color(100)
    obj.push(temp)

    inverse = false
    for (i = 0; i < 8; i++) {
        tileY = positions.startingY;
        for (j = 0; j < 8; j++) {
            if ((j % 2) == 0 && !inverse) {
                tileColor = color(251,247,245)
            } else if (!inverse) {
                tileColor = color(50)
            } else if ((j % 2) != 0) {
                tileColor = color(251,247,245)
            } else {
                tileColor = color(50)
            }
            tileName = `${alpha[j]}${i+1}`
            obj.push(new Tile(tileX,tileY,tileColor,sizing.tileSize,tileName))
            tileY += sizing.tileSize
        }
        if (inverse) {
            inverse = false
        } else {
            inverse = true
        }
        tileX += sizing.tileSize
    }

    for (i = 0; i < obj.length; i++) {
        if (obj[i] instanceof Tile) {
            if (obj[i].name.includes("G") || obj[i].name.includes("H")) {
                obj[i].piece = symbols.checkerW;
            } else if (obj[i].name.includes("A") || obj[i].name.includes("B")) {
                obj[i].piece = symbols.checkerB;
            } 
        }
    }

    return obj
}