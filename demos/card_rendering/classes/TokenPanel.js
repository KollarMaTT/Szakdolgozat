/**
 * Syntax of the token panel
 */
class TokenPanel {
  constructor(
    x,
    y,
    white,
    blue,
    green,
    red,
    black,
    fixWhite,
    fixBlue,
    fixGreen,
    fixRed,
    fixBlack
  ) {
    this.x = x;
    this.y = y;
    this.white = white;
    this.blue = blue;
    this.green = green;
    this.red = red;
    this.black = black;
    this.fixWhite = fixWhite;
    this.fixBlue = fixBlue;
    this.fixGreen = fixGreen;
    this.fixRed = fixRed;
    this.fixBlack = fixBlack;
    this.initPanelElements();
  }

  draw(context) {
    this.drawPanelContour(context, this.x, this.y, 1400, 100, 20);
    this.drawPanelElements(context);
    this.drawPanelPointBox(context, this.x + 1250, this.y + 10, 120, 80, 10, 7);
  }

  drawPanelContour(context, x, y, w, h, radius) {
    roundedRectangle(x, y, w, h, radius, 3);
    context.fillStyle = BACKGROUND;
    context.fill();
    context.stroke();
  }

  drawPanelPointBox(context, x, y, w, h, radius, value) {
    roundedRectangle(x, y, w, h, radius, 5);

    context.font = "bold 70px Arial";
    context.fillStyle = "black";
    context.fillText(value, x + 40, y + 65);
  }

  drawPanelElements(context) {
    for (let panelElement of this.panelElements) {
      panelElement.draw(context);
    }
  }

  initPanelElements() {
    let colors = [WHITE, BLUE, GREEN, RED, BLACK];

    this.panelElements = [];

    for (let i = 0; i < 5; i++) {
      let x = this.x + 15 + i * 240;
      let y = this.y + 10;
      let color = colors[i];
      let value = i;
      let fixValue = 6;
      let panelElement = new PanelElement(x, y, color, value, fixValue);
      this.panelElements.push(panelElement);
    }
  }
}
