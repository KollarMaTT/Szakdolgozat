/**
 * Syntax of the tokens
 */
class Token {
  constructor(x, y, color, value) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.value = value;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.strokeStyle = "black";
    context.lineWidth = "7";
    context.beginPath();
    context.arc(this.x, this.y, 60, 0, 2 * Math.PI);
    context.stroke();
    context.fill();

    context.font = "50px Arial";
    context.fillStyle = "black";
    context.fillText(this.value, this.x - 95, this.y + 20);
  }
}
