import ship from './ship';

const gameboard = () => {
  // All ships
  // 1-Carrier-5
  // 2-Battleship-4
  // 3-Destroyer-3
  // 4-Submarine-3
  // 5-Patrol Boat-2

  const boat5 = ship(5);
  const boat4 = ship(4);
  const boat3 = ship(3);
  const boat2 = ship(3);
  const boat1 = ship(2);

  const allShips = [boat1, boat2, boat3, boat4, boat5];

  const boardLength = 10;
  let counterHover = 4;
  const gameboardGrid = Array(boardLength)
    .fill()
    .map(() => Array(boardLength).fill(0));

  function isPlacingPossible(x, y, dir, leng) {
    if (dir) {
      for (let i = y; i < y + leng; i++) {
        if (gameboardGrid[x][i]) return false;
      }
    } else {
      for (let i = x; i < x + leng; i++) {
        if (gameboardGrid[i][y]) return false;
      }
    }
    return true;
  }

  function allShipsSunk(ships) {
    const sunkValue = ships.map((boat) => boat.isSunk());
    return sunkValue.every((value) => value === true);
  }

  // dir values
  // 0: vertical
  // 1: horizontal

  function placeShip(x, y, dir, currentShipName) {
    const currentShip = allShips[currentShipName];

    if (x > boardLength - 1 || y > boardLength - 1) return false;
    if (dir === 1 && y + currentShip.leng < boardLength + 1) {
      if (!isPlacingPossible(x, y, dir, currentShip.leng)) return false;
      for (let i = 0; i < boardLength; i++) {
        for (let j = 0; j < boardLength; j++) {
          if (i === x && j < y + currentShip.leng && j >= y) {
            gameboardGrid[i][j] = currentShip;
          }
        }
      }
      counterHover -= 1; 
      return currentShip.leng;
    }
    if (dir === 0 && x + currentShip.leng < boardLength + 1) {
      if (!isPlacingPossible(x, y, dir, currentShip.leng)) return false;
      for (let i = 0; i < boardLength; i++) {
        for (let j = 0; j < boardLength; j++) {
          if (i >= x && i < x + currentShip.leng && j === y) {
            gameboardGrid[i][j] = currentShip;
          }
        }
      }
      counterHover -= 1;
      return currentShip.leng;
    }
    return false;
  }

  function hitReceived(x, y) {
    if (gameboardGrid[x][y] === 1) return null;
    if (gameboardGrid[x][y]) {
      gameboardGrid[x][y] = gameboardGrid[x][y].hit();
      if (allShipsSunk(allShips)) return [x, y, 1, 0];
      return [x, y, 1];
    }
    gameboardGrid[x][y] = 1;
    return [x, y, 0];
  }

  function shipToHover() {
    if (counterHover === -1) return false;
    return allShips[counterHover].leng;
  }

  return { placeShip, hitReceived, allShipsSunk, shipToHover };
};

export default gameboard;
