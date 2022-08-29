import gameboard from './gameboard';

const player = (() => {
  const board = gameboard();
  let currentShip = 5;
  function attackSquare(x, y, opponentBoard) {
    return opponentBoard.hitReceived(x, y);
  }

  function playerPlaceShip(x, y, dir) {
    if (!currentShip) return false;
    const placeSuccessfull = board.placeShip(x, y, dir, currentShip - 1);
    if (placeSuccessfull) {
      currentShip -= 1;
    }
    return placeSuccessfull;
  }

  return { board, attackSquare, playerPlaceShip };
})();

export default player;
