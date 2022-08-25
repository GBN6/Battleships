import ship from '../modules/ship';

const s = ship(1);

test('give ship length', () => {
  expect(s.length).toEqual(1);
});

test('ship hit and sink ', () => {
  s.hit();
  expect(s.isSunk()).toBe(true);
});
