const playerDrawShips = (x, y, dir, len) => {
  if (dir) {
    for (let i = y; i < y + len; i++) {
      const tile = document.querySelector(`.player-square.x${x}.y${i}`);
      tile.classList.add('select');
    }
  } else {
    for (let i = x; i < x + len; i++) {
      const tile = document.querySelector(`.player-square.x${i}.y${y}`);
      tile.classList.add('select');
    }
  }
};

export default playerDrawShips;
