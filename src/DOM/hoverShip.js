const hoverShip = (() => {
  const boardLength = 10;

  function isPlacingPossible(x, y, dir, leng) {
    if (dir) {
      for (let i = y; i < y + leng; i++) {
        const square = document.querySelector(`.player-square.x${x}.y${i}`);
        if (
          square.classList.contains('ship-placed') ||
          square.classList.contains('hover')
        ) {
          return false;
        }
      }
    } else {
      for (let i = x; i < x + leng; i++) {
        const square = document.querySelector(`.player-square.x${i}.y${y}`);
        if (
          square.classList.contains('ship-placed') ||
          square.classList.contains('hover')
        ) {
          return false;
        }
      }
    }
    return true;
  }

  function hover(x, y, dir, len) {
    if (x > boardLength - 1 || y > boardLength - 1) return;
    if (dir === 1 && y + len < boardLength + 1) {
      if (!isPlacingPossible(x, y, dir, len)) return;
      for (let i = 0; i < boardLength; i++) {
        for (let j = 0; j < boardLength; j++) {
          if (i === x && j < y + len && j >= y) {
            document
              .querySelector(`.player-square.x${i}.y${j}`)
              .classList.add('hover');
          }
        }
      }
    }
    if (dir === 0 && x + len < boardLength + 1) {
      if (!isPlacingPossible(x, y, dir, len)) return;
      for (let i = 0; i < boardLength; i++) {
        for (let j = 0; j < boardLength; j++) {
          if (i >= x && i < x + len && j === y) {
            document
              .querySelector(`.player-square.x${i}.y${j}`)
              .classList.add('hover');
          }
        }
      }
    }
  }
  return { hover };
})();

export default hoverShip;
