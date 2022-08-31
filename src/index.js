import player from './modules/player';
import computer from './modules/computer';
import playerDrawShips from './DOM/drawShip';
import createGameboard from './DOM/createBoard';
import controller from './DOM/getAxisAndCoords';
import hoverShip from './DOM/hoverShip';
import gameover from './DOM/gameover';
import updateInstruction from './DOM/updateInstructions';
import showAttackedSquare from './DOM/showAttackedSquare';

let players = player();
let comp = computer();

createGameboard.board();
comp.initializeComputerBoats();

const axisButton = document.querySelector('.btn-axis');
const playerSquare = document.querySelectorAll('.player-square');
const compSquare = document.querySelectorAll('.computer-square');

function playerAttack(e) {
  const coords = controller.getCoords(e);
  if (!coords) return;
  let attackResult = players.attackSquare(coords[0], coords[1], comp.board);

  showAttackedSquare(attackResult, 'computer-square');
  if (attackResult === 4) {
    gameover.gameoverDisplayWinner('player');
    const resetButton = document.querySelector('.btn-reset');
    resetButton.addEventListener('click', resetGame);
    compSquare.forEach((square) =>
      square.removeEventListener('click', playerAttack)
    );
    return;
  }
  attackResult = comp.attackSquare(players.board);
  showAttackedSquare(attackResult, 'player-square');

  if (attackResult === 4) {
    gameover.gameoverDisplayWinner('computer');
    const resetButton = document.querySelector('.btn-reset');
    resetButton.addEventListener('click', resetGame);
    compSquare.forEach((square) =>
      square.removeEventListener('click', playerAttack)
    );
  }
}

function playerPlaceShip(e) {
  createGameboard.clearHover();
  const coords = controller.getCoords(e);
  const dir = controller.whichAxis();
  const lenOfCurShip = players.playerPlaceShip(coords[0], coords[1], dir);
  playerDrawShips(coords[0], coords[1], dir, lenOfCurShip);
  if (lenOfCurShip === 2) {
    updateInstruction(1);
    compSquare.forEach((square) =>
      square.addEventListener('click', playerAttack)
    );
  }
}

function playerShipHover(e) {
  const hoverCounter = players.board.shipToHover();
  if (!hoverCounter) {
    playerSquare.forEach((square) =>
      square.removeEventListener('mouseover', playerShipHover)
    );
    playerSquare.forEach((square) =>
      square.removeEventListener('mouseleave', playerShipHover)
    );
  }
  const coords = controller.getCoords(e);
  const direction = controller.whichAxis();
  createGameboard.clearHover();
  hoverShip.hover(coords[0], coords[1], direction, hoverCounter);
}

function resetGame() {
  createGameboard.board();
  players = player();
  comp = computer();
  comp.initializeComputerBoats();

  playerSquare.forEach((square) =>
    square.addEventListener('click', playerPlaceShip)
  );
  playerSquare.forEach((square) =>
    square.addEventListener('mouseover', playerShipHover)
  );
  playerSquare.forEach((square) =>
    square.addEventListener('mouseleave', playerShipHover)
  );
  axisButton.addEventListener('click', controller.changeAxis);

  const resetButton = document.querySelector('.btn-reset');
  resetButton.remove();
  updateInstruction(2);
}

playerSquare.forEach((square) =>
  square.addEventListener('click', playerPlaceShip)
);

playerSquare.forEach((square) =>
  square.addEventListener('mouseover', playerShipHover)
);
playerSquare.forEach((square) =>
  square.addEventListener('mouseleave', playerShipHover)
);

axisButton.addEventListener('click', controller.changeAxis);
