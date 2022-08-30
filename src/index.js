import player from "./modules/player";
import computer from "./modules/computer";
import playerDrawShips from "./DOM/drawShip";
import createGameboard from "./DOM/createBoard";
import controller from "./DOM/getAxisAndCoords"


createGameboard.board();


function playerClick(e) {
  const coords = controller.getCoords(e);
  const dir = controller.whichAxis();
  const lenOfCurShip = player.playerPlaceShip(coords[0], coords[1], dir);
  if (lenOfCurShip) playerDrawShips(coords[0], coords[1], dir, lenOfCurShip);
}

const ptiles = document.querySelectorAll('.player-square');
ptiles.forEach((ptile) => ptile.addEventListener('click', playerClick));