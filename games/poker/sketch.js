var cards = [];
let font;
let symbols = {};
let buttons = [];
let restartImg;

let hands = 5;
let discards = 4;
let total = 0;
let feedback = "";

const sizing = {
  "canvasHeight": 1000,
  "canvasWidth": 1600,
  "cardWidth": 150,
  "cardHeight": 300,
  "buttonWidth": 200,
  "buttonHeight": 70,
  "cardSpacing": 20
};

//VARIABLES

let discard = [];
let slots = {
  "play": {
    "cards": [],
    "y": 100,
    "x": 0
  },
  "hand": {
    "cards": [],
    "y": 600,
    "x": 0
  }
};

//----------------------

function preload() {
  font = loadFont("envy.otf");

  symbols["spade"] = loadImage("images/cards/spade.jpg");
  symbols["club"] = loadImage("images/cards/club.jpg");
  symbols["heart"] = loadImage("images/cards/heart.jpg");
  symbols["diamond"] = loadImage("images/cards/diamond.jpg");

  restartImg = loadImage("images/restart.png");
}

function createDeck() {
  let tempSuits = ["spade","club","heart","diamond"]
  let tempRanks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

  for (let i = 0; i < tempSuits.length; i++) {
    for (let j = 0; j < tempRanks.length; j++) {
      cards.push(new Card(10,10,tempSuits[i],tempRanks[j]));
    }
  }
}

function bubbleSort(deck) {
  let rankOrder = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
  var i, j, temp;
  for (i = 0; i < deck.length - 1; i++){
    for (j = 0; j < deck.length - i - 1; j++){
      let num1 = rankOrder.indexOf(deck[j].rank);
      let num2 = rankOrder.indexOf(deck[j+1].rank);

      if (num1 < num2) 
      {
          temp = deck[j];
          deck[j] = deck[j + 1];
          deck[j + 1] = temp;
      }
    }
  }
  return deck;
}

function scoreSpecial(rank) {
  if (rank == "K" || rank == "Q" || rank == "J") {
    return 10;
  } else if (rank == "A") {
    return 11;
  } else {
    return false;
  }
}

function hasPair(list) {
  for (i = 0; i < list.length; i++) {
    for (j = 0; j < list.length; j++) {
      if (list[i] == list[j] && i != j) {
        let temp = [list[i], list[j]];
        return temp;
      }
    }
  }
  return false;
}

function hasTwoPair(list) {
  let pairs = 0;
  let scoringCards = [];
  let temp = [...list];

  for (i = 0; i < temp.length; i++) {
    for (j = 0; j < temp.length; j++) {
      if (temp[i] == temp[j] && i != j && pairs == 0) {
        pairs += 1;
        scoringCards.push(temp[i]);
        scoringCards.push(temp[j]);
        temp = temp.filter(e => e !== temp[i])
      }
    }
  }
  if (pairs > 0 && temp.length > 0) {
    for (i = 0; i < temp.length; i++) {
      for (j = 0; j < temp.length; j++) {
        if (temp[i] == temp[j] && i != j) {
          scoringCards.push(temp[i], temp[j]);
          return scoringCards;
        }
      }
    }
  }
  return false;
}

function hasTriplet(list) {
  let counts = {};

  for (i = 0; i < list.length; i++) {
    if (list[i] in counts) {
      counts[list[i]] += 1;
    } else {
      counts[list[i]] = 1;
    }
  }
  for (key in counts) {
    if (counts[key] == 3) {
      return [key, key, key];
    }
  }

  return false;
}

function hasQuad(list) {
  let counts = {};

  for (i = 0; i < list.length; i++) {
    if (list[i] in counts) {
      counts[list[i]] += 1;
    } else {
      counts[list[i]] = 1;
    }
  }
  for (key in counts) {
    if (counts[key] == 4) {
      return [key, key, key, key];
    }
  }

  return false;
}

