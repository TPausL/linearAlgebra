import Vector from '../Vector';

test('size', () => {
  expect(new Vector(5, 3, 1).size).toBe(3);
  expect(new Vector([5, 3, 1]).size).toBe(3);
});

test('length', () => {
  expect(new Vector(5, 3, 1).length).toBeCloseTo(Math.sqrt(5 ** 2 + 3 ** 2 + 1));
  expect(new Vector(3, 4, 0).length).toBeCloseTo(5);
});

test('indexer', () => {
  expect(new Vector(5, 3, 1)[0]).toBe(5);
  expect(new Vector([5, 3, 1])[1]).toBe(3);
});

test('adding', () => {
  const a = new Vector(1, 2, 3);
  const b = new Vector(2, 4, 6);
  const c = a.add(b);
  expect(a.asArray()).toEqual(expect.arrayContaining(new Vector(1, 2, 3).asArray()));
  expect(b.asArray()).toEqual(expect.arrayContaining(new Vector(2, 4, 6).asArray()));
  expect(c.asArray()).toEqual(expect.arrayContaining(new Vector(3, 6, 9).asArray()));

  expect(() => a.add(new Vector(1, 2))).toThrow('size');
});

test('subtracting', () => {
  const a = new Vector(1, 2, 3);
  const b = new Vector(2, 4, 6);
  const c = a.subtract(b);
  expect(a.asArray()).toEqual(new Vector(1, 2, 3).asArray());
  expect(b.asArray()).toEqual(new Vector(2, 4, 6).asArray());
  expect(c.asArray()).toEqual(new Vector(-1, -2, -3).asArray());

  expect(() => a.subtract(new Vector(1, 2))).toThrow('size');
});

test('dot product', () => {
  const a = new Vector(1, 1, 1);
  const b = new Vector(2, 4, 6);
  const c = new Vector(-8, 4, 0);
  expect(a.dot(b)).toBe(12);
  expect(a.dot(c)).toBe(-4);
  expect(b.dot(c)).toBe(0);

  expect(() => a.dot(new Vector(1, 2))).toThrow('size');
});

test('cross product', () => {
  const a = new Vector(1, 1, 1);
  const b = new Vector(2, 4, 6);
  const c = new Vector(-8, 4, 0);

  expect(a.cross(b).array).toEqual([2, -4, 2]);
  expect(a.cross(c).array).toEqual([-4, -8, 12]);
  expect(b.cross(c).array).toEqual([-24, -48, 40]);

  expect(() => a.cross(new Vector(1, 2))).toThrow('size');
});

test('get perpendicular', () => {
  const a = new Vector(1, 1, 1);
  const b = new Vector(2, 4);

  expect(a.getPerpendicular().array).toEqual([1, -1, 0]);
  expect(b.getPerpendicular().array).toEqual([4, 2]);
});

test('multiply', () => {
  const a = new Vector(1, 1, 1);
  const b = new Vector(2, 4);

  expect(a.scale(3).array).toEqual([3, 3, 3]);
  expect(b.multiply(1 / 2).array).toEqual([1, 2]);
});

test('divide', () => {
  const a = new Vector(1, 1, 1);
  const b = new Vector(2, 4);

  expect(a.divide(3).array).toEqual([1 / 3, 1 / 3, 1 / 3]);
  expect(b.divide(1 / 2).array).toEqual([4, 8]);
});

test('normalize', () => {
  const a = new Vector(1, 1, 1);
  const b = new Vector(2, 4, 6);
  const c = new Vector(2, 4);

  console.log(a.normalize().array);
  expectToBeCloseToArray(a.normalize().array, [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)]);
  expectToBeCloseToArray(b.normalize().array, [1 / Math.sqrt(14), Math.sqrt(2 / 7), 3 / Math.sqrt(14)]);
  expectToBeCloseToArray(c.normalize().array, [2 / Math.sqrt(20), 4 / Math.sqrt(20)]);
});

function expectToBeCloseToArray(actual: number[], expected: number[]) {
  expect(actual.length).toBe(expected.length);
  actual.forEach((x: number, i: number) => expect(x).toBeCloseTo(expected[i]));
}
