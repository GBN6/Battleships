import computer from "../modules/computer";
import gameboard from "../modules/gameboard";
import ship from "../modules/ship";

test('Computer board initialization', () => {
    expect(computer.initializeComputer());
});

test('computer attacks a square', () => {
    const board = gameboard();
    //   gb.place(2, 2, 1, ship(2));
    expect(computer.attackSquare(board)).toBe(false);
  });