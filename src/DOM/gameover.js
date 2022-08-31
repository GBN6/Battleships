const gameover = (() => {
  function gameoverDisplayWinner(winner) {
    const playerInstruction = document.querySelector('.player-instructions');
    if (winner === 'player') {
      playerInstruction.textContent = 'Game over! Player WON';
      playerInstruction.classList.add('winner');
    } else {
      playerInstruction.textContent = 'Game over! Computer WON';
      playerInstruction.classList.add('loser');
    }

    const buttonReset = document.createElement('button');
    buttonReset.textContent = 'Restart';
    buttonReset.classList.add('btn-reset');
    document.querySelector('.reset').append(buttonReset);
  }

  return { gameoverDisplayWinner };
})();

export default gameover;
