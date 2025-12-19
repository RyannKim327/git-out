/**
 * Comparator function.
 * Returns:
 *   - a negative number if a < b
 *   - zero               if a === b
 *   - a positive number  if a > b
 */
type Comparator<T> = (a: T, b: T) => number;

/**
 * Recursive binary search.
 *
 * @param arr        Sorted array to search.
 * @param target     Value we are looking for.
 * @param compare    Comparator that knows how to order the elements.
 * @param left       Left bound (inclusive). Omit for the initial call.
 * @param right      Right bound (exclusive). Omit for the initial call.
 *
 * @returns Index of `target` in `arr`, or -1 if not found.
 */
function binarySearchRecursive<T>(
  arr: readonly T[],
  target: T,
  compare: Comparator<T>,
  left: number = 0,
  right: number = arr.length
): number {
  // Base case: empty interval → not found
  if (left >= right) {
    return -1;
  }

  // Middle index (avoid overflow with left + (right-left)/2)
  const mid = left + Math.floor((right - left) / 2);
  const cmp = compare(arr[mid], target);

  if (cmp === 0) {
    // Found! Return the index.
    return mid;
  } else if (cmp > 0) {
    // arr[mid] > target → search left half [left, mid)
    return binarySearchRecursive(arr, target, compare, left, mid);
  } else {
    // arr[mid] < target → search right half (mid+1, right)
    return binarySearchRecursive(arr, target, compare, mid + 1, right);
  }
}
const numbers = [1, 3, 5, 7, 9, 12, 15, 20];
const idx = binarySearchRecursive(
  numbers,
  12,
  (a, b) => a - b   // simple numeric comparator
);
console.log(idx); // → 5
const words = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape'];
const idx = binarySearchRecursive(
  words,
  'date',
  (a, b) => a.localeCompare(b)
);
console.log(idx); // → 3
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: 'Ada' },
  { id: 3, name: 'Bob' },
  { id: 5, name: 'Cara' },
  { id: 7, name: 'Dan' },
];

const targetId = 5;
const idx = binarySearchRecursive(
  people,
  { id: targetId, name: '' }, // only `id` matters for comparison
  (a, b) => a.id - b.id
);
console.log(idx); // → 2
function binarySearchIterative<T>(arr: readonly T[], target: T, compare: Comparator<T>): number {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    const cmp = compare(arr[mid], target);

    if (cmp === 0) return mid;
    if (cmp > 0) right = mid;          // search left half
    else left = mid + 1;               // search right half
  }
  return -1;
}
// ---------- binarySearchRecursive.ts ----------
type Comparator<T> = (a: T, b: T) => number;

function binarySearchRecursive<T>(
  arr: readonly T[],
  target: T,
  compare: Comparator<T>,
  left: number = 0,
  right: number = arr.length
): number {
  if (left >= right) return -1;

  const mid = left + Math.floor((right - left) / 2);
  const cmp = compare(arr[mid], target);

  if (cmp === 0) return mid;
  if (cmp > 0) return binarySearchRecursive(arr, target, compare, left, mid);
  return binarySearchRecursive(arr, target, compare, mid + 1, right);
}

// ---------- demo ----------
const nums = [2, 4, 6, 8, 10, 12, 14];
const idxNum = binarySearchRecursive(nums, 10, (a, b) => a - b);
console.log('Number index:', idxNum); // → 4

const words = ['ant', 'bee', 'cat', 'dog', 'eel'];
const idxWord = binarySearchRecursive(words, 'dog', (a, b) => a.localeCompare(b));
console.log('Word index:', idxWord); // → 3
