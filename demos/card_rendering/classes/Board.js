var canvas = null;
var canvasPosition = null;
var context = null;

/**
 * Syntax of the board
 */
 class Board {
    constructor(){
    }

    
    init(context) {
        let x = 250;
        let y = 10;
        for(let i=0;i<5;i++){
                let card = new Card(CARDS[i].level,CARDS[i].color,CARDS[i].point, CARDS[i].white, CARDS[i].blue, CARDS[i].green, CARDS[i].red, CARDS[i].black, x, y);
                card.draw(context);
                x = x + 200;
        }
      }
 }