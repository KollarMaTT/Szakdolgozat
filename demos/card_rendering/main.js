var canvas = null;
var canvasPosition = null;
var context = null;

function calcMouseEvent(event) {
  return {
    x: event.clientX - canvasPosition.left,
    y: event.clientY - canvasPosition.top,
    button: event.button,
  };
}

function mouseDown(event) {
  const mouse = calcMouseEvent(event);
  console.log("Click at (" + event.x + ", " + event.y + ")");

  //let card = new Card(1,WHITE,2,0,1,1,3,2, event.x, event.y);
  //card.draw(context);

  //let token = new Token(event.x, event.y, GREEN);
  //token.draw(context);

  //let panel = new TokenPanel(event.x, event.y, 3,2,4,5,0,2,1,3,5,6);
  //panel.draw(context);
}

function mouseMove(event) {
  const mouse = calcMouseEvent(event);
}

function mouseUp(event) {
  const mouse = calcMouseEvent(event);
}

function mouseWheel(event) {
  const mouse = calcMouseEvent(event);
  const delta = event.wheelDelta;
  event.preventDefault();
}


function initialize() {
  canvas = document.getElementById("my-canvas");
  canvasPosition = canvas.getBoundingClientRect();
  context = canvas.getContext("2d");
  canvas.addEventListener("mousedown", mouseDown, false);
  canvas.addEventListener("mousemove", mouseMove, false);
  canvas.addEventListener("mouseup", mouseUp, false);
  canvas.addEventListener("mousewheel", mouseWheel, false);

  let card = new Card(1,WHITE,2,0,1,1,3,2,0,0);
  card.draw(context);
}
