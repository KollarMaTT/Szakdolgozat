var canvas = null;
var canvasPosition = null;
var context = null;
let board = null;
const BOARD_HEIGHT = 970;
const BOARD_WIDTH = 1920;

function calcMouseEvent(event) {
  let x = event.clientX - canvasPosition.left;
  let y = event.clientY - canvasPosition.top;

  return {
    x,
    y,
    button: event.button,
  };
}

function mouseDown(event) {
  const mouse = calcMouseEvent(event);
  board.mouseDown(mouse);
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
}

function mouseMove(event) {
  const mouse = calcMouseEvent(event);
  board.mouseMove(mouse);
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
}

function mouseUp(event) {
  const mouse = calcMouseEvent(event);
}

function mouseWheel(event) {
  const mouse = calcMouseEvent(event);
  const delta = event.wheelDelta;
  event.preventDefault();
}

function drawBoard(){
  
  
  let boardHeight = (16/9)*canvas.height;
  let scale = canvas.height/BOARD_HEIGHT;
  let scale2 = canvas.width/BOARD_WIDTH;

  context.save();

  if((canvas.width/canvas.height) > (BOARD_WIDTH/BOARD_HEIGHT)){
    context.translate((canvas.width - BOARD_WIDTH*scale)/2,0);
    context.scale(scale, scale);
  }else{
    context.translate(0,(canvas.height - BOARD_HEIGHT*scale2)/2);
    context.scale(scale2, scale2);
  }

  board.draw(context);
  context.restore();
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  console.log(canvas.width, canvas.height);
  drawBoard();
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
