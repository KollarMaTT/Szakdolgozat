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