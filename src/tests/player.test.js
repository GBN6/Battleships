import gameboard from "../modules/gameboard";
import player from "../modules/player";

test('Does ship receive attack', () => {
    const board = gameboard();
    board.placeShip(2, 2, 1, 2);
    expect(player.attackSquare(2, 2, board)).toStrictEqual([2, 2]);
});