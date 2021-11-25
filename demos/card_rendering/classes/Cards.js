const BLACK = "#404040";
const WHITE = "#FFFFFF";
const BLUE = "#0066CC";
const GREEN = "#009900";
const RED = "#FF0000";

/**
 * Syntax of the cards
 */
class Card {
  constructor(level, color, point, white, blue, green, red, black) {
    // TODO: Set the properties of the card.
    this.level = level;
    this.color = color;
    this.point = point;
    this.white = white;
    this.blue = blue;
    this.green = green;
    this.red = red;
    this.black = black;
  }

  draw(context) {
    this.drawCard(context);
  }

  drawCard(level, color, point, white, blue, green, red, black) {
    var i = 0;

    //TODO: change these values to relative values
    roundRect(10, 20, 180, 200, 20);

    drawCardToken(i, color, "");

    if (white >= 1) {
      i++;
      drawCardToken(i, whiteColor, white);
    }
    if (blue >= 1) {
      i++;
      drawCardToken(i, blueColor, blue);
    }
    if (green >= 1) {
      i++;
      drawCardToken(i, greenColor, green);
    }
    if (red >= 1) {
      i++;
      drawCardToken(i, redColor, red);
    }

    if (black >= 1) {
      i++;
      drawCardToken(i, blackColor, black);
    }

    context.font = "40px Arial";
    context.fillText(point, 25, 65);
  }

  drawCardToken(i, color, tokenNumber) {
    context.fillStyle = color;
    context.beginPath();

    var x;
    var y;

    //TODO: change these values to relative values
    if (i == 0) {
      x = 155;
      y = 50;
    } else if (i == 1) {
      x = 40;
      y = 190;
    } else if (i == 2) {
      x = 40;
      y = 135;
    } else if (i == 3) {
      x = 100;
      y = 190;
    } else {
      x = 100;
      y = 135;
    }
    context.arc(x, y, 24, 0, 2 * Math.PI);
    context.stroke();
    context.globalAlpha = 0.7;
    context.fill();
    context.globalAlpha = 1;
    context.fillStyle = "black";
    context.font = "30px Arial";
    context.fillText(tokenNumber, x - 8, y + 10);
  }

  roundRect(x, y, w, h, radius) {
    var r = x + w;
    var b = y + h;
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = "3";
    context.moveTo(x + radius, y);
    context.lineTo(r - radius, y);
    context.quadraticCurveTo(r, y, r, y + radius);
    context.lineTo(r, y + h - radius);
    context.quadraticCurveTo(r, b, r - radius, b);
    context.lineTo(x + radius, b);
    context.quadraticCurveTo(x, b, x, b - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.lineWidth = 3;
    context.strokeStyle = "black";
    context.moveTo(10, 80);
    context.lineTo(190, 80);
    context.stroke();
  }
}
