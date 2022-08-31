const playerDrawShips = (x, y, dir, len) => {
  if (dir) {
    for (let i = y; i < y + len; i++) {
      const square = document.querySelector(`.player-square.x${x}.y${i}`);
      square.classList.add('ship-placed');
    }
  } else {
    for (let i = x; i < x + len; i++) {
      const square = document.querySelector(`.player-square.x${i}.y${y}`);
      square.classList.add('ship-placed');
    }
  }
};

export default playerDrawShips;
