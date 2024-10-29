// module.test.js
import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const data = mut.sum(12, 18);
  expect(data).toBe(expected);
});

test('Testing div simple -- success', () => {
  const expected = 2.5;
  const data = mut.div(20, 8);
  expect(data).toBe(expected);
})

test('Testing div 0 -- success', () => {
  const expected = Infinity;
  const data = mut.div(20, 0);
  expect(data).toBe(expected);
})

test('Testing div irrational -- success', () => {
  const expected = 1.3333333333333333
  const data = mut.div(4, 3);
  expect(data).toBe(expected);
})

test('Testing Contains number true -- success', () => {
  const expected = true
  const data = mut.containsNumbers("a123");
  expect(data).toBe(expected);
})

test('Testing Contains number false -- success', () => {
  const expected = false
  const data = mut.containsNumbers("werPVO-!@#$%^&*()_+`~:<>?[]o");
  expect(data).toBe(expected);
})

test('Testing Contains number special -- success', () => {
  const expected = false
  const data = mut.containsNumbers("w\nhi' '");
  expect(data).toBe(expected);
})

