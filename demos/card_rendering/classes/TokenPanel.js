/**
 * Syntax of the tokens
 */
 class TokenPanel {
    constructor(x, y, white, blue, green, red, black, fixWhite, fixBlue, fixGreen, fixRed, fixBlack) {
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

    draw(context){
        this.drawPanelContour(context, this.x, this.y, 1200, 100, 20);
        this.drawPanelElements(context);
    }

    drawPanelContour(context, x, y, w, h, radius) {
        var r = x + w;
        var b = y + h;
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = 3;
        context.moveTo(x + radius, y);
        context.lineTo(r - radius, y);
        context.quadraticCurveTo(r, y, r, y + radius);
        context.lineTo(r, y + h - radius);
        context.quadraticCurveTo(r, b, r - radius, b);
        context.lineTo(x + radius, b);
        context.quadraticCurveTo(x, b, x, b - radius);
        context.lineTo(x, y + radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.fillStyle = BACKGROUND;
        context.fill();
        context.stroke();
      }

      drawPanelElements(context) {
          for (let panelElement of this.panelElements){
              console.log(panelElement);
              panelElement.draw(context);
          }
      }

    initPanelElements(){
        let colors = [
            WHITE,
            BLUE,
            GREEN,
            RED,
            BLACK
        ];

        this.panelElements = [];

        for(let i = 0; i<5; i++){
            let x = i * 240;
            let y = 80;
            let color = colors[i];
            let value = i;
            let fixValue = 333;
            let panelElement = new PanelElement(x,y,color,value,fixValue);
            this.panelElements.push(panelElement);
        }
    }
}