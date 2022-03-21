const WHITE = "#FFFFFF";
const BLUE = "#5264FF";
const GREEN = "#3FBA3F";
const RED = "#FD3333";
const BLACK = "#686868";
const BACKGROUND = "#B95828";

/**
 * Syntax of the cards
 */
class Card {
  constructor(x, y, cardData) {
    this.x = x;
    this.y = y;
    this.cardData = cardData;
  }

  draw(context) {
    if (this.cardData != null) {
      let i = 0;

      this.drawCardContour(context, this.x, this.y, 180, 200, 20);

      this.drawCardToken(context, i, this.cardData.color, "");

      if (this.cardData.white >= 1) {
        i++;
        this.drawCardToken(context, i, WHITE, this.cardData.white);
      }
      if (this.cardData.blue >= 1) {
        i++;
        this.drawCardToken(context, i, BLUE, this.cardData.blue);
      }
      if (this.cardData.green >= 1) {
        i++;
        this.drawCardToken(context, i, GREEN, this.cardData.green);
      }
      if (this.cardData.red >= 1) {
        i++;
        this.drawCardToken(context, i, RED, this.cardData.red);
      }
      if (this.cardData.black >= 1) {
        i++;
        this.drawCardToken(context, i, BLACK, this.cardData.black);
      }

      if (this.cardData.point > 0) {
        context.font = "35px Arial";
        context.textAlign = "center";
        context.fillText(this.cardData.point, this.x + 25, this.y + 45);
      }
    }
  }

  drawCardToken(context, i, color, tokenNumber) {
    context.fillStyle = color;
    context.beginPath();

    var x;
    var y;

    if (i == 0) {
      x = this.x + 145;
      y = this.y + 30;
    } else if (i == 1) {
      x = this.x + 30;
      y = this.y + 170;
    } else if (i == 2) {
      x = this.x + 30;
      y = this.y + 115;
    } else if (i == 3) {
      x = this.x + 90;
      y = this.y + 170;
    } else {
      x = this.x + 90;
      y = this.y + 115;
    }
    context.lineWidth = "5";
    context.arc(x, y, 24, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
    context.textAlign = "center";
    context.fillStyle = "black";
    context.font = "30px Arial";
    context.fillText(tokenNumber, x, y + 10);
  }

  drawCardContour(context, x, y, w, h, radius) {
    context.shadowColor = "black";
    context.shadowBlur = 30;
    context.shadowOffsetX = 20;
    context.shadowOffsetY = 20;
    roundedRectangle(context, x, y, w, h, radius, 4, "black");

    context.moveTo(this.x + 0, this.y + 60);
    context.lineTo(this.x + 180, this.y + 60);

    context.fillStyle = BACKGROUND;
    context.fill();
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.stroke();
  }

  isUnderCursor(mouseEvent) {
    if (
      Math.floor((mouseEvent.x - this.x) / 180) == 0 &&
      Math.floor((mouseEvent.y - this.y) / 200) == 0
    ) {
      return true;
    } else return false;
  }
}
