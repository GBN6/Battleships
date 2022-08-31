import player from './modules/player';
import computer from './modules/computer';
import playerDrawShips from './DOM/drawShip';
import createGameboard from './DOM/createBoard';
import controller from './DOM/getAxisAndCoords';
import hoverShip from './DOM/hoverShip';

createGameboard.board();

let play = player();

function playerClick(e) {
  const coords = controller.getCoords(e);
  const dir = controller.whichAxis();
  const lenOfCurShip = play.playerPlaceShip(coords[0], coords[1], dir);
  if (lenOfCurShip) playerDrawShips(coords[0], coords[1], dir, lenOfCurShip);
}

const playerSquare = document.querySelectorAll('.player-square');
playerSquare.forEach((square) => square.addEventListener('click', playerClick));

const axisButton = document.querySelector('.btn-axis');
axisButton.addEventListener('click', controller.changeAxis);


function playerShipHover(e) {
  const hoverCounter = play.board.shipToHover();
  if (!hoverCounter) {
    playerSquare.forEach((square) => square.removeEventListener('mouseover', playerShipHover));
    playerSquare.forEach((square) => square.removeEventListener('mouseleave', playerShipHover))
  }
  const coords = controller.getCoords(e);
  const direction = controller.whichAxis();
  // createGameboard.board();
  hoverShip.hover(coords[0], coords[1], direction, hoverCounter);
}

playerSquare.forEach((square) => square.addEventListener('mouseover', playerShipHover))
playerSquare.forEach((square) => square.addEventListener('mouseleave', playerShipHover))