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

function mouseOver(event) {
  const mouse = calcMouseEvent(event);
  board.mouseOver(mouse);
}

function initialize() {
  canvas = document.getElementById("my-canvas");
  canvasPosition = canvas.getBoundingClientRect();
  context = canvas.getContext("2d");

  canvas.addEventListener("mousedown", mouseDown, false);
  canvas.addEventListener("mousemove", mouseMove, false);
  canvas.addEventListener("mouseup", mouseUp, false);
  canvas.addEventListener("mousewheel", mouseWheel, false);
  canvas.addEventListener("mouseover", mouseOver, false);

  board = new Board();
  board.draw(context);
}
