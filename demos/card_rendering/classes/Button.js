/**
 * Syntax of the buttons
 */

 class Button {
    constructor(x, y, width, textPos ,text) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.width = width;
        this.textPos = textPos;
    }
  
    draw(context) {
        context.shadowColor = "black";
        context.shadowBlur = 10;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        roundedRectangle(
            context,
            this.x,
            this.y,
            this.width,
            40,
            20,
            7,
            "black"
          );
          context.fillStyle = BACKGROUND;
          context.fill();
          context.shadowBlur = 0;
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;

          context.textAlign = "center";
          context.fillStyle = "black";
          context.font = "550 30px Arial";
          context.fillText(this.text, this.x+this.textPos, this.y + 30);
    }

    isUnderCursor(mouseEvent) {
        if (
          Math.floor((mouseEvent.x - this.x) / this.width) == 0 &&
          Math.floor((mouseEvent.y - this.y) / 40) == 0
        ) {
          return true;
        } else return false;
      }
}
