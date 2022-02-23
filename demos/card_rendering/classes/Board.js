var canvas = null;
var canvasPosition = null;
var context = null;

/**
 * Syntax of the board
 */
class Board {
  constructor() {
    this.initCards();
    this.initTokenPanel();
    this.initAITokenPanel();
    this.initTokens();
    this.initDecks();
  }

  draw(context){
    for(let card of this._cards){
      card.draw(context);
    }

    for(let token of this._tokens){
      token.draw(context);
    }

    this._tokenPanel.draw(context);
    this._AItokenPanel.draw(context);

    context.drawImage(level3_deck, 130, 150, 205, 205);
    context.drawImage(level2_deck, 130, 390, 205, 205);
    context.drawImage(level1_deck, 130, 630, 205, 205);
  }

  initCards() {

    this._cards = [];

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
      this._cards.push(card);
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
      this._cards.push(card);
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
      this._cards.push(card);
      slot++;
      level3Cards.shift();
    }
  }

  initTokenPanel() {
    let x = 250;
    let y = 870;
    let panel = new TokenPanel(x, y, 1, 2, 3, 4, 5,6, 7, 8, 9, 10, 5);

    this._tokenPanel = panel;
  }

  initAITokenPanel() {
    let x = 250;
    let y = 15;
    let panel = new TokenPanel(x, y, 1, 2, 3, 4, 5,6, 7, 8, 9, 10, 5);

    this._AItokenPanel = panel;
  }


  initTokens() {

    this._tokens = [];

    let x = 1750;

    let colors = [WHITE, BLUE, GREEN, RED, BLACK];
    let randValue = Math.floor(Math.random() * 6);

    for (let i = 0; i < colors.length; i++) {
      let y = 200 + i * 150;
      let token = new Token(x, y, colors[i], randValue);
      this._tokens.push(token);
      randValue = Math.floor(Math.random() * 5);
    }
  }

  initDecks() {
    var level1_deck = document.getElementById("level1_deck");
    var level2_deck = document.getElementById("level2_deck");
    var level3_deck = document.getElementById("level3_deck");
  }
}



function roundedRectangle(x, y, w, h, radius, lineWidth, contourColor) {
  var r = x + w;
  var b = y + h;
  context.beginPath();
  context.strokeStyle = contourColor;
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


  pickCard(cardPosition(mouseEvent));
  pickToken(tokenPosition(mouseEvent));
  
}




function pickCard(position){
  if(position[0] > 0 && position[1] > 0){
    console.log(`Picked card from ${position[0]}. row and ${position[1]}. column.`);
  }
}




function pickToken(position){
  if(position != 0){
    console.log(`Picked token from ${position}. row.`);
  }
}




function cardPosition(mouseEvent){
  for(let i=0;i<12;i++){
    if(i<4 && Math.floor((mouseEvent.x-(480+i*250))/180) == 0 && Math.floor((mouseEvent.y-630)/200) == 0){
      return([3,i+1]);
    }else if(i<8 && Math.floor((mouseEvent.x-(480+(i-4)*250))/180) == 0 && Math.floor((mouseEvent.y-390)/200) == 0 ){
      return([2,i-3]);
    }else if(i<12 && Math.floor((mouseEvent.x-(480+(i-8)*250))/180) == 0 && Math.floor((mouseEvent.y-150)/200) == 0 ){
      return([1,i-7]);
    }
  }
  return 0;
}




function tokenPosition(mouseEvent){
  for(let i=0;i<5;i++){
    if(Math.floor((mouseEvent.x-1695)/105) == 0 && Math.floor((mouseEvent.y-(150+i*150))/100) == 0){
      return(i+1);
    }
  }
  return 0;
  
}




function mouseOver(mouseEvent){
  /*
    let r = cardPosition(mouseEvent)[0];
    let c = cardPosition(mouseEvent)[1];

  if(r != 0 && c != 0){

    let x = 480 + (c-1) * 250;
    let y = 150 + (r-1) * 240;

    roundedRectangle(x, y, 180, 200, 20, 3,  "yellow");
  }*/
}
