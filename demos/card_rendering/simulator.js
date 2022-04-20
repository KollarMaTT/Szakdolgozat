const ROUNDS = 10000;
const first_player = "AI5";
const second_player = "AI5";

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
  } else if (board._players[recentPlayer].type == "AI3") {
    while (recentPlayer == board._playerIndex) {
      thirdAIChoices();
      board.selectNextPlayer();
    }
  } else if (board._players[recentPlayer].type == "AI4") {
    while (recentPlayer == board._playerIndex) {
      fourthAIChoices();
      board.selectNextPlayer();
    }
  }else if (board._players[recentPlayer].type == "AI5") {
    while (recentPlayer == board._playerIndex) {
      fifthAIChoices();
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
    `Az elso jatekos pontszamai egy jatek soran: ${firstPlayerPoints}.`
  );
  console.log(
    `A masodik jatekos pontszamai egy jatek soran: ${secondPlayerPoints}.`
  );
  */

  //console.log(`A jatek ${turns} korokbol allt.`);

  //console.log(`A jatek osszpontszamai a jatek soran: ${scores}.`);
}
