/**
 * Recursive binary search.
 * @param data  A sorted array of comparable items.
 * @param target The value we’re looking for.
 * @param low   The lowest index (inclusive) of the current search window.
 * @param high  The highest index (exclusive) of the current search window.
 * @returns The index of `target` in `data`, or -1 if not found.
 */
function binarySearchRecursive<T>(
  data: T[],
  target: T,
  low: number = 0,
  high: number = data.length
): number {
  // Base case: no more elements left
  if (low >= high) return -1;

  // Middle index (floor division)
  const mid = Math.floor((low + high) / 2);
  const midVal = data[mid];

  // Compare: adjust the comparison operator (#) based on how you want to order T.
  // For numbers and strings this works out of the box. If you have a custom type,
  // supply a comparator instead of using `===` and `<`.
  if (midVal === target) {
    return mid;
  } else if (midVal < target) {
    // target is in the right half
    return binarySearchRecursive(data, target, mid + 1, high);
  } else {
    // target is in the left half
    return binarySearchRecursive(data, target, low, mid);
  }
}
const sorted = [1, 3, 5, 7, 9, 11, 13];

console.log(binarySearchRecursive(sorted, 7));  // → 3
console.log(binarySearchRecursive(sorted, 2));  // → -1
function binarySearchRecursiveCmp<T>(
  data: T[],
  target: T,
  cmp: (a: T, b: T) => number,
  low: number = 0,
  high: number = data.length
): number {
  if (low >= high) return -1;

  const mid = Math.floor((low + high) / 2);
  const midVal = data[mid];
  const order = cmp(midVal, target);

  if (order === 0) return mid;
  if (order < 0) return binarySearchRecursiveCmp(data, target, cmp, mid + 1, high);
  return binarySearchRecursiveCmp(data, target, cmp, low, mid);
}
interface Player { name: string; score: number }
const players: Player[] = [ {name:"A", score:10}, {name:"B", score:20}, {name:"C", score:30} ];

const cmp = (a: Player, b: Player) => a.score - b.score;
const idx = binarySearchRecursiveCmp(players, {name:"X", score:20}, cmp);
console.log(idx); // 1
