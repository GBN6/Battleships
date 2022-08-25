const ship = (length) => {
  let hitCounter = 0;

  function hit() {
    hitCounter += 1;
    return 1;
  }

  function isSunk() {
    if (hitCounter === length) return true;
    return false;
  }

  return { length, hit, isSunk };
};

export default ship;
