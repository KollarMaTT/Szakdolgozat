var canvas = null;
var canvasPosition = null;
var context = null;
let borad = null;

function calcMouseEvent(event) {
  return {
    x: event.clientX - canvasPosition.left,
    y: event.clientY - canvasPosition.top,
    button: event.button,
  };
}

function mouseDown(event) {
  const mouse = calcMouseEvent(event);
  board.mouseDown(mouse);
  context.clearRect(0, 0, canvas.width, canvas.height);
  board.draw(context);
}

function mouseMove(event) {
  const mouse = calcMouseEvent(event);
  board.mouseMove(mouse);
  board.draw(context);
}

function mouseUp(event) {
  const mouse = calcMouseEvent(event);
}

function mouseWheel(event) {
  const mouse = calcMouseEvent(event);
  const delta = event.wheelDelta;
  event.preventDefault();
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  /*
  context.scale(canvas.width * 0.00053, canvas.height * 0.00103);
  context.translate(canvas.width * 0.00053, canvas.height * 0.00103);
  context.save();
  board.draw(context);
  context.restore();
  */
}

function initialize() {
  canvas = document.getElementById("my-canvas");
  canvasPosition = canvas.getBoundingClientRect();
  context = canvas.getContext("2d");

  canvas.addEventListener("mousedown", mouseDown, false);
  canvas.addEventListener("mousemove", mouseMove, false);
  canvas.addEventListener("mouseup", mouseUp, false);
  canvas.addEventListener("mousewheel", mouseWheel, false);

  board = new Board();
  board.draw(context);

  resize();
}
