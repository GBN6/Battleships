import gameboard from './gameboard';

const computer = (() => {
  const board = gameboard();

  function randomBoat(len) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const rngDir = Math.floor(Math.random() * 1);

    const place = board.placeShip(x, y, rngDir, len);

    if (!place) {
      randomBoat(len);
    }
  }

  function initializeComputerBoats() {
    randomBoat(0);
    randomBoat(1);
    randomBoat(2);
    randomBoat(3);
    randomBoat(4);
  }

  function attackSquare(opponentBoard) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const attack = opponentBoard.hitReceived(x, y);

    if (attack === null) {
      return attackSquare(opponentBoard);
    }
    return attack;
  }
  return { board, initializeComputerBoats, attackSquare };
})();

export default computer;
