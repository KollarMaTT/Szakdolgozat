/**
 * Syntax of the panel elements
 */
class PanelElement {
  constructor(x, y, color, value, fixValue) {
    this.x = x;
    this.y = y;
    this.w = 210;
    this.h = 70;
    this.radius = 20;
    this.color = color;
    this.value = value;
    this.fixValue = fixValue;
  }

  draw(context) {
    roundedRectangle(
      context,
      this.x,
      this.y,
      this.w,
      this.h,
      this.radius,
      3,
      "black"
    );

    context.fillStyle = this.color;
    context.fill();
    context.stroke();

    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.moveTo(this.x + 100, this.y + 0);
    context.lineTo(this.x + 100, this.y + 70);
    context.stroke();

    context.font = "50px Arial";
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText(this.value, this.x + 50, this.y + 53);

    roundedRectangle(
      context,
      this.x + 110,
      this.y + 5,
      this.w - 120,
      this.h - 10,
      this.radius,
      3,
      "black"
    );

    context.font = "bold 50px Arial";
    context.fillText(this.fixValue, this.x + 155, this.y + 53);
  }
}
