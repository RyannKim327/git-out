function secondLargest(arr: number[]): number | null {
  if (arr.length < 2) return null;          // Not enough values

  const sorted = [...arr].sort((a, b) => b - a); // descending
  return sorted[1];
}
function secondLargestLinear(arr: number[]): number | null {
  if (arr.length < 2) return null;

  let max = -Infinity;
  let second = -Infinity;

  for (const val of arr) {
    if (val > max) {
      second = max;
      max = val;
    } else if (val > second && val < max) {
      second = val;
    }
  }

  return second === -Infinity ? null : second;
}
export function findSecondLargest(arr: number[]): number | null
export function findSecondLargestLinear(arr: number[]): number | null
[
  { arr: [5, 1, 4, 3], expected: 4 },
  { arr: [5, 5, 3], expected: 3 },
  { arr: [5, 5, 5], expected: null },
  { arr: [], expected: null },
  { arr: [10], expected: null }
].forEach(({arr, expected}, i) => {
  const res = findSecondLargestLinear(arr);
  console.assert(res === expected, `case ${i} failed: got ${res}`);
});
