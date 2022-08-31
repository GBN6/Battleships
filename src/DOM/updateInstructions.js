function updateInstruction(option) {
  const playerInstruction = document.querySelector('.player-instructions');
  if (option === 1) {
    playerInstruction.textContent = 'Now attack your opponent';
  } else if (option === 2) {
    playerInstruction.textContent = 'Place your ships first';
  }
}

export default updateInstruction;
