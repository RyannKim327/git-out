// Majority element finder – works for any type that supports === comparison
export function majorityElement<T>(arr: T[]): T | null {
  if (arr.length === 0) return null;

  // 1st pass: find a candidate
  let candidate = arr[0];
  let count = 1;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === candidate) {
      count++;
    } else if (count === 0) {
      candidate = arr[i];
      count = 1;
    } else {
      count--;
    }
  }

  // 2nd pass: verify that the candidate is really a majority
  count = 0;
  for (const v of arr) {
    if (v === candidate) count++;
  }

  return count > Math.floor(arr.length / 2) ? candidate : null;
}
const nums = [3, 1, 3, 3, 2, 3, 3];
const maj = majorityElement(nums);

console.log(maj); // → 3
function majorityBySorting<T>(arr: T[]): T | null {
  if (arr.length === 0) return null;

  const sorted = [...arr].sort(); // lexicographic for strings, numeric for numbers
  const midVal = sorted[Math.floor(arr.length / 2)];

  const count = sorted.reduce((c, v) => (v === midVal ? c + 1 : c), 0);
  return count > Math.floor(arr.length / 2) ? midVal : null;
}
// A simple quick‑check
export function testMajority() {
  const cases: Array<[any[], any | null]> = [
    [[1, 2, 1, 1, 3], 1],
    [['a', 'b', 'a', 'a', 'c'], 'a'],
    [[5, 5, 6, 6, 5], 5],
    [[1, 2, 3], null],
  ];

  for (const [arr, expected] of cases) {
    const result = majorityElement(arr);
    if (result !== expected) {
      console.error(`❌ Failed for ${JSON.stringify(arr)}: got ${result}`);
    } else {
      console.log(`✅ ${JSON.stringify(arr)} → ${result}`);
    }
  }
}
