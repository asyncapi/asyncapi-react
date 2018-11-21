const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

test('basic', () => {
  expect(sum()).toBe(0);
});
