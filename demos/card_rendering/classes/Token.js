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
    context.shadowColor = "black";
    context.shadowBlur = 10;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.fillStyle = this.color;
    context.strokeStyle = "black";
    context.lineWidth = "8";
    context.beginPath();
    context.arc(this.x, this.y, 50, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    context.font = "50px Arial";
    context.strokeStyle = "black";
    context.textAlign = "center";
    context.strokeText(this.value, this.x - 95, this.y + 20);
    context.fillStyle = "white";
    context.fillText(this.value, this.x - 95, this.y + 20);
  }
}
