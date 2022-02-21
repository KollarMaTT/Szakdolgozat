const BLACK = "#404040";
const WHITE = "#FFFFFF";
const BLUE = "#5264FF";
const GREEN = "#3FBA3F";
const RED = "#FD3333";
const BACKGROUND = "#D1D1D1";

/**
 * Syntax of the cards
 */
class Card {
  constructor(level, color, point, white, blue, green, red, black, x , y) {
    this.level = level;
    this.color = color;
    this.point = point;
    this.white = white;
    this.blue = blue;
    this.green = green;
    this.red = red;
    this.black = black;
    this.x = x;
    this.y = y;
    let isUnderCursor = false;
  }


  draw(context) {
    var i = 0;

    this.drawCardContour(context, this.x, this.y, 180, 200, 20);

    this.drawCardToken(context, i, this.color, "");

    if (this.white >= 1) {
      i++;
      this.drawCardToken(context, i, WHITE, this.white);
    }
    if (this.blue >= 1) {
      i++;
      this.drawCardToken(context, i, BLUE, this.blue);
    }
    if (this.green >= 1) {
      i++;
      this.drawCardToken(context, i, GREEN, this.green);
    }
    if (this.red >= 1) {
      i++;
      this.drawCardToken(context, i, RED, this.red);
    }
    if (this.black >= 1) {
      i++;
      this.drawCardToken(context, i, BLACK, this.black);
    }

    if(this.pont > 0){
      context.font = "35px Arial";
      context.fillText(this.point, this.x+15, this.y+45);
    }
  }

  drawCardToken(context, i, color, tokenNumber) {
    context.fillStyle = color;
    context.beginPath();

    var x;
    var y;

    if (i == 0) {
      x = this.x+145;
      y = this.y+30;
    } else if (i == 1) {
      x = this.x+30;
      y = this.y+170;
    } else if (i == 2) {
      x = this.x+30;
      y = this.y+115;
    } else if (i == 3) {
      x = this.x+90;
      y = this.y+170;
    } else {
      x = this.x+90;
      y = this.y+115;
    }
    context.arc(x, y, 24, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
    context.fillStyle = "black";
    context.font = "30px Arial";
    context.fillText(tokenNumber, x - 8, y + 10);
  }

  drawCardContour(context, x, y, w, h, radius) {
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
    context.moveTo(this.x+0, this.y+60);
    context.lineTo(this.x+180, this.y+60);
    context.fillStyle = BACKGROUND;
    context.fill();
    context.stroke();
  }
}
