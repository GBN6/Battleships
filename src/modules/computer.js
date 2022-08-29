import gameboard from './gameboard';

const computer = (() => {
  const board = gameboard();

  function initializeComputer() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let rngDir = Math.floor(Math.random() * 1);
    let n = 0;
    while (n <= 4) {
      if (board.placeShip(x, y, rngDir, n) === false) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        continue;
      }
      board.placeShip(x, y, rngDir, n);
      rngDir = Math.floor(Math.random() * 1);
      n++;
    }
  }

  function attackSquare(opponentBoard) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return opponentBoard.hitReceived(x, y);
  }
  return { board, initializeComputer, attackSquare };
})();

export default computer;
