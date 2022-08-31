const showAttackedSquare = (array, board) => {
  const attackedSquare = document.querySelector(
    `.${board}.x${array[0]}.y${array[1]}`
  );

  if (array[2]) {
    attackedSquare.classList.add('hit');
  } else {
    attackedSquare.classList.add('miss');
  }
};

export default showAttackedSquare;
