const controller = (() => {
  const buttonAxis = document.querySelector('.btn-axis');

  const getCoords = (e) => {
    let x;
    let y;

    if (e.target.classList.length === 3) {
      x = e.target.classList[1].charAt(1);
      y = e.target.classList[2].charAt(1);
    }

    return [Number(x), Number(y)];
  };

  const whichAxis = () => {
    if (buttonAxis.textContent === 'Axis: X') {
      return 1;
    }
    return 0;
  };

  const changeAxis = (e) => {
    if (e.target.textContent === 'Axis: X') {
      e.target.textContent = 'Axis: Y';
    } else {
      e.target.textContent = 'Axis: X';
    }
  };


  return { getCoords, whichAxis, changeAxis };
})();

export default controller;