function hasFlush(list) {
  let counts = {};

  for (i = 0; i < list.length; i++) {
    if (list[i] in counts) {
      counts[list[i]] += 1;
    } else {
      counts[list[i]] = 1;
    }
  }

  for (key in counts) {
    if (counts[key] == 5) {
      return true;
    }
  }

  return false;
}

function hasFullhouse(list) {
  let counts = {};
  let matches = 0;

  for (i = 0; i < list.length; i++) {
    if (list[i] in counts) {
      counts[list[i]] += 1;
    } else {
      counts[list[i]] = 1;
    }
  }

  for (key in counts) {
    if (counts[key] == 3) {
      matches += 1;
    }
  }

  if (matches > 0) {
    for (key in counts) {
      if (counts[key] == 2) {
        return true;
      }
    }
  }

  return false;
}

function hasStraight(list) {
  if (list.length == 5) {
    let rankOrder = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

    if (list[0] == "A" && list[1] == "5" && list[2] == "4" && list[3] == "3" && list[4] == "2") {
      return true;
    }

    for (i = 0; i < list.length-1; i++) {
      let index = rankOrder.indexOf(list[i]);
      if (list[i] != list[i+1]) {
        if (list[i+1] != rankOrder[index+1]) {
          return false;
        }
      }
    }

    return true;
  } else {
    return false;
  }
}

function scoreHand(deck) {
  let ranks = [];
  let suits = [];
  for (i = 0; i < deck.length; i++) {
    ranks.push(deck[i].rank);
    suits.push(deck[i].suit);
  }

  let score = 0;
  let multiplier = 1;

  if (hasStraight(ranks) && hasFlush(suits)) { //Straight Flush
    feedback = "Straight Flush"
    let scoreList = ranks;
    for (i = 0; i < scoreList.length; i++) {
      let special = scoreSpecial(scoreList[i]);
      if (special) {
        score += special;
      } else {
        score += parseInt(scoreList[i]);
      }
    }
    multiplier = 10;
  } else if (Array.isArray(hasQuad(ranks))) { //Four of a Kind
    feedback = "Four of a Kind"
    let scoreList = hasQuad(ranks);
    for (i = 0; i < scoreList.length; i++) {
      let special = scoreSpecial(scoreList[i]);
      if (special) {
        score += special;
      } else {
        score += parseInt(scoreList[i]);
      }
    }
    multiplier = 8;
  } else if (hasFullhouse(ranks)) { //Full House
    feedback = "Full House"
    let scoreList = ranks;
    for (i = 0; i < scoreList.length; i++) {
      let special = scoreSpecial(scoreList[i]);
      if (special) {
        score += special;
      } else {
        score += parseInt(scoreList[i]);
      }
    }
    multiplier = 6;
  } else if (hasFlush(suits)) { //Flush
    feedback = "Flush"
    let scoreList = ranks;
    for (i = 0; i < scoreList.length; i++) {
      let special = scoreSpecial(scoreList[i])
      if (special) {
        score += special;
      } else {
        score += parseInt(scoreList[i]);
      }
    }
    multiplier = 4;
  } else if (hasStraight(ranks)) { //Straight
    feedback = "Straight"
    let scoreList = ranks;
    for (i = 0; i < scoreList.length; i++) {
      let special = scoreSpecial(scoreList[i])
      if (special) {
        score += special;
      } else {
        score += parseInt(scoreList[i]);
      }
    }
    multiplier = 4;
  } else if (Array.isArray(hasTriplet(ranks))) { //Three of a Kind
    feedback = "Three of a Kind"
    let scoreList = hasTriplet(ranks);
    for (i = 0; i < scoreList.length; i++) {
      let special = scoreSpecial(scoreList[i])
      if (special) {
        score += special;
      } else {
        score += parseInt(scoreList[i]);
      }
    }
    multiplier = 3;
  } else if (Array.isArray(hasTwoPair(ranks))) { //Two Pair
    feedback = "Two Pair"
    let scoreList = hasTwoPair(ranks);
    for (i = 0; i < scoreList.length; i++) {
      let special = scoreSpecial(scoreList[i])
      if (special) {
        score += special;
      } else {
        score += parseInt(scoreList[i]);
      }
    }
    multiplier = 3;
  } else if (Array.isArray(hasPair(ranks))) { //Pair
    feedback = "Pair"
    let scoreList = hasPair(ranks);
    for (i = 0; i < scoreList.length; i++) {
      let special = scoreSpecial(scoreList[i])
      if (special) {
        score += special;
      } else {
        score += parseInt(scoreList[i]);
      }
    }
    multiplier = 2;
  } else { //High Card
    feedback = "High Card"
    let special = scoreSpecial(ranks[0])
    if (special) {
      score += special;
    } else {
      score += parseInt(ranks[0]);
    }
  }
  total += score*multiplier;
  discardCards();
  getHand();
  slots.hand.cards = bubbleSort(slots.hand.cards);
}

