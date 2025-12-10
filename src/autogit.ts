/**
 * Recursively searches for `target` in a sorted array.
 *
 * @param arr    The sorted array to search.
 * @param target The value we are looking for.
 * @param compareFn Optional comparator (a‑b) => number.
 *                 Return <0 if a < b, 0 if equal, >0 if a > b.
 * @returns The index of `target` in `arr`, or -1 if not found.
 */
export function binarySearchRecursive<T>(
  arr: readonly T[],
  target: T,
  compareFn: (a: T, b: T) => number = defaultCompare
): number {
  // Helper that carries the current low/high bounds.
  function search(low: number, high: number): number {
    if (low > high) {
      // Base case: interval empty → not found
      return -1;
    }

    const mid = Math.floor((low + high) / 2);
    const cmp = compareFn(arr[mid], target);

    if (cmp === 0) {
      // Found!
      return mid;
    } else if (cmp < 0) {
      // arr[mid] < target → search right half
      return search(mid + 1, high);
    } else {
      // arr[mid] > target → search left half
      return search(low, mid - 1);
    }
  }

  return search(0, arr.length - 1);
}

/** Default comparator works for numbers and strings. */
function defaultCompare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
const numbers = [1, 3, 5, 7, 9, 12, 15];
console.log(binarySearchRecursive(numbers, 7));   // → 3
console.log(binarySearchRecursive(numbers, 2));   // → -1
const words = ['apple', 'banana', 'cherry', 'date', 'fig'];
console.log(binarySearchRecursive(words, 'date')); // → 3
type User = { id: number; name: string };

const users: User[] = [
  { id: 1, name: 'Ada' },
  { id: 3, name: 'Bob' },
  { id: 5, name: 'Cara' },
  { id: 7, name: 'Dan' },
];

// Comparator that looks at the `id` field
const byId = (a: User, b: User) => a.id - b.id;

const target: User = { id: 5, name: '' }; // name irrelevant for search
console.log(binarySearchRecursive(users, target, byId)); // → 2
// binarySearchRecursive.ts
export function binarySearchRecursive<T>(
  arr: readonly T[],
  target: T,
  compareFn: (a: T, b: T) => number = defaultCompare
): number {
  function search(low: number, high: number): number {
    if (low > high) return -1;

    const mid = Math.floor((low + high) / 2);
    const cmp = compareFn(arr[mid], target);

    if (cmp === 0) return mid;
    if (cmp < 0) return search(mid + 1, high);
    return search(low, mid - 1);
  }

  return search(0, arr.length - 1);
}

function defaultCompare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/* -------------------------------------------------
   Example usage (uncomment to test in a Node/TS env)
------------------------------------------------- */
// const nums = [2, 4, 6, 8, 10, 12];
// console.log(binarySearchRecursive(nums, 8)); // 3
// console.log(binarySearchRecursive(nums, 5)); // -1
