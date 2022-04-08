//import "classes/Board.js";

const ROUNDS = 1000;
const first_player = "AI1";
const second_player = "AI2";

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

function countDiff(card) {
  let diff = 0;
  let white = blue = green = red = black = 0;

  if (
    card.cardData.white >
    board._players[board._playerIndex].colors.white +
      board._players[board._playerIndex].fixColors.white
  ) {
    white +=
      card.cardData.white -
      (board._players[board._playerIndex].colors.white +
        board._players[board._playerIndex].fixColors.white);
    diff += white;
  }
  if (
    card.cardData.blue >
    board._players[board._playerIndex].colors.blue +
      board._players[board._playerIndex].fixColors.blue
  ) {
    blue +=
      card.cardData.blue -
      (board._players[board._playerIndex].colors.blue +
        board._players[board._playerIndex].fixColors.blue);
    diff += blue;
  }
  if (
    card.cardData.green >
    board._players[board._playerIndex].colors.green +
      board._players[board._playerIndex].fixColors.green
  ) {
    green +=
      card.cardData.green -
      board._players[board._playerIndex].colors.green +
      board._players[board._playerIndex].fixColors.green;
    diff += green;
  }
  if (
    card.cardData.red >
    board._players[board._playerIndex].colors.red +
      board._players[board._playerIndex].fixColors.red
  ) {
    red +=
      card.cardData.red -
      board._players[board._playerIndex].colors.red +
      board._players[board._playerIndex].fixColors.red;
    diff += red;
  }
  if (
    card.cardData.black >
    board._players[board._playerIndex].colors.black +
      board._players[board._playerIndex].fixColors.black
  ) {
    black +=
      card.cardData.black -
      board._players[board._playerIndex].colors.black +
      board._players[board._playerIndex].fixColors.black;
    diff += black;
  }

  let cardDatas = {
    diff: diff,
    white: white,
    blue: blue,
    green: green,
    red: red,
    black: black,
  };

  return cardDatas;
}

function firstAI() {
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

function secondAI() {
  if (board._gameState.board._availableCards.length != 0) {
    let level = 1;
    for (let i = 0; i < board._gameState.board._availableCards.length; i++) {
      if (board._gameState.board._availableCards[i].cardData.level > level) {
        level = board._gameState.board._availableCards[i].cardData.level;
      }
    }
    let selectableCards = [];
    for (let i = 0; i < board._gameState.board._availableCards.length; i++) {
      if (board._gameState.board._availableCards[i].cardData.level == level) {
        selectableCards.push(board._gameState.board._availableCards[i]);
      }
    }
    let item =
      selectableCards[Math.floor(Math.random() * selectableCards.length)];
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

function thirdAI() {
  if (board._gameState.board._availableCards.length != 0) {
    let level = 1;
    for (let i = 0; i < board._gameState.board._availableCards.length; i++) {
      if (board._gameState.board._availableCards[i].cardData.level > level) {
        level = board._gameState.board._availableCards[i].cardData.level;
      }
    }
    let selectableCards = [];
    for (let i = 0; i < board._gameState.board._availableCards.length; i++) {
      if (board._gameState.board._availableCards[i].cardData.level == level) {
        selectableCards.push(board._gameState.board._availableCards[i]);
      }
    }
    let item =
      selectableCards[Math.floor(Math.random() * selectableCards.length)];
    board.buyCard(item);
  } else if (board._gameState.board._availableTokens.length != 0) {
    let wantedCards = [];
    for (let i = 0; i < board._gameState.board._cardsOnBorad.length; i++) {
      wantedCards.push(board._gameState.board._cardsOnBorad[i]);
    }
    if (wantedCards.length != 0) {
      let wantedCard = wantedCards[0];
      for (let i = 1; i < wantedCards.length; i++) {
        if (countDiff(wantedCards[i]).diff < countDiff(wantedCard).diff) {
          wantedCard = wantedCards[i];
        }
      }
      let items = [
        countDiff(wantedCard).white,
        countDiff(wantedCard).blue,
        countDiff(wantedCard).green,
        countDiff(wantedCard).red,
        countDiff(wantedCard).black,
      ];
      let item = null;
      for (let i = 0; i < items.length; i++) {
        if (items[i] != 0 && board.isTokenAvailable(board._tokens[i])) {
          item = board._tokens[i];
          break;
        }
      }
      if (item != null) {
        board.buyToken(item);
      } else {
        let item =
          board._gameState.board._availableTokens[
            Math.floor(
              Math.random() * board._gameState.board._availableTokens.length
            )
          ];
        board.buyToken(item);
      }
    } else {
      let item =
        board._gameState.board._availableTokens[
          Math.floor(
            Math.random() * board._gameState.board._availableTokens.length
          )
        ];
      board.buyToken(item);
    }
  } else {
    resetGame();
  }
}

function fourthAI() {}

function selectAIChoices() {
  let recentPlayer = board._playerIndex;
  if (board._players[recentPlayer].type == "AI1") {
    while (recentPlayer == board._playerIndex) {
      firstAI();
      board.selectNextPlayer();
    }
  } else if (board._players[recentPlayer].type == "AI2") {
    while (recentPlayer == board._playerIndex) {
      secondAI();
      board.selectNextPlayer();
    }
  } else if (board._players[recentPlayer].type == "AI3") {
    while (recentPlayer == board._playerIndex) {
      thirdAI();
      board.selectNextPlayer();
    }
  } else if (board._players[recentPlayer].type == "AI4") {
    while (recentPlayer == board._playerIndex) {
      fourthAI();
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
  board._players[0].type = first_player;
  board._players[1].type = second_player;
}

function initialize() {
  let scores = [];
  let turns = [];
  let firstPlayerPoints = [];
  let secondPlayerPoints = [];

  board = new Board();

  board._players[0].type = first_player;
  board._players[1].type = second_player;

  let first = 0;
  let second = 0;

  for (let i = 0; i < ROUNDS; i++) {
    let turn = 0;
    while (!isThereWinner()) {
      selectAIChoices();
      turn++;
      firstPlayerPoints.push(board._players[0].score.value);
      secondPlayerPoints.push(board._players[1].score.value);
    }
    if (board._winner == 0) {
      first++;
    } else if (board._winner == 1) {
      second++;
    }

    turns.push(turn);

    let score = board._players[0].score.value + board._players[1].score.value;
    scores.push(score);

    resetGame();
  }

  console.log(`Az elso jatekos ${first} alaklommal nyert.`);
  console.log(`A masodik jatekos ${second} alaklommal nyert.`);


  /*
  console.log(
    `Az elso jatekos pontszamai a jatek soran: ${firstPlayerPoints}.`
  );
  console.log(
    `A masodik jatekos pontszamai a jatek soran: ${secondPlayerPoints}.`
  );
  */

  console.log(`A jatek ${turns} korokbol allt.`);

  console.log(`A jatek osszpontszamai a jatek soran: ${scores}.`);
}

//initialize();
