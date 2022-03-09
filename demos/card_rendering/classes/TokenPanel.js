/**
 * Syntax of the token panel
 */
class TokenPanel {
  constructor(x, y, colors, fixColors, point) {
    this.x = x;
    this.y = y;
    this.colors = colors;
    this.fixColors = fixColors;
    this.point = point;
    this.initPanelElements();
  }

  draw(context) {
    this.drawPanelContour(context, this.x, this.y, 1400, 90, 20);

    //this.initPanelElements();

    this.drawPanelElements(context);
    this.drawPanelPointBox(
      context,
      this.x + 1250,
      this.y + 10,
      120,
      70,
      10,
      this.point
    );

  }

  drawPanelContour(context, x, y, w, h, radius) {
    roundedRectangle(context, x, y, w, h, radius, 3, "black");
    context.fillStyle = BACKGROUND;
    context.fill();
    context.stroke();
  }

  drawPanelPointBox(context, x, y, w, h, radius, value) {
    roundedRectangle(context, x, y, w, h, radius, 5, "black");

    context.font = "bold 70px Arial";
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText(value, x + 60, y + 60);
  }

  drawPanelElements(context) {
    for (let panelElement of this.panelElements) {
      panelElement.draw(context);
    }
  }

  initPanelElements() {
    let colors = ["white", "blue", "green", "red", "black"];

    let displayColors = {
      white: WHITE,
      blue: BLUE,
      green: GREEN,
      red: RED,
      black: BLACK,
    };

    this.panelElements = [];

    for (let i = 0; i < 5; i++) {
      let x = this.x + 15 + i * 240;
      let y = this.y + 10;
      let color = colors[i];

      let panelElement = new PanelElement(
        x,
        y,
        this.colors,
        this.fixColors,
        displayColors[color]
      );

      this.panelElements.push(panelElement);
    }
  }
}
