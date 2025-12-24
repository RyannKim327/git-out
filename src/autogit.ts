/**
 * Returns the k‑th smallest element (1‑based) using Array.sort().
 * Throws if k is out of bounds.
 *
 * @param arr - The source array (will be **mutated** unless you pass a copy).
 * @param k   - 1‑based rank (k = 1 → smallest, k = arr.length → largest)
 */
function kthSmallestSort(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) {
    throw new RangeError(`k (${k}) must be between 1 and ${arr.length}`);
  }

  // If you don’t want to mutate the original array, clone it first:
  // const copy = [...arr];
  // copy.sort((a, b) => a - b);
  // return copy[k - 1];

  arr.sort((a, b) => a - b);   // numeric ascending
  return arr[k - 1];
}

/* Example */
const data = [7, 2, 5, 3, 9, 1];
console.log(kthSmallestSort(data, 3)); // → 3 (the 3rd smallest)
/**
 * Returns the k‑th smallest element (1‑based) using the Quick‑Select algorithm.
 * The input array is mutated (elements are rearranged during partitioning).
 *
 * @param arr - The source array.
 * @param k   - 1‑based rank.
 */
function kthSmallestQuickSelect(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) {
    throw new RangeError(`k (${k}) must be between 1 and ${arr.length}`);
  }

  // Convert to 0‑based index for internal use.
  const targetIdx = k - 1;

  // Helper: Lomuto partition (you can also use Hoare’s scheme).
  function partition(left: number, right: number, pivotIdx: number): number {
    const pivotValue = arr[pivotIdx];
    // Move pivot to end
    [arr[pivotIdx], arr[right]] = [arr[right], arr[pivotIdx]];
    let storeIdx = left;

    for (let i = left; i < right; i++) {
      if (arr[i] < pivotValue) {
        [arr[storeIdx], arr[i]] = [arr[i], arr[storeIdx]];
        storeIdx++;
      }
    }
    // Move pivot to its final place
    [arr[storeIdx], arr[right]] = [arr[right], arr[storeIdx]];
    return storeIdx;
  }

  // Iterative version to avoid deep recursion on pathological inputs.
  let left = 0;
  let right = arr.length - 1;

  while (true) {
    // If the sub‑array has only one element, that's the answer.
    if (left === right) return arr[left];

    // Choose a pivot – median‑of‑three is a cheap way to improve robustness.
    const mid = Math.floor((left + right) / 2);
    const pivotCandidates = [
      { idx: left, val: arr[left] },
      { idx: mid, val: arr[mid] },
      { idx: right, val: arr[right] },
    ];
    pivotCandidates.sort((a, b) => a.val - b.val);
    const pivotIdx = pivotCandidates[1].idx; // median value

    const pivotNewIdx = partition(left, right, pivotIdx);

    if (pivotNewIdx === targetIdx) {
      return arr[pivotNewIdx];
    } else if (pivotNewIdx > targetIdx) {
      // Desired element is in the left part.
      right = pivotNewIdx - 1;
    } else {
      // Desired element is in the right part.
      left = pivotNewIdx + 1;
    }
  }
}

/* Example */
const numbers = [12, 3, 5, 7, 19, 1, 8];
console.log(kthSmallestQuickSelect(numbers, 4)); // → 7 (4th smallest)
type Comparator<T> = (a: T, b: T) => number;

/**
 * Generic Quick‑Select that works on any array type.
 *
 * @param arr        - The array to search (mutated).
 * @param k          - 1‑based rank.
 * @param compare    - Comparator returning <0, 0, >0.
 */
function kthSmallest<T>(arr: T[], k: number, compare: Comparator<T>): T {
  if (k < 1 || k > arr.length) {
    throw new RangeError(`k (${k}) must be between 1 and ${arr.length}`);
  }

  const targetIdx = k - 1;

  function partition(left: number, right: number, pivotIdx: number): number {
    const pivot = arr[pivotIdx];
    [arr[pivotIdx], arr[right]] = [arr[right], arr[pivotIdx]];
    let storeIdx = left;

    for (let i = left; i < right; i++) {
      if (compare(arr[i], pivot) < 0) {
        [arr[storeIdx], arr[i]] = [arr[i], arr[storeIdx]];
        storeIdx++;
      }
    }
    [arr[storeIdx], arr[right]] = [arr[right], arr[storeIdx]];
    return storeIdx;
  }

  let left = 0;
  let right = arr.length - 1;

  while (true) {
    if (left === right) return arr[left];

    // median‑of‑three pivot (generic)
    const mid = Math.floor((left + right) / 2);
    const candidates = [
      { idx: left, val: arr[left] },
      { idx: mid, val: arr[mid] },
      { idx: right, val: arr[right] },
    ];
    candidates.sort((a, b) => compare(a.val, b.val));
    const pivotIdx = candidates[1].idx;

    const pivotNewIdx = partition(left, right, pivotIdx);

    if (pivotNewIdx === targetIdx) return arr[pivotNewIdx];
    if (pivotNewIdx > targetIdx) right = pivotNewIdx - 1;
    else left = pivotNewIdx + 1;
  }
}

/* Example with numbers */
const nums = [4, 2, 9, 1, 5];
console.log(kthSmallest(nums, 2, (a, b) => a - b)); // → 2

/* Example with objects */
interface Person { name: string; age: number; }
const people: Person[] = [
  { name: 'Alice', age: 34 },
  { name: 'Bob',   age: 28 },
  { name: 'Cara',  age: 41 },
  { name: 'Dan',   age: 23 },
];
const secondYoungest = kthSmallest(people, 2, (a, b) => a.age - b.age);
console.log(secondYoungest); // → { name: 'Bob', age: 28 }
// 1‑line version (mutates the array)
function kthSmallestSort(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) throw new RangeError('k out of bounds');
  arr.sort((a, b) => a - b);
  return arr[k - 1];
}

// Fast average‑case version (mutates the array)
function kthSmallestQuickSelect(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) throw new RangeError('k out of bounds');
  const target = k - 1;

  function partition(l: number, r: number, pIdx: number): number {
    const pivot = arr[pIdx];
    [arr[pIdx], arr[r]] = [arr[r], arr[pIdx]];
    let store = l;
    for (let i = l; i < r; i++) {
      if (arr[i] < pivot) {
        [arr[store], arr[i]] = [arr[i], arr[store]];
        store++;
      }
    }
    [arr[store], arr[r]] = [arr[r], arr[store]];
    return store;
  }

  let left = 0, right = arr.length - 1;
  while (true) {
    if (left === right) return arr[left];
    const mid = Math.floor((left + right) / 2);
    const piv = [left, mid, right].sort((a, b) => arr[a] - arr[b])[1];
    const p = partition(left, right, piv);
    if (p === target) return arr[p];
    if (p > target) right = p - 1;
    else left = p + 1;
  }
}
