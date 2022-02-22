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
    this.initTokens();
    this.initDecks();
  }

  initCards() {
    let slot = 0;

    while (slot < 4) {
      let x = 480 + slot * 250;
      let y = 510;
      let level1 = Math.floor(Math.random() * 40);

      let card = new Card(
        x,
        y,
        CARDS[level1].level,
        CARDS[level1].color,
        CARDS[level1].point,
        CARDS[level1].white,
        CARDS[level1].blue,
        CARDS[level1].green,
        CARDS[level1].red,
        CARDS[level1].black
      );
      card.draw(context);
      slot++;
    }
    while (slot < 8) {
      let x = 480 + (slot - 4) * 250;
      let y = 270;
      let level2 = Math.floor(Math.random() * (70 - 40) + 40);

      let card = new Card(
        x,
        y,
        CARDS[level2].level,
        CARDS[level2].color,
        CARDS[level2].point,
        CARDS[level2].white,
        CARDS[level2].blue,
        CARDS[level2].green,
        CARDS[level2].red,
        CARDS[level2].black
      );
      card.draw(context);
      slot++;
    }
    while (slot < 12) {
      let x = 480 + (slot - 8) * 250;
      let y = 30;
      let level3 = Math.floor(Math.random() * (90 - 70) + 70);

      let card = new Card(
        x,
        y,
        CARDS[level3].level,
        CARDS[level3].color,
        CARDS[level3].point,
        CARDS[level3].white,
        CARDS[level3].blue,
        CARDS[level3].green,
        CARDS[level3].red,
        CARDS[level3].black
      );
      card.draw(context);
      slot++;
    }
  }

  initTokenPanel() {
    let x = 250;
    let y = 800;
    let panel = new TokenPanel(x, y, 1, 2, 3, 0, 2, 4, 2, 0, 1, 1);
    panel.draw(context);
  }

  initTokens() {
    let x = 1750;
    let y = 80;
    let colors = [WHITE, BLUE, GREEN, RED, BLACK];
    let randValue = Math.floor(Math.random() * 6);

    for (let i = 0; i < colors.length; i++) {
      let token = new Token(x, y, colors[i], randValue);
      token.draw(context);
      y += 150;
      randValue = Math.floor(Math.random() * 5);
    }
  }

  initDecks() {
    var level1_deck = new Image();
    level1_deck.src = "images/level1_deck.png";
    var level2_deck = new Image();
    level2_deck.src = "images/level2_deck.png";
    var level3_deck = new Image();
    level3_deck.src = "images/level3_deck.png";
    context.drawImage(level3_deck, 130, 30, 205, 205);
    context.drawImage(level2_deck, 130, 270, 205, 205);
    context.drawImage(level1_deck, 130, 510, 205, 205);
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
