function thirdAIChoices() {
  let selectableCards = [];

    if (board._gameState.board._availableCards.length != 0) {

      for (let i = 0; i < board._gameState.board._availableCards.length; i++) {
        if (board._gameState.board._availableCards[i].cardData.point % 2 == 0) {
          selectableCards.push(board._gameState.board._availableCards[i]);
        }else{
          let level = 1;
          for (let i = 0; i < board._gameState.board._availableCards.length; i++) {
            if (board._gameState.board._availableCards[i].cardData.level > level) {
              level = board._gameState.board._availableCards[i].cardData.level;
            }
          }
          for (let i = 0; i < board._gameState.board._availableCards.length; i++) {
            if (board._gameState.board._availableCards[i].cardData.level == level) {
              selectableCards.push(board._gameState.board._availableCards[i]);
            }
          }
        }
      }

      let item = selectableCards[Math.floor(Math.random() * selectableCards.length)];

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