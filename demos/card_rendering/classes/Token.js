/**
 * Syntax of the tokens
 */
 class Token {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
    }

    draw(context){
        context.fillStyle = this.color;
        context.strokeStyle = "black";
        context.lineWidth = "3";
        context.beginPath();
        context.arc(this.x, this.y, 40, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
    }
}