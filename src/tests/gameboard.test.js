import ship from '../modules/ship';
import gameboard from '../modules/gameboard';


const board = gameboard();

// test('place boat that doesn\'t fit', () => {
//   expect(board.placeShip(2, 6, 1, 4)).toBe(false);
// });

test('place boat at a location', () => {
  expect(board.placeShip(2, 2, 1, 2)).toBe(3);
});

// test('place boat at a location check(outside)', () => {
//   expect(board.placeShip(10, 10, 1, 2)).toBe(false);
// });

test('receiving hits work?', () => {
  expect(board.hitReceived(2, 2)).toStrictEqual([2, 2]);
});
test('attack on previously attacked position', () => {
  expect(board.hitReceived(2, 2)).toStrictEqual(null);
});
test('missing hit', () => {
  expect(board.hitReceived(2, 5)).toBe(false);
});

test('all ships have sunken', () => {
  expect(board.allShipsSunk([true, true, true, true, true])).toBe(true);
});

test('some ships remain standing', () => {
  expect(board.allShipsSunk([true, true, false, true, true])).toBe(false);
});
