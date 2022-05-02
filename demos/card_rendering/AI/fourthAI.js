function countDiff(card) {
  let diff = 0;
  let white = (blue = green = red = black = 0);

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

function fourthAIChoices() {
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
    for (let i = 0; i < board._gameState.board._cardsOnBoard.length; i++) {
      wantedCards.push(board._gameState.board._cardsOnBoard[i]);
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
    }
  } else {
    resetGame();
  }
}
