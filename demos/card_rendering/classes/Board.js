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
    this._focusedCard = null;
    this._focusedToken = null;
  }

  draw(context) {
    for (let card of this._cardsOnBorad) {
      card.draw(context);
    }

    for (let token of this._tokens) {
      token.draw(context);
    }

    this._tokenPanel.draw(context);
    this._AItokenPanel.draw(context);

    var level1_deck = document.getElementById("level1_deck");
    var level2_deck = document.getElementById("level2_deck");
    var level3_deck = document.getElementById("level3_deck");
    context.drawImage(level3_deck, 130, 150, 205, 205);
    context.drawImage(level2_deck, 130, 390, 205, 205);
    context.drawImage(level1_deck, 130, 630, 205, 205);

    if (this._focusedCard != null) {
      roundedRectangle(
        context,
        this._focusedCard.x,
        this._focusedCard.y,
        180,
        200,
        20,
        3,
        "#F3E45F"
      );
    }

    if (this._focusedToken != null) {
      context.strokeStyle = "#F3E45F";
      context.lineWidth = "3";
      context.beginPath();
      context.arc(
        this._focusedToken.x,
        this._focusedToken.y,
        50,
        0,
        2 * Math.PI
      );
      context.stroke();
    }
  }

  initCards() {
    this._cardsOnBorad = [];

    this._level1Cards = [];
    this._level2Cards = [];
    this._level3Cards = [];

    for (let i = 0; i < 40; i++) {
      this._level1Cards.push(CARDS[i]);
    }

    shuffle(this._level1Cards);

    for (let i = 40; i < 70; i++) {
      this._level2Cards.push(CARDS[i]);
    }

    shuffle(this._level2Cards);

    for (let i = 70; i < 90; i++) {
      this._level3Cards.push(CARDS[i]);
    }

    shuffle(this._level3Cards);

    let slot = 0;

    while (slot < 4) {
      let x = 480 + slot * 250;
      let y = 630;
      let level1CardData = {
        level: this._level1Cards[0].level,
        color: this._level1Cards[0].color,
        point: this._level1Cards[0].point,
        white: this._level1Cards[0].white,
        blue: this._level1Cards[0].blue,
        green: this._level1Cards[0].green,
        red: this._level1Cards[0].red,
        black: this._level1Cards[0].black,
      };

      let card = new Card(x, y, level1CardData);
      this._cardsOnBorad.push(card);
      slot++;
      this._level1Cards.shift();
    }
    while (slot < 8) {
      let x = 480 + (slot - 4) * 250;
      let y = 390;
      let level2CardData = {
        level: this._level2Cards[0].level,
        color: this._level2Cards[0].color,
        point: this._level2Cards[0].point,
        white: this._level2Cards[0].white,
        blue: this._level2Cards[0].blue,
        green: this._level2Cards[0].green,
        red: this._level2Cards[0].red,
        black: this._level2Cards[0].black,
      };

      let card = new Card(x, y, level2CardData);
      this._cardsOnBorad.push(card);
      slot++;
      this._level2Cards.shift();
    }
    while (slot < 12) {
      let x = 480 + (slot - 8) * 250;
      let y = 150;
      let level3CardData = {
        level: this._level3Cards[0].level,
        color: this._level3Cards[0].color,
        point: this._level3Cards[0].point,
        white: this._level3Cards[0].white,
        blue: this._level3Cards[0].blue,
        green: this._level3Cards[0].green,
        red: this._level3Cards[0].red,
        black: this._level3Cards[0].black,
      };

      let card = new Card(x, y, level3CardData);
      this._cardsOnBorad.push(card);
      slot++;
      this._level3Cards.shift();
    }
  }

  initTokenPanel() {
    let x = 250;
    let y = 870;
    let colors = {
      white: 0,
      blue: 0,
      green: 0,
      red: 0,
      black: 0,
    };

    let fixColors = {
      white: 0,
      blue: 0,
      green: 0,
      red: 0,
      black: 0,
    };
    let panel = new TokenPanel(x, y, colors, fixColors, 0);

    this._tokenPanel = panel;
  }

  initAITokenPanel() {
    let x = 250;
    let y = 15;

    let colors = {
      white: 0,
      blue: 0,
      green: 0,
      red: 0,
      black: 0,
    };

    let fixColors = {
      white: 0,
      blue: 0,
      green: 0,
      red: 0,
      black: 0,
    };
    let panel = new TokenPanel(x, y, colors, fixColors, 0);

    this._AItokenPanel = panel;
  }

  initTokens() {
    this._tokens = [];

    let x = 1750;

    let colors = [WHITE, BLUE, GREEN, RED, BLACK];

    for (let i = 0; i < colors.length; i++) {
      let y = 200 + i * 150;
      let token = new Token(x, y, colors[i], 4);
      this._tokens.push(token);
    }
  }

  findCardAtCursor(mouseEvent) {
    for (let card of this._cardsOnBorad) {
      if (card.isUnderCursor(mouseEvent)) {
        return card;
      }
    }
    return null;
  }

  findTokenAtCursor(mouseEvent) {
    for (let i = 0; i < 5; i++) {
      if (
        Math.floor((mouseEvent.x - 1695) / 105) == 0 &&
        Math.floor((mouseEvent.y - (150 + i * 150)) / 100) == 0
      ) {
        return this._tokens[i];
      }
    }
    return null;
  }

  fillTokenPanel(mouseEvent) {
    let i = 0;
    for (let token of this._tokens) {
      if (token == this.findTokenAtCursor(mouseEvent) && this._tokens[i].value > 0) {
        this._tokens[i].value--;
        this.increaseTokenPanel(this._tokens[i].color, "basic");
      }
      i++;
    }
  }

  increaseTokenPanel(color, valueType) {
    if (color == WHITE) {
      if(valueType == "basic"){
        this._tokenPanel.colors.white++;
      }else{
        this._tokenPanel.fixColors.white++;
      }
    } if (color == BLUE) {
      if(valueType == "basic"){
        this._tokenPanel.colors.blue++;
      }else{
        this._tokenPanel.fixColors.blue++;
      }
    } if (color == GREEN) {
      if(valueType == "basic"){
        this._tokenPanel.colors.green++;
      }else{
        this._tokenPanel.fixColors.green++;
      }
    } if (color == RED) {
      if(valueType == "basic"){
        this._tokenPanel.colors.red++;
      }else{
        this._tokenPanel.fixColors.red++;
      }
    } if (color == BLACK) {
      if(valueType == "basic"){
        this._tokenPanel.colors.black++;
      }else{
        this._tokenPanel.fixColors.black++;
      }
    }
  }

  switchCard(mouseEvent, slot){
    if (
      this.findCardAtCursor(mouseEvent).cardData.level == 1 &&
      this._level1Cards.length > 0
    ) {
      this._cardsOnBorad[slot].cardData = this._level1Cards[0];
      this._level1Cards.shift();
    } else if (
      this.findCardAtCursor(mouseEvent).cardData.level == 2 &&
      this._level2Cards.length > 0
    ) {
      this._cardsOnBorad[slot].cardData = this._level2Cards[0];
      this._level2Cards.shift();
    } else if (
      this.findCardAtCursor(mouseEvent).cardData.level == 3 &&
      this._level3Cards.length > 0
    ) {
      this._cardsOnBorad[slot].cardData = this._level3Cards[0];
      this._level3Cards.shift();
    }
  }

  handleTokenExchange(slot){
    if(this._cardsOnBorad[slot].cardData.white > 0){
      let diff = this._cardsOnBorad[slot].cardData.white - this._tokenPanel.fixColors.white;
      console.log(diff);
      if(diff > 0){
        this._tokenPanel.colors.white -= diff;
        this._tokens[0].value += diff;
      }
    }
    if(this._cardsOnBorad[slot].cardData.blue > 0){
      let diff = this._cardsOnBorad[slot].cardData.blue - this._tokenPanel.fixColors.blue;
      if(diff > 0){
        this._tokenPanel.colors.blue -= diff;
        this._tokens[1].value += diff;
      }
    }
    if(this._cardsOnBorad[slot].cardData.green > 0){
      let diff = this._cardsOnBorad[slot].cardData.green - this._tokenPanel.fixColors.green;
      if(diff > 0){
        this._tokenPanel.colors.green -= diff;
        this._tokens[2].value += diff;
      }
    }
    if(this._cardsOnBorad[slot].cardData.red > 0){
      let diff = this._cardsOnBorad[slot].cardData.red - this._tokenPanel.fixColors.red;
      if(diff > 0){
        this._tokenPanel.colors.red -= diff;
        this._tokens[3].value += diff;
      }
    }
    if(this._cardsOnBorad[slot].cardData.black > 0){
      let diff = this._cardsOnBorad[slot].cardData.black - this._tokenPanel.fixColors.black;
      if(diff > 0){
        this._tokenPanel.colors.black -= diff;
        this._tokens[4].value += diff;
      }
    }

    this.increaseTokenPanel(this._cardsOnBorad[slot].cardData.color, "fixValue");
  }


  buyCard(mouseEvent) {
    if (this.findCardAtCursor(mouseEvent) != null) {
      let i = 0;
      for (let card of this._cardsOnBorad) {
        if (card == this.findCardAtCursor(mouseEvent)) {
          break;
        } else {
          i++;
        }
      }
      if(this._cardsOnBorad[i].cardData.white <= (this._tokenPanel.colors.white + this._tokenPanel.fixColors.white) 
      && this._cardsOnBorad[i].cardData.blue <= (this._tokenPanel.colors.blue + this._tokenPanel.fixColors.blue) 
      && this._cardsOnBorad[i].cardData.green <= (this._tokenPanel.colors.green + this._tokenPanel.fixColors.green) 
      && this._cardsOnBorad[i].cardData.red <= (this._tokenPanel.colors.red + this._tokenPanel.fixColors.red) 
      && this._cardsOnBorad[i].cardData.black <= (this._tokenPanel.colors.black + this._tokenPanel.fixColors.black)){
        this._tokenPanel.point += this._cardsOnBorad[i].cardData.point;
        this.handleTokenExchange(i);
        this.switchCard(mouseEvent, i);
      }
    }
  }

  mouseDown(mouseEvent) {
    this.fillTokenPanel(mouseEvent);
    this.buyCard(mouseEvent);
  }

  mouseMove(mouseEvent) {
    this._focusedCard = this.findCardAtCursor(mouseEvent);
    this._focusedToken = this.findTokenAtCursor(mouseEvent);

    if (this._focusedCard == null && this._focusedToken == null) {
      canvas.style = "cursor : auto;";
    } else {
      canvas.style = "cursor : pointer;";
    }
  }
}
