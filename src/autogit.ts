const nums = [1, 2, 3, 4, 5];

// Remove the number 3
const idx = nums.indexOf(3);
if (idx !== -1) {
  nums.splice(idx, 1); // nums → [1, 2, 4, 5]
}
const chars = ['a', 'b', 'c', 'b', 'd'];

// Drop every 'b'
const withoutB = chars.filter(ch => ch !== 'b');
// withoutB → ['a', 'c', 'd']
const original = [10, 20, 30, 40, 50];

const removed = [
  ...original.slice(0, original.indexOf(30)),
  ...original.slice(original.indexOf(30) + 1),
];

// removed → [10, 20, 40, 50]
/**
 * Remove the first occurrence of `value` from `array`.
 * Returns a new array; the original array is not mutated.
 */
function removeFirst<T>(array: readonly T[], value: T): T[] {
  const idx = array.indexOf(value);
  if (idx === -1) return [...array]; // nothing to remove
  return [...array.slice(0, idx), ...array.slice(idx + 1)];
}
const data = [2, 4, 6, 8];
const updated = removeFirst(data, 6);
// updated → [2, 4, 8]
