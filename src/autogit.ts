/**
 * In-place quicksort (recursive).
 * @param arr  Array to sort
 * @param left  Left index (inclusive)
 * @param right Right index (inclusive)
 * @param compare Optional comparator (a, b) => number
 *                Return < 0  →  a < b
 *                       = 0  →  a = b
 *                       > 0  →  a > b
 */
function quickSortRecursive<T>(
  arr: T[],
  left = 0,
  right = arr.length - 1,
  compare: (a: T, b: T) => number = defaultCompare
): T[] {
  if (left >= right) return arr;

  const pivotIndex = partition(arr, left, right, compare);
  quickSortRecursive(arr, left, pivotIndex - 1, compare);
  quickSortRecursive(arr, pivotIndex + 1, right, compare);
  return arr;
}

/**
 * Lomuto partition scheme.
 * Returns the final index of the pivot.
 */
function partition<T>(
  arr: T[],
  left: number,
  right: number,
  compare: (a: T, b: T) => number
): number {
  const pivot = arr[right];
  let i = left;

  for (let j = left; j < right; j++) {
    if (compare(arr[j], pivot) < 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

/** Default comparator for primitives. */
function defaultCompare<T>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/* ---------- Optional: iterative version (no recursion) ---------- */
function quickSortIterative<T>(
  arr: T[],
  compare: (a: T, b: T) => number = defaultCompare
): T[] {
  const stack: number[] = [0, arr.length - 1];

  while (stack.length) {
    const right = stack.pop()!;
    const left  = stack.pop()!;

    if (left >= right) continue;

    const pivot = partition(arr, left, right, compare);
    // Push larger sub-range last to keep stack shallow
    if (pivot - left < right - pivot) {
      stack.push(pivot + 1, right);
      stack.push(left, pivot - 1);
    } else {
      stack.push(left, pivot - 1);
      stack.push(pivot + 1, right);
    }
  }
  return arr;
}

/* ---------- Usage examples ---------- */
const nums = [9, 2, 7, 12, -3, 0, 5];
quickSortRecursive(nums);
console.log(nums); // [-3, 0, 2, 5, 7, 9, 12]

const words = ["pear", "banana", "apple", "cherry"];
quickSortRecursive(words, 0, words.length - 1, (a, b) => a.localeCompare(b));
console.log(words); // ["apple", "banana", "cherry", "pear"]
