const ROUNDS = 1000;

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

function firstAIChoices() {
  if (board._gameState.board._availableCards.length != 0) {
    let item =
      board._gameState.board._availableCards[
        Math.floor(
          Math.random() * board._gameState.board._availableCards.length
        )
      ];
    board.buyCard(item);
  } else if (board._gameState.board._availableTokens.length != 0) {
    let item =
      board._gameState.board._availableTokens[
        Math.floor(
          Math.random() * board._gameState.board._availableTokens.length
        )
      ];
    board.buyToken(item);
  } else {
    resetGame();
  }
}

function secondAIChoices() {
  if (board._gameState.board._availableCards.length != 0) {
    let level = 1;
    for (let i = 0; i < board._gameState.board._availableCards.length; i++) {
      if (board._gameState.board._availableCards[i].cardData.level > level) {
        level = board._gameState.board._availableCards[i].cardData.level;
      }
    }
    let availableCards = [];
    for (let i = 0; i < board._gameState.board._availableCards.length; i++) {
      if (board._gameState.board._availableCards[i].cardData.level == level) {
        availableCards.push(board._gameState.board._availableCards[i]);
      }
    }
    let item =
      availableCards[Math.floor(Math.random() * availableCards.length)];
    board.buyCard(item);
  } else if (board._gameState.board._availableTokens.length != 0) {
    let item =
      board._gameState.board._availableTokens[
        Math.floor(
          Math.random() * board._gameState.board._availableTokens.length
        )
      ];
    board.buyToken(item);
  } else {
    resetGame();
  }
}

function selectAIChoices() {
  let recentPlayer = board._playerIndex;
  if (board._players[recentPlayer].type == "AI1") {
    while (recentPlayer == board._playerIndex) {
      firstAIChoices();
      board.selectNextPlayer();
    }
  } else if (board._players[recentPlayer].type == "AI2") {
    while (recentPlayer == board._playerIndex) {
      secondAIChoices();
      board.selectNextPlayer();
    }
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
      selectAIChoices();
      //console.log(board._players);
      //console.log("elso: ", board._players[0].score.value);
      //console.log("masodik: ", board._players[1].score.value);
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
