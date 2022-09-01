const showAttackedSquare = (array, board) => {
  const attackedSquare = document.querySelector(
    `.${board}.x${array[0]}.y${array[1]}`
  );

  if (array[2]) {
    attackedSquare.classList.add('hit');
    attackedSquare.classList.add('hit-mark');
  } else {
    attackedSquare.classList.add('miss');
    attackedSquare.classList.add('miss-mark');
  }
};

export default showAttackedSquare;