function discardCards() {
  for (i = 0; i < slots.play.cards.length; i++) {
    discard.push(slots.play.cards[i]);
  }
  slots.play.cards = [];
}

function shuffleCards(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function getHand() {
  for (let i = 0; i < 8; i++) {
    if (cards.length > 0 && slots.hand.cards.length <8) {
      let tempCard = cards.splice(0, 1)[0];
      slots.hand.cards.push(tempCard);
    }
  }
  slots.hand.x = (sizing["canvasWidth"] - ((slots.hand.cards.length*sizing["cardWidth"])+(slots.hand.cards.length*sizing["cardSpacing"])) )/2;
}

function setup() {
  createCanvas(sizing["canvasWidth"], sizing["canvasHeight"]);

  createDeck();
  for (i = 0; i < 5; i++) {
    shuffleCards(cards);
  }

  getHand();
  slots.hand.cards = bubbleSort(slots.hand.cards);

  buttons.push(new Button(575, 920, "Discard", color(188,52,52)))
  buttons.push(new Button(807, 920, "Play", color(75,199,60)))
}

function mousePressed() {
  let cardClicked = false;

  if (!cardClicked) {
    for (let i = 0; i < slots.hand.cards.length; i++) {
      let test = slots.hand.cards[i].checkClick(mouseX, mouseY);
      if (test && slots.play.cards.length < 5) {
        let temp = slots.hand.cards.splice(i, 1)[0];
        slots.play.cards.push(temp);
        cardClicked = true;
        slots.hand.x = (sizing["canvasWidth"] - ((slots.hand.cards.length*sizing["cardWidth"])+(slots.hand.cards.length*sizing["cardSpacing"])) )/2;
        slots.play.x = (sizing["canvasWidth"] - ((slots.play.cards.length*sizing["cardWidth"])+(slots.play.cards.length*sizing["cardSpacing"])) )/2;
        slots.hand.cards = bubbleSort(slots.hand.cards);
        slots.play.cards = bubbleSort(slots.play.cards);
      }
    }
  }

  if (!cardClicked) {
    for (let i = 0; i < slots.play.cards.length; i++) {
      let test = slots.play.cards[i].checkClick(mouseX, mouseY);
      if (test) {
        let temp = slots.play.cards.splice(i, 1)[0];
        slots.hand.cards.push(temp);
        cardClicked = true;
        slots.hand.x = (sizing["canvasWidth"] - ((slots.hand.cards.length*sizing["cardWidth"])+(slots.hand.cards.length*sizing["cardSpacing"])) )/2;
        slots.play.x = (sizing["canvasWidth"] - ((slots.play.cards.length*sizing["cardWidth"])+(slots.play.cards.length*sizing["cardSpacing"])) )/2;
        slots.hand.cards = bubbleSort(slots.hand.cards);
        slots.play.cards = bubbleSort(slots.play.cards);
      }
    }
  }

  for (let i = 0; i < buttons.length; i++) {
    let test = buttons[i].checkClick(mouseX, mouseY);
    if (test == "Discard" && slots.play.cards.length > 0 && discards > 0) {
      discards -= 1;
      discardCards()
      getHand();
      slots.hand.cards = bubbleSort(slots.hand.cards);
    } else if (test == "Play" && hands > 0) {
      if (slots.play.cards.length > 0) {
        hands -= 1;
        scoreHand(slots.play.cards);
      }
    }
  }

  if (mouseX > ((sizing["canvasWidth"]/2)-(150)/2) && mouseX < ((sizing["canvasWidth"]/2)-(150)/2)+150 && mouseY > (sizing["canvasHeight"]/2) && mouseY < (sizing["canvasHeight"]/2)+150 && hands == 0) {
    discard.forEach((card) => {
      cards.push(card);
    })
    if (discard.length == 52) {
      let visibleCard = Math.floor(Math.random() * cards.length);
      cards[visibleCard].visible = true;
    }
    discard = [];
    for (i = 0; i < 5; i++) {
      shuffleCards(cards);
    }
    getHand();
    slots.hand.cards = bubbleSort(slots.hand.cards);

    hands = 5;
    discards = 4;
    total = 0;
    feedback = "";
    cards = [];
    discard = [];
    createDeck();
    for (i = 0; i < 5; i++) {
      shuffleCards(cards);
    }
    getHand();
    slots.hand.cards = bubbleSort(slots.hand.cards);
  }
}

function keyPressed() {
  if (key == " ") {
    if (cards.length > 0) {
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].visible) {
          cards[i].visible = false;
          discardCard(i);
        }
      }

      if (cards.length > 1) {
        let visibleCard = Math.floor(Math.random() * cards.length);
        cards[visibleCard].visible = true;
      } else if (cards.length == 1) {
        cards[0].visible = true;
      }
    }
  } else if (key == "r") {
    discard.forEach((card) => {
      cards.push(card);
    })
    if (discard.length == 52) {
      let visibleCard = Math.floor(Math.random() * cards.length);
      cards[visibleCard].visible = true;
    }
    discard = [];
    for (i = 0; i < 5; i++) {
      shuffleCards(cards);
    }
    getHand();
    slots.hand.cards = bubbleSort(slots.hand.cards);
  }
}

