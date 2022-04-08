var canvas = null;
var canvasPosition = null;
var context = null;
const WINNING_POINT = 15;

/**
 * Syntax of the board
 */
class Board {
  constructor() {
    this.initCards();
    this.initPlayers();
    this.initTokenPanels();
    this.initTokens();
    this.initButtons();
    this._focusedCard = null;
    this._focusedToken = null;
    this._availableCards = [];
    this._availableTokens = [];
    this._notAvailableTokens = [];
    this._playerIndex = Math.round(Math.random());
    this._winner = null;
    this._gameState = {
      board: this,
    };
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

    for (let button of this._buttons) {
      button.draw(context);
    }

    context.shadowColor = "black";
    context.shadowBlur = 10;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;

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
    this.drawButtonHover(context);

    this.showAvailableCards(context);
    this.showNotAvailableTokens(context);
    this.selectAvailableTokens();

    this.showEndScreen();
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

  showStartScreen() {
    document.querySelector(".overlay").classList.remove("hidden");
    document.getElementById("select_players").classList.remove("hidden");
    document.getElementById("human_vs_AI_btn").classList.remove("hidden");
    document.getElementById("human_vs_human_btn").classList.remove("hidden");
  }

  humanVsAi() {
    document.querySelector(".overlay").classList.add("hidden");
    document.getElementById("select_players").classList.add("hidden");
    document.getElementById("human_vs_AI_btn").classList.add("hidden");
    document.getElementById("human_vs_human_btn").classList.add("hidden");
  }

  humanVsHuman() {
    this._players[1].type = "human";
    document.querySelector(".overlay").classList.add("hidden");
    document.getElementById("select_players").classList.add("hidden");
    document.getElementById("human_vs_AI_btn").classList.add("hidden");
    document.getElementById("human_vs_human_btn").classList.add("hidden");
  }

  initPlayers() {
    this._prevClick = [];

    this._players = [new Player("human"), new Player("AI2")];
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

  initButtons() {
    this._newGameBtn = new Button(1700, 20, 180, 90, "Új játék");
    this._rulesBtn = new Button(1670, 80, 240, 120, "Játékszabályok");
    this._buttons = [this._newGameBtn, this._rulesBtn];
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

  buyToken(selectedToken) {
    let i = 0;
    for (let token of this._tokens) {
      if (token == selectedToken && this.isTokenAvailable(token)) {
        token.value--;
        this.increaseTokenPanel(token.color, "basic");
        this._prevClick.push(token.color);
      }
      i++;
    }
    this.selectNextPlayer();
    this.selectAvailableTokens();
    this.selectNotAvailableTokens();
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

  switchCard(selectedCard, slot) {
    if (selectedCard.cardData.level == 1 && this._level1Cards.length > 0) {
      this._cardsOnBorad[slot].cardData = this._level1Cards[0];
      this._level1Cards.shift();
    } else if (
      selectedCard.cardData.level == 2 &&
      this._level2Cards.length > 0
    ) {
      this._cardsOnBorad[slot].cardData = this._level2Cards[0];
      this._level2Cards.shift();
    } else if (
      selectedCard.cardData.level == 3 &&
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

  buyCard(selectedCard) {
    if (selectedCard != null) {
      let i = 0;
      for (let card of this._cardsOnBorad) {
        if (card == selectedCard) {
          break;
        } else {
          i++;
        }
      }

      if (this.isCardAvailable(this._cardsOnBorad[i])) {
        this._players[this._playerIndex].score.value +=
          this._cardsOnBorad[i].cardData.point;
        this._prevClick.push(i);
        this.handleTokenExchange(i);
        this.switchCard(selectedCard, i);
      }
    }
    this.selectNextPlayer();
    this.selectAvailableTokens();
    this.selectNotAvailableTokens();
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
    if (
      this._focusedCard != null &&
      this._players[this._playerIndex].type == "human"
    ) {
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
    if (
      this._focusedToken != null &&
      this._players[this._playerIndex].type == "human"
    ) {
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
      if (
        this.isCardAvailable(card) &&
        !this._availableCards.includes(card) &&
        this._prevClick.length == 0
      ) {
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

  selectAvailableTokens() {
    this._availableTokens = [];
    for (let token of this._tokens) {
      if (
        this.isTokenAvailable(token) &&
        !this._availableTokens.includes(token)
      ) {
        this._availableTokens.push(token);
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

  writeTurnInf() {
    let content;

    /*
    let convertedColors = {
      "#FFFFFF": "white",
      "#5264FF": "blue",
      "#3FBA3F": "green",
      "#FD3333": "red",
      "#686868": "black",
    };

    if (typeof this._prevClick[0] === "number") {
      content = "Card: " + this._prevClick[0];
    } else {
      content = "Tokens: ";
      for (let i = 0; i < this._prevClick.length; i++) {
        content += convertedColors[this._prevClick[i]] + " ";
      }
    }
    console.log(content);*/

    //content = "Decks: " + "level 1:" + this._level1Cards.length + " level 2:" + this._level2Cards.length + " level 3:" + this._level3Cards.length;

    //console.log(content);

  }

  selectNextPlayer() {
    if (
      typeof this._prevClick[0] === "number" ||
      (this._prevClick.length == 2 &&
        this._prevClick[0] == this._prevClick[1]) ||
      (this._prevClick.length == 3 &&
        this._prevClick[0] != this._prevClick[1] &&
        this._prevClick[1] != this._prevClick[2] &&
        this._prevClick[0] != this._prevClick[2]) ||
      (this._notAvailableTokens.length == 5 && this._prevClick.length > 0) ||
      (this._notAvailableTokens.length == 5 && this._availableCards.length == 0)
    ) {
      this.writeTurnInf();
      this._availableCards = [];
      this._notAvailableTokens = [];
      this._prevClick = [];
      this._playerIndex = (this._playerIndex + 1) % this._players.length;
    }
    this.selectAvailableCards();
    this.selectAvailableTokens();
    this.selectNotAvailableTokens();
  }

  showActivePlayer(context) {
    let icon = null;
    if (this._playerIndex == 0) {
      if (this._players[this._playerIndex].type == "human") {
        icon = "player_icon";
      } else {
        icon = "AI_icon";
      }
      context.drawImage(document.getElementById(icon), 50, 847, 120, 120);

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
      if (this._players[this._playerIndex].type == "human") {
        icon = "player_icon";
      } else {
        icon = "AI_icon";
      }
      context.drawImage(document.getElementById(icon), 50, 8, 120, 120);

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
    if (this._players[0].score.value >= WINNING_POINT) {
      this._winner = this._players[0];
      document.querySelector(".overlay").classList.remove("hidden");
      document.getElementById("end_screen_btn").classList.remove("hidden");
      document.getElementById("first_player").classList.remove("hidden");
    } else if (this._players[1].score.value >= WINNING_POINT) {
      this._winner = this._players[1];
      document.querySelector(".overlay").classList.remove("hidden");
      document.getElementById("end_screen_btn").classList.remove("hidden");
      document.getElementById("second_player").classList.remove("hidden");
    }
  }

  findButtonAtCursor(mouseEvent) {
    for (let button of this._buttons) {
      if (button.isUnderCursor(mouseEvent)) {
        return button;
      }
    }
    return null;
  }

  drawButtonHover(context) {
    if (this._focusedButton != null) {
      context.textAlign = "center";
      context.fillStyle = "#F3E45F";
      context.font = "550 30px Arial";
      context.fillText(
        this._focusedButton.text,
        this._focusedButton.x + this._focusedButton.textPos,
        this._focusedButton.y + 30
      );
    }
  }

  resetGame() {
    if (
      !document.querySelector(".overlay").classList.contains("hidden") &&
      document.querySelector(".message").classList.contains("hidden")
    ) {
      document.querySelector(".overlay").classList.add("hidden");
      document.getElementById("end_screen_btn").classList.add("hidden");
      if (this._players[0].score.value >= WINNING_POINT) {
        document.getElementById("first_player").classList.add("hidden");
      } else if (this._players[1].score.value >= WINNING_POINT) {
        document.getElementById("second_player").classList.add("hidden");
      }

      this.initCards();
      this.initPlayers();
      this.initTokenPanels();
      this.initTokens();
      this._focusedCard = null;
      this._focusedToken = null;
      this._availableCards = [];
      this._notAvailableTokens = [];
      this._playerIndex = Math.round(Math.random());
      this._winner = null;
      this.showStartScreen();
    } else if (this._focusedButton == this._newGameBtn) {
      this.initCards();
      this.initPlayers();
      this.initTokenPanels();
      this.initTokens();
      this._focusedCard = null;
      this._focusedToken = null;
      this._availableCards = [];
      this._notAvailableTokens = [];
      this._playerIndex = Math.round(Math.random());
      this._winner = null;
      this.showStartScreen();
    }
  }

  openRules() {
    if (this._focusedButton == this._rulesBtn) {
      document.querySelector(".overlay").classList.remove("hidden");
      document.querySelector(".rules").classList.remove("hidden");
    }
  }

  openMassage() {
    document.querySelector(".message").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
  }

  closeInformations() {
    if (!document.querySelector(".rules").classList.contains("hidden")) {
      document.querySelector(".overlay").classList.add("hidden");
      document.querySelector(".rules").classList.add("hidden");
      this._focusedButton = null;
    } else if (
      !document.querySelector(".message").classList.contains("hidden")
    ) {
      document.querySelector(".message").classList.add("hidden");
      this.showStartScreen();
    }
  }

  firstAIChoices() {
    if (this._gameState.board._availableCards.length != 0) {
      let item =
        this._gameState.board._availableCards[
          Math.floor(
            Math.random() * this._gameState.board._availableCards.length
          )
        ];
      this.buyCard(item);
    } else if (this._gameState.board._availableTokens.length != 0) {
      let item =
        this._gameState.board._availableTokens[
          Math.floor(
            Math.random() * this._gameState.board._availableTokens.length
          )
        ];
      this.buyToken(item);
    } else {
      this.openMassage();
      this.initCards();
      this.initPlayers();
      this.initTokenPanels();
      this.initTokens();
      this._availableCards = [];
      this._notAvailableTokens = [];
      this._playerIndex = Math.round(Math.random());
    }
  }

  secondAIChoices() {
    if (this._gameState.board._availableCards.length != 0) {
      let level = 1;
      for (let i = 0; i < this._gameState.board._availableCards.length; i++) {
        if (this._gameState.board._availableCards[i].cardData.level > level) {
          level = this._gameState.board._availableCards[i].cardData.level;
        }
      }
      let availableCards = [];
      for (let i = 0; i < this._gameState.board._availableCards.length; i++) {
        if (this._gameState.board._availableCards[i].cardData.level == level) {
          availableCards.push(this._gameState.board._availableCards[i]);
        }
      }
      let item =
        availableCards[Math.floor(Math.random() * availableCards.length)];
      board.buyCard(item);
    } else if (this._gameState.board._availableTokens.length != 0) {
      let item =
        this._gameState.board._availableTokens[
          Math.floor(
            Math.random() * this._gameState.board._availableTokens.length
          )
        ];
      this.buyToken(item);
    } else {
      this.openMassage();
      this.initCards();
      this.initPlayers();
      this.initTokenPanels();
      this.initTokens();
      this._availableCards = [];
      this._notAvailableTokens = [];
      this._playerIndex = Math.round(Math.random());
    }
  }

  selectPlayerChoice() {
    let recentPlayer = this._playerIndex;
    if (this._players[recentPlayer].type == "AI1") {
      while (recentPlayer == this._playerIndex) {
        this.firstAIChoices();
        this.selectNextPlayer();
      }
    } else if (this._players[recentPlayer].type == "AI2") {
      while (recentPlayer == this._playerIndex) {
        this.secondAIChoices();
        this.selectNextPlayer();
      }
    } else if (
      this._availableCards.length != 0 ||
      this._availableTokens.length != 0
    ) {
      this.buyToken(this._focusedToken);
      this.buyCard(this._focusedCard);
    } else {
      this.openMassage();
      this.initCards();
      this.initPlayers();
      this.initTokenPanels();
      this.initTokens();
      this._availableCards = [];
      this._notAvailableTokens = [];
      this._playerIndex = Math.round(Math.random());
    }
  }

  mouseDown() {
    this.selectPlayerChoice();

    this.resetGame();

    this.openRules();
  }

  mouseMove(mouseEvent) {
    this._focusedCard = this.findCardAtCursor(mouseEvent);
    this._focusedToken = this.findTokenAtCursor(mouseEvent);
    this._focusedButton = this.findButtonAtCursor(mouseEvent);

    if (
      (this._focusedCard == null &&
        this._focusedToken == null &&
        this._focusedButton == null) ||
      (this._players[this._playerIndex].type != "human" &&
        this._focusedButton == null)
    ) {
      canvas.style = "cursor : auto;";
    } else {
      canvas.style = "cursor : pointer;";
    }
  }
}
