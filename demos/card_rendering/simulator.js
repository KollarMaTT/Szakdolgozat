const ROUNDS = 500;

function isThereWinner() {
  if (board._players[0].score.value >= WINNING_POINT) {
    board._winner = 0;
    return true;
  } else if (board._players[1].score.value >= WINNING_POINT) {
    board._winner = 1;
    return true;
  } else {
    return false;
  }
}

function resetGame() {
  board.initCards();
  board.initPlayers();
  board.initTokenPanels();
  board.initTokens();
  board._availableCards = [];
  board._notAvailableTokens = [];
  board._playerIndex = Math.round(Math.random());
  board._winner = null;
  board._players[0].type = "AI1";
  board._players[1].type = "AI2";
}

function initialize() {
  board = new Board();

  board._players[0].type = "AI1";
  board._players[1].type = "AI2";

  let first = 0;
  let second = 0;

  for (let i = 0; i < ROUNDS; i++) {
    while (!isThereWinner()) {
      board.selectPlayerChoice();
    }
    if (board._winner == 0) {
      first++;
    } else if (board._winner == 1) {
      second++;
    }

    resetGame();
  }

  console.log(`Az elso jatekos ${first} alaklommal nyert.`);
  console.log(`A masodik jatekos ${second} alaklommal nyert.`);
}
