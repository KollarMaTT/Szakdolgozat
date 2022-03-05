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
    for (let card of this._cards) {
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
    this._cards = [];

    let level1Cards = [];
    for (let i = 0; i < 40; i++) {
      level1Cards.push(CARDS[i]);
    }

    shuffle(level1Cards);

    let level2Cards = [];
    for (let i = 40; i < 70; i++) {
      level2Cards.push(CARDS[i]);
    }

    shuffle(level2Cards);

    let level3Cards = [];
    for (let i = 70; i < 90; i++) {
      level3Cards.push(CARDS[i]);
    }

    shuffle(level3Cards);

    let slot = 0;

    while (slot < 4) {
      let x = 480 + slot * 250;
      let y = 630;
      let level1CardData = {
        level: level1Cards[0].level,
        color: level1Cards[0].color,
        point: level1Cards[0].point,
        white: level1Cards[0].white,
        blue: level1Cards[0].blue,
        green: level1Cards[0].green,
        red: level1Cards[0].red,
        black: level1Cards[0].black,
      };

      let card = new Card(x, y, level1CardData);
      this._cards.push(card);
      slot++;
      level1Cards.shift();
    }
    while (slot < 8) {
      let x = 480 + (slot - 4) * 250;
      let y = 390;
      let level2CardData = {
        level: level2Cards[0].level,
        color: level2Cards[0].color,
        point: level2Cards[0].point,
        white: level2Cards[0].white,
        blue: level2Cards[0].blue,
        green: level2Cards[0].green,
        red: level2Cards[0].red,
        black: level2Cards[0].black,
      };

      let card = new Card(x, y, level2CardData);
      this._cards.push(card);
      slot++;
      level2Cards.shift();
    }
    while (slot < 12) {
      let x = 480 + (slot - 8) * 250;
      let y = 150;
      let level3CardData = {
        level: level3Cards[0].level,
        color: level3Cards[0].color,
        point: level3Cards[0].point,
        white: level3Cards[0].white,
        blue: level3Cards[0].blue,
        green: level3Cards[0].green,
        red: level3Cards[0].red,
        black: level3Cards[0].black,
      };

      let card = new Card(x, y, level3CardData);
      this._cards.push(card);
      slot++;
      level3Cards.shift();
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
    for (let card of this._cards) {
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

  handleTokenExchange(mouseEvent) {
    let i = 0;
    for (let token of this._tokens) {
      if (token == this.findTokenAtCursor(mouseEvent)) {
        this._tokens[i].value--;
        this.increaseTokenPanel(this._tokens[i]);
      }
      i++;
    }
  }

  increaseTokenPanel(token) {
    if (token.color == WHITE) {
      this._tokenPanel.colors.white++;
    } else if (token.color == BLUE) {
      this._tokenPanel.colors.blue++;
    } else if (token.color == GREEN) {
      this._tokenPanel.colors.green++;
    } else if (token.color == RED) {
      this._tokenPanel.colors.red++;
    } else if (token.color == BLACK) {
      this._tokenPanel.colors.black++;
    }
  }

  /*
  pullCardFromDeck(mouseEvent) {
    if (this.findCardAtCursor(mouseEvent) != null) {
      if (this.findCardAtCursor(mouseEvent).data.level == 1) {
        console.log(level1Cards);
      }
    }
  }*/

  mouseDown(mouseEvent) {
    //console.log("Click at (" + mouseEvent.x + ", " + mouseEvent.y + ")");
    this.handleTokenExchange(mouseEvent);
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
