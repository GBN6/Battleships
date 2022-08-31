const createGameboard = (() => {
  function board() {
    const playerBoard = document.querySelector('.player-gameboard');
    const computerBoard = document.querySelector('.computer-gameboard');

    while (playerBoard.firstChild) {
      playerBoard.removeChild(playerBoard.firstChild);
    }

    while (computerBoard.firstChild) {
      computerBoard.removeChild(computerBoard.firstChild);
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement('div');
        square.classList.add('player-square');
        square.classList.add(`x${i}`);
        square.classList.add(`y${j}`);
        playerBoard.append(square);
      }
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement('div');
        square.classList.add('computer-square');
        square.classList.add(`x${i}`);
        square.classList.add(`y${j}`);
        computerBoard.append(square);
      }
    }
  }

  function clearHover() {
    const playerSquare = document.querySelectorAll('.player-square');

    playerSquare.forEach((tile) => tile.classList.remove('hover'));
  }

  return { board, clearHover };
})();

export default createGameboard;
