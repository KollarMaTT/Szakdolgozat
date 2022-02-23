var canvas = null;
var canvasPosition = null;
var context = null;

/**
 * Syntax of the board
 */
class Board {
  constructor() {
    this.initCards();
    this.initTokenPanel(250,15,1,2,3,4,5,6,7,8,9,10,5);
    this.initTokenPanel(250,870,1,2,3,4,5,6,7,8,9,10,5);
    this.initTokens();
    this.initDecks();
  }

  initCards() {

    let level1Cards = [];
    for(let i=0;i<40;i++){
      level1Cards.push(CARDS[i]);
    }
    
    shuffle(level1Cards);

    let level2Cards = [];
    for(let i=40;i<70;i++){
      level2Cards.push(CARDS[i]);
    }

    shuffle(level2Cards);

    let level3Cards = [];
    for(let i=70;i<90;i++){
      level3Cards.push(CARDS[i]);
    }

    shuffle(level3Cards);


    let slot = 0;

    while (slot < 4) {
      let x = 480 + slot * 250;
      let y = 630;

      let card = new Card(
        x,
        y,
        level1Cards[0].level,
        level1Cards[0].color,
        level1Cards[0].point,
        level1Cards[0].white,
        level1Cards[0].blue,
        level1Cards[0].green,
        level1Cards[0].red,
        level1Cards[0].black
      );
      card.draw(context);
      slot++;
      level1Cards.shift();
    }
    while (slot < 8) {
      let x = 480 + (slot - 4) * 250;
      let y = 390;

      let card = new Card(
        x,
        y,
        level2Cards[0].level,
        level2Cards[0].color,
        level2Cards[0].point,
        level2Cards[0].white,
        level2Cards[0].blue,
        level2Cards[0].green,
        level2Cards[0].red,
        level2Cards[0].black
      );
      card.draw(context);
      slot++;
      level2Cards.shift();
    }
    while (slot < 12) {
      let x = 480 + (slot - 8) * 250;
      let y = 150;

      let card = new Card(
        x,
        y,
        level3Cards[0].level,
        level3Cards[0].color,
        level3Cards[0].point,
        level3Cards[0].white,
        level3Cards[0].blue,
        level3Cards[0].green,
        level3Cards[0].red,
        level3Cards[0].black
      );
      card.draw(context);
      slot++;
      level3Cards.shift();
    }
  }

  initTokenPanel(x, y, white, blue, green, red, black, fixWhite, fixBlue, fixGreen, fixRed, fixBlack, point) {
    let panel = new TokenPanel(x, y, white, blue, green, red, black, fixWhite, fixBlue, fixGreen, fixRed, fixBlack, point);
    panel.draw(context);
  }

  initTokens() {
    let x = 1750;

    let colors = [WHITE, BLUE, GREEN, RED, BLACK];
    let randValue = Math.floor(Math.random() * 6);

    for (let i = 0; i < colors.length; i++) {
      let y = 200 + i * 150;
      let token = new Token(x, y, colors[i], randValue);
      token.draw(context);
      randValue = Math.floor(Math.random() * 5);
    }
  }

  initDecks() {
    var level1_deck = document.getElementById("level1_deck");
    var level2_deck = document.getElementById("level2_deck");
    var level3_deck = document.getElementById("level3_deck");
    context.drawImage(level3_deck, 130, 150, 205, 205);
    context.drawImage(level2_deck, 130, 390, 205, 205);
    context.drawImage(level1_deck, 130, 630, 205, 205);
  }
}

function roundedRectangle(x, y, w, h, radius, lineWidth) {
  var r = x + w;
  var b = y + h;
  context.beginPath();
  context.strokeStyle = "black";
  context.lineWidth = lineWidth;
  context.moveTo(x + radius, y);
  context.lineTo(r - radius, y);
  context.quadraticCurveTo(r, y, r, y + radius);
  context.lineTo(r, y + h - radius);
  context.quadraticCurveTo(r, b, r - radius, b);
  context.lineTo(x + radius, b);
  context.quadraticCurveTo(x, b, x, b - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.stroke();
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function mouseDown(mouseEvent) {
  console.log("Click at (" + mouseEvent.x + ", " + mouseEvent.y + ")");

  for(let i=0;i<12;i++){
    if(i<4 && Math.floor((mouseEvent.x-(480+i*250))/180) == 0 && Math.floor((mouseEvent.y-630)/200) == 0){
      pickCard(3,i+1);
    }else if(i<8 && Math.floor((mouseEvent.x-(480+(i-4)*250))/180) == 0 && Math.floor((mouseEvent.y-390)/200) == 0 ){
      pickCard(2,i-3);
    }else if(i<12 && Math.floor((mouseEvent.x-(480+(i-8)*250))/180) == 0 && Math.floor((mouseEvent.y-150)/200) == 0 ){
      pickCard(1,i-7);
    }
  }

  for(let i=0;i<5;i++){
    if(Math.floor((mouseEvent.x-1695)/105) == 0 && Math.floor((mouseEvent.y-(150+i*150))/100) == 0){
      pickToken(i+1);
    }
  }
}

function pickCard(row, column){
  console.log(`Picked card from ${row}. row and ${column}. column.`);
}

function pickToken(row){
  console.log(`Picked token from ${row}. row.`);
}

function mouseOver(){
  
}
