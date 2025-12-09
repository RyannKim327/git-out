/**
 * Binary search on a sorted numeric array.
 * @param arr Sorted array of numbers (ascending).
 * @param target Value to locate.
 * @returns Index of target, or -1 if not found.
 */
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // Faster than (left + right) / 2; avoids overflow in other languages
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

/* ---- Usage ---- */
const nums = [1, 3, 4, 7, 9, 15];
console.log(binarySearch(nums, 7));  // → 3
console.log(binarySearch(nums, 2));  // → -1
function binarySearch<T>(
  arr: T[],
  target: T,
  compare: (a: T, b: T) => number
): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const cmp = compare(arr[mid], target);

    if (cmp === 0) return mid;
    if (cmp < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
const words = ['apple', 'banana', 'cherry'];
console.log(binarySearch(words, 'banana', (a, b) => a.localeCompare(b))); // → 1
