const createGameboard = (() => {
  function board() {
    const playerBoard = document.querySelector('.player-gameboard');
    const computerBoard = document.querySelector('.computer-gameboard');

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement('div');
        square.classList.add('player-square');
        square.classList.add(`${i}x`);
        square.classList.add(`${j}y`);
        playerBoard.append(square);
      }
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement('div');
        square.classList.add('computer-square');
        square.classList.add(`${i}x`);
        square.classList.add(`${j}y`);
        computerBoard.append(square);
      }
    }
  }

  return { board };
})();

export default createGameboard;
