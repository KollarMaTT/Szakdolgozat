/**
 * Syntax of the panel elements
 */
class PanelElement {
  constructor(x, y, color, value, fixValue) {
    this.x = x;
    this.y = y;
    this.w = 210;
    this.h = 80;
    this.radius = 20;
    this.color = color;
    this.value = value;
    this.fixValue = fixValue;
  }

  draw(context) {
    roundedRectangle(this.x, this.y, this.w, this.h, this.radius, 3);

    context.fillStyle = this.color;
    context.fill();
    context.stroke();

    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.moveTo(this.x + 100, this.y + 0);
    context.lineTo(this.x + 100, this.y + 80);
    context.stroke();

    context.font = "50px Arial";
    context.fillStyle = "black";
    context.fillText(this.value, this.x + 40, this.y + 60);
    context.font = "bold 50px Arial";
    context.fillText(this.fixValue, this.x + 140, this.y + 60);
  }
}
