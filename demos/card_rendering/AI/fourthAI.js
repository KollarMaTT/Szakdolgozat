function selectRequiredTokens(wantedCard){
    let reqColors = [];
    if(countDiff(wantedCard).white > 0){
        reqColors.push("white");
    }
    if(countDiff(wantedCard).blue > 0){
        reqColors.push("blue");
    }
    if(countDiff(wantedCard).green > 0){
        reqColors.push("green");
    }
    if(countDiff(wantedCard).red > 0){
        reqColors.push("red");
    }
    if(countDiff(wantedCard).black > 0){
        reqColors.push("black");
    }
    return reqColors;
}


function fourthAIChoices() {
    let usableColors = {
        "#FFFFFF": "white",
        "#5264FF": "blue",
        "#3FBA3F": "green",
        "#FD3333": "red",
        "#686868": "black",
      };

    let wantedCard = board._gameState.board._cardsOnBoard[8];
    for(let i = 9; i<12;i++){
        if(countDiff(board._gameState.board._cardsOnBoard[i]).diff < countDiff(wantedCard).diff){
            wantedCard = board._gameState.board._cardsOnBoard[i];
        }
    }

    let selectableCards = [];

    if(board._gameState.board._availableCards.includes(wantedCard)){
        board.buyCard(wantedCard);
    }else if(board._gameState.board._availableCards.length != 0){
        for (let i = 0; i < board._gameState.board._availableCards.length; i++) {
            if(selectRequiredTokens(wantedCard).includes(usableColors[board._gameState.board._availableCards[i].cardData.color])){
                selectableCards.push(board._gameState.board._availableCards[i]);
            }
        }
        if(selectableCards.length != 0){
            let item = selectableCards[Math.floor(Math.random() * selectableCards.length)];
            board.buyCard(item);
        }else if (board._gameState.board._availableTokens.length != 0) {
          let selectableTokens = [];
    
          for (let i = 0; i < board._gameState.board._availableTokens.length; i++) {
            if(selectRequiredTokens(wantedCard).includes(usableColors[board._availableTokens[i].color])){
              selectableTokens.push(board._gameState.board._availableTokens[i]);
            }
          }
    
          if(selectableTokens.length != 0){
            let item = selectableTokens[ Math.floor( Math.random() * selectableTokens.length)];
            board.buyToken(item);
          }else{
            let token =
                  board._gameState.board._availableTokens[
                    Math.floor(
                      Math.random() * board._gameState.board._availableTokens.length
                    )
                  ];
                board.buyToken(token);
          }
        } else {
            let item = board._gameState.board._availableCards[Math.floor(Math.random() * board._gameState.board._availableCards.length)];
            board.buyCard(item);
          }
    }else if (board._gameState.board._availableTokens.length != 0) {
      let selectableTokens = [];

      for (let i = 0; i < board._gameState.board._availableTokens.length; i++) {
        if(selectRequiredTokens(wantedCard).includes(usableColors[board._availableTokens[i].color])){
          selectableTokens.push(board._gameState.board._availableTokens[i]);
        }
      }

      if(selectableTokens.length != 0){
        let item = selectableTokens[ Math.floor( Math.random() * selectableTokens.length)];
        board.buyToken(item);
      }else{
        let token =
              board._gameState.board._availableTokens[
                Math.floor(
                  Math.random() * board._gameState.board._availableTokens.length
                )
              ];
            board.buyToken(token);
      }
    } else {
      resetGame();
    }
}