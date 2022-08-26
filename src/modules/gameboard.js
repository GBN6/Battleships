import ship from './ship';

const gameboard = () => {
  // All ships
  // 1-Carrier-5
  // 2-Battleship-4
  // 3-Destroyer-3
  // 4-Submarine-3
  // 5-Patrol Boat-2

  const carrier = ship(5);
  const battleship = ship(4);
  const destroyer = ship(3);
  const submarine = ship(3);
  const patrol = ship(2);

  const allShips = [patrol, submarine, destroyer, battleship, carrier];

  const boardLength = 10;
  const gameboardGrid = Array(boardLength)
    .fill()
    .map(() => Array(boardLength).fill(0));
  const missed = [];

  function isPlacingPossible(x, y, dir, length) {
    if (dir) {
      for (let i = y; i < y + length; i++) {
        if (gameboardGrid[x][i]) return false;
    }
        else {
            for (let i = x; i < x + length; i++) {
                if (gameboardGrid[i][y]) return false;
            }
        }
      
    }
    return true;
  }
};