function draw() {
  if (hands > 0) {
    background(21);

    // if (cards.length > 0) {
    //   cards.forEach((card) => {
    //     card.show();
    //   })
    // }

    buttons.forEach((button) => {
      button.show();
    })

    for (let i = 0; i < slots.hand.cards.length; i++) {
      slots.hand.cards[i].x = slots.hand.x+((i*sizing["cardWidth"])+(i*sizing["cardSpacing"]));
      slots.hand.cards[i].y = slots.hand.y;
      slots.hand.cards[i].show();
    }

    for (let i = 0; i < slots.play.cards.length; i++) {
      slots.play.cards[i].x = slots.play.x+((i*sizing["cardWidth"])+(i*sizing["cardSpacing"]));
      slots.play.cards[i].y = slots.play.y;
      slots.play.cards[i].show();
    }
    
    fill(255)
    text(`Deck: ${cards.length}`, 20, 980);
    text(`Discarded: ${discard.length}`, 240, 980);

    fill(255)
    text("Hands", 20, 50);
    text("Discards", 160, 50);
    text("Score", 1455, 50);
    text(hands, 65, 100);
    text(discards, 240, 100);
    text(total, 1500, 100);
    text(feedback, ((sizing["canvasWidth"]/2)-(textWidth(feedback)/2)), 50);
  } else {
    background(21);
    textSize(50);
    text(`Overall Score: ${total}`, ((sizing["canvasWidth"]/2)-(textWidth(`Overall Score: ${total}`)/2)), sizing["canvasHeight"]/2-80);
    image(restartImg,  ((sizing["canvasWidth"]/2)-(150)/2), sizing["canvasHeight"]/2, 150, 150)
  }
}