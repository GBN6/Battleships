const ship = (leng) => {
  let hitCounter = 0;

  function hit() {
    hitCounter += 1;
    return 1;
  }

  function isSunk() {
    if (hitCounter === leng) return true;
    return false;
  }

  return { leng, hit, isSunk };
};

export default ship;
