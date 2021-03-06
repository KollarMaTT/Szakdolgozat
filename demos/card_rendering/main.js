var canvas = null;
var canvasPosition = null;
var context = null;
let board = null;
const BOARD_HEIGHT = 969;
const BOARD_WIDTH = 1920;
let transform = null;

function calcMouseEvent(event) {
  let x = event.clientX - canvasPosition.left;
  let y = event.clientY - canvasPosition.top;

  x = (x - transform.offset_x) / transform.scale;
  y = (y - transform.offset_y) / transform.scale;

  return {
    x,
    y,
    button: event.button,
  };
}

function calcCenterAlign(canvas, preferred) {
  let canvasRatio = canvas.width / canvas.height;
  let preferredRatio = BOARD_WIDTH / BOARD_HEIGHT;
  let offset_x;
  let offset_y;
  let scale;

  if (canvasRatio > preferredRatio) {
    scale = canvas.height / preferred.height;
    let realWidth = scale * preferred.width;
    offset_x = (canvas.width - realWidth) / 2;
    offset_y = 0;
  } else {
    scale = canvas.width / preferred.width;
    let realHeight = scale * preferred.height;
    offset_x = 0;
    offset_y = (canvas.height - realHeight) / 2;
  }

  return {
    offset_x,
    offset_y,
    scale,
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

function drawBoard() {
  context.save();
  context.translate(transform.offset_x, transform.offset_y);
  context.scale(transform.scale, transform.scale);

  board.draw(context);
  context.restore();
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  transform = calcCenterAlign(canvas, {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
  });

  drawBoard();
}

function resetGame() {
  board.resetGame();
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
}

function humanVsAi() {
  board.humanVsAi();
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
}

function humanVsHuman() {
  board.humanVsHuman();
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
}

function closeInformations() {
  board.closeInformations();
  context.clearRect(0, 0, canvas.width, canvas.height);
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
  board.showStartScreen();

  document.querySelector(".new_game").addEventListener("click", resetGame);

  document
    .querySelector(".human_vs_AI_btn")
    .addEventListener("click", humanVsAi);
  document
    .querySelector(".human_vs_human_btn")
    .addEventListener("click", humanVsHuman);

  document
    .querySelector(".overlay")
    .addEventListener("click", closeInformations);

  resize();
}
