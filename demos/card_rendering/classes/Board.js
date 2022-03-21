var canvas = null;
var canvasPosition = null;
var context = null;

/**
 * Syntax of the board
 */
class Board {
  constructor() {
    this.initCards();
    this.initPlayers();
    this.initTokenPanels();
    this.initTokens();
    this._focusedCard = null;
    this._focusedToken = null;
    this._availableCards = [];
    this._notAvailableTokens = [];
    this._playerIndex = 0;
  }

  draw(context) {
    for (let card of this._cardsOnBorad) {
      card.draw(context);
    }

    for (let token of this._tokens) {
      token.draw(context);
    }

    this._tokenPanel.draw(context);
    this._AITokenPanel.draw(context);

    context.shadowColor = "black";
    context.shadowBlur = 30;
    context.shadowOffsetX = 20;
    context.shadowOffsetY = 20;

    context.drawImage(
      document.getElementById("level3_deck"),
      130,
      150,
      205,
      205
    );
    context.drawImage(
      document.getElementById("level2_deck"),
      130,
      390,
      205,
      205
    );
    context.drawImage(
      document.getElementById("level1_deck"),
      130,
      630,
      205,
      205
    );
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    this.showActivePlayer(context);

    this.drawCardHover(context);
    this.drawTokenHover(context);

    this.showAvailableCards(context);
    this.showNotAvailableTokens(context);

    this.showEndScreen(context);
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
    let card;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        slot = i * 4 + j;
        let x = j * 250 + 480;
        let y = 630 - i * 240;

        if (i == 0) {
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

          card = new Card(x, y, level1CardData);
          this._level1Cards.shift();
        } else if (i == 1) {
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

          card = new Card(x, y, level2CardData);
          this._level2Cards.shift();
        } else if (i == 2) {
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

          card = new Card(x, y, level3CardData);
          this._level3Cards.shift();
        }
        this._cardsOnBorad.push(card);
      }
    }
  }

  initPlayers() {
    this._prevClick = [];

    let humanPlayer = new Player();
    let AIPlayer = new Player();

    this._players = [humanPlayer, AIPlayer];
  }

  initTokenPanels() {
    this._tokenPanel = new TokenPanel(
      250,
      870,
      this._players[0].colors,
      this._players[0].fixColors,
      this._players[0].score
    );
    this._AITokenPanel = new TokenPanel(
      250,
      15,
      this._players[1].colors,
      this._players[1].fixColors,
      this._players[1].score
    );
  }

  initTokens() {
    this._tokens = [];

    let x = 1750;

    let colors = [WHITE, BLUE, GREEN, RED, BLACK];

    for (let i = 0; i < colors.length; i++) {
      let y = 200 + i * 150;
      let token = new Token(x, y, colors[i], 5);
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

  buyToken(mouseEvent) {
    let i = 0;
    for (let token of this._tokens) {
      if (
        token == this.findTokenAtCursor(mouseEvent) &&
        this.isTokenAvailable(token)
      ) {
        token.value--;
        this.increaseTokenPanel(token.color, "basic");
        this._prevClick.push(token.color);
      }
      i++;
    }
  }

  increaseTokenPanel(color, valueType) {
    if (color == WHITE) {
      if (valueType == "basic") {
        this._players[this._playerIndex].colors.white++;
      } else {
        this._players[this._playerIndex].fixColors.white++;
      }
    }
    if (color == BLUE) {
      if (valueType == "basic") {
        this._players[this._playerIndex].colors.blue++;
      } else {
        this._players[this._playerIndex].fixColors.blue++;
      }
    }
    if (color == GREEN) {
      if (valueType == "basic") {
        this._players[this._playerIndex].colors.green++;
      } else {
        this._players[this._playerIndex].fixColors.green++;
      }
    }
    if (color == RED) {
      if (valueType == "basic") {
        this._players[this._playerIndex].colors.red++;
      } else {
        this._players[this._playerIndex].fixColors.red++;
      }
    }
    if (color == BLACK) {
      if (valueType == "basic") {
        this._players[this._playerIndex].colors.black++;
      } else {
        this._players[this._playerIndex].fixColors.black++;
      }
    }
  }

  switchCard(mouseEvent, slot) {
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

  handleTokenExchange(slot) {
    if (this._cardsOnBorad[slot].cardData.white > 0) {
      let diff =
        this._cardsOnBorad[slot].cardData.white -
        this._players[this._playerIndex].fixColors.white;
      if (diff > 0) {
        this._players[this._playerIndex].colors.white -= diff;
        this._tokens[0].value += diff;
      }
    }
    if (this._cardsOnBorad[slot].cardData.blue > 0) {
      let diff =
        this._cardsOnBorad[slot].cardData.blue -
        this._players[this._playerIndex].fixColors.blue;
      if (diff > 0) {
        this._players[this._playerIndex].colors.blue -= diff;
        this._tokens[1].value += diff;
      }
    }
    if (this._cardsOnBorad[slot].cardData.green > 0) {
      let diff =
        this._cardsOnBorad[slot].cardData.green -
        this._players[this._playerIndex].fixColors.green;
      if (diff > 0) {
        this._players[this._playerIndex].colors.green -= diff;
        this._tokens[2].value += diff;
      }
    }
    if (this._cardsOnBorad[slot].cardData.red > 0) {
      let diff =
        this._cardsOnBorad[slot].cardData.red -
        this._players[this._playerIndex].fixColors.red;
      if (diff > 0) {
        this._players[this._playerIndex].colors.red -= diff;
        this._tokens[3].value += diff;
      }
    }
    if (this._cardsOnBorad[slot].cardData.black > 0) {
      let diff =
        this._cardsOnBorad[slot].cardData.black -
        this._players[this._playerIndex].fixColors.black;
      if (diff > 0) {
        this._players[this._playerIndex].colors.black -= diff;
        this._tokens[4].value += diff;
      }
    }

    this.increaseTokenPanel(
      this._cardsOnBorad[slot].cardData.color,
      "fixValue"
    );
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

      if (
        this.isCardAvailable(this._cardsOnBorad[i]) &&
        this._prevClick.length == 0
      ) {
        this._players[this._playerIndex].score.value +=
          this._cardsOnBorad[i].cardData.point;
        this.handleTokenExchange(i);
        this.switchCard(mouseEvent, i);
        this._prevClick.push("card");
      }
    }
  }

  isCardAvailable(card) {
    if (
      card.cardData.white <=
        this._players[this._playerIndex].colors.white +
          this._players[this._playerIndex].fixColors.white &&
      card.cardData.blue <=
        this._players[this._playerIndex].colors.blue +
          this._players[this._playerIndex].fixColors.blue &&
      card.cardData.green <=
        this._players[this._playerIndex].colors.green +
          this._players[this._playerIndex].fixColors.green &&
      card.cardData.red <=
        this._players[this._playerIndex].colors.red +
          this._players[this._playerIndex].fixColors.red &&
      card.cardData.black <=
        this._players[this._playerIndex].colors.black +
          this._players[this._playerIndex].fixColors.black
    ) {
      return true;
    } else {
      return false;
    }
  }

  isTokenAvailable(token) {
    if (
      token.value > 0 &&
      token.color != this._prevClick[1] &&
      ((this._prevClick.length >= 2 && token.color != this._prevClick[0]) ||
        this._prevClick.length < 2) &&
      (this._prevClick[0] != token.color || token.value >= 3)
    ) {
      return true;
    } else {
      return false;
    }
  }

  drawCardHover(context) {
    if (this._focusedCard != null) {
      roundedRectangle(
        context,
        this._focusedCard.x,
        this._focusedCard.y,
        180,
        200,
        20,
        4,
        "#F3E45F"
      );
    }
  }

  drawTokenHover(context) {
    if (this._focusedToken != null) {
      context.strokeStyle = "#F3E45F";
      context.lineWidth = "4";
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

  selectAvailableCards() {
    for (let card of this._cardsOnBorad) {
      if (this.isCardAvailable(card) && !this._availableCards.includes(card)) {
        this._availableCards.push(card);
      }
    }
  }

  showAvailableCards(context) {
    if (this._availableCards != null && this._prevClick.length == 0) {
      for (let card of this._availableCards) {
        roundedRectangle(
          context,
          card.x - 2,
          card.y - 2,
          184,
          204,
          20,
          2,
          "#62F275"
        );
      }
    }
  }

  selectNotAvailableTokens() {
    for (let token of this._tokens) {
      if (
        !this.isTokenAvailable(token) &&
        !this._notAvailableTokens.includes(token)
      ) {
        this._notAvailableTokens.push(token);
      }
    }
  }

  showNotAvailableTokens(context) {
    if (this._notAvailableTokens != null) {
      for (let token of this._notAvailableTokens) {
        context.strokeStyle = "#AFAFAF";
        context.lineWidth = "4";
        context.beginPath();
        context.arc(token.x, token.y, 50, 0, 2 * Math.PI);
        context.stroke();
      }
    }
  }

  selectNextPlayer() {
    if (
      this._prevClick[0] == "card" ||
      (this._prevClick.length == 2 &&
        this._prevClick[0] == this._prevClick[1]) ||
      (this._prevClick.length == 3 &&
        this._prevClick[0] != this._prevClick[1] &&
        this._prevClick[1] != this._prevClick[2] &&
        this._prevClick[0] != this._prevClick[2]) ||
      (this._notAvailableTokens.length == 4 && this._prevClick.length > 0)
    ) {
      this._availableCards = [];
      this._notAvailableTokens = [];
      this._prevClick = [];
      this._playerIndex = (this._playerIndex + 1) % this._players.length;
    }
  }

  showActivePlayer(context) {
    if (this._playerIndex == 0) {
      context.drawImage(
        document.getElementById("player_icon"),
        50,
        847,
        120,
        120
      );
      roundedRectangle(
        context,
        this._tokenPanel.x,
        this._tokenPanel.y,
        1400,
        90,
        20,
        3,
        "#F3E45F"
      );
    } else {
      context.drawImage(document.getElementById("AI_icon"), 50, 8, 120, 120);
      roundedRectangle(
        context,
        this._AITokenPanel.x,
        this._AITokenPanel.y,
        1400,
        90,
        20,
        3,
        "#F3E45F"
      );
    }
  }

  showEndScreen() {
    if (this._players[0].score.value >= 1) {
      document.querySelector(".overlay").classList.remove("hidden");
      document.getElementById("end_screen_btn").classList.remove("hidden");
      document.querySelector(".human").classList.remove("hidden");
    } else if (this._players[1].score.value >= 1) {
      document.querySelector(".overlay").classList.remove("hidden");
      document.getElementById("end_screen_btn").classList.remove("hidden");
      document.querySelector(".ai").classList.remove("hidden");
    }
  }

  resetGame() {
    if (!document.querySelector(".overlay").classList.contains("hidden")) {
      document.querySelector(".overlay").classList.add("hidden");
      document.getElementById("end_screen_btn").classList.add("hidden");
      if (this._players[0].score.value >= 1) {
        document.querySelector(".human").classList.add("hidden");
      } else if (this._players[1].score.value >= 1) {
        document.querySelector(".ai").classList.add("hidden");
      }

      this.initCards();
      this.initPlayers();
      this.initTokenPanels();
      this.initTokens();
      this._focusedCard = null;
      this._focusedToken = null;
      this._availableCards = [];
      this._notAvailableTokens = [];
      this._playerIndex = 0;
    } else {
      this.initCards();
      this.initPlayers();
      this.initTokenPanels();
      this.initTokens();
      this._focusedCard = null;
      this._focusedToken = null;
      this._availableCards = [];
      this._notAvailableTokens = [];
      this._playerIndex = 0;
    }
  }

  openRules() {
    document.querySelector(".overlay").classList.remove("hidden");
    document.querySelector(".rules").classList.remove("hidden");
  }

  closeRules() {
    if (!document.querySelector(".rules").classList.contains("hidden")) {
      document.querySelector(".overlay").classList.add("hidden");
      document.querySelector(".rules").classList.add("hidden");
    }
  }

  mouseDown(mouseEvent) {
    this.buyToken(mouseEvent);
    this.buyCard(mouseEvent);

    this.selectNextPlayer();
    this.selectAvailableCards();
    this.selectNotAvailableTokens();
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
