/**
 * Throws a descriptive error if the supplied index is out of bounds.
 */
function assertKInRange<T>(arr: readonly T[], k: number): void {
  if (!Number.isInteger(k) || k < 1 || k > arr.length) {
    throw new RangeError(
      `k must be an integer between 1 and ${arr.length} (got ${k})`
    );
  }
}

/**
 * Swaps two elements in an array in‑place.
 */
function swap<T>(arr: T[], i: number, j: number): void {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
/**
 * Returns the k‑th smallest element (1‑based) by sorting the array.
 *
 * @param arr   The source array (will **not** be mutated).
 * @param k     1‑based rank (k = 1 → smallest, k = arr.length → largest)
 * @returns     The k‑th smallest element.
 *
 * @throws RangeError if k is out of bounds.
 */
export function kthSmallestBySorting<T>(arr: readonly T[], k: number): T {
  assertKInRange(arr, k);

  // Clone only if we must keep the original untouched.
  const copy = [...arr];
  copy.sort((a, b) => {
    // Works for numbers, strings, Dates, or any type that defines < and >.
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  // k is 1‑based → index = k‑1
  return copy[k - 1];
}
/**
 * Partition step of QuickSelect (Lomuto scheme).
 *
 * @param arr   The array being partitioned (mutated in‑place).
 * @param left  Left index of the sub‑array (inclusive).
 * @param right Right index of the sub‑array (inclusive).
 * @param pivotIndex Index of the pivot element.
 * @returns The final index of the pivot after partitioning.
 */
function partition<T>(arr: T[], left: number, right: number, pivotIndex: number): number {
  const pivotValue = arr[pivotIndex];
  // Move pivot to end
  swap(arr, pivotIndex, right);
  let storeIndex = left;

  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, storeIndex, i);
      storeIndex++;
    }
  }

  // Move pivot to its final place
  swap(arr, storeIndex, right);
  return storeIndex;
}

/**
 * QuickSelect – finds the element that would be at `k` if the array were sorted.
 *
 * @param arr   The array (will be mutated). If you need the original intact,
 *              pass a copy: `quickSelect([...arr], k)`.
 * @param kZeroBased  Desired rank, **0‑based** (0 → smallest).
 * @returns The k‑th smallest element.
 */
function quickSelect<T>(arr: T[], kZeroBased: number): T {
  let left = 0;
  let right = arr.length - 1;

  while (true) {
    // If the list contains only one element, return it
    if (left === right) {
      return arr[left];
    }

    // Choose a random pivot to avoid the worst‑case O(n²) on already sorted data
    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    const pivotNewIndex = partition(arr, left, right, pivotIndex);

    if (kZeroBased === pivotNewIndex) {
      return arr[pivotNewIndex];
    } else if (kZeroBased < pivotNewIndex) {
      right = pivotNewIndex - 1;
    } else {
      left = pivotNewIndex + 1;
    }
  }
}

/**
 * Public wrapper that validates `k` and hides the 0‑based internals.
 *
 * @param arr   The source array (will **not** be mutated; a copy is made internally).
 * @param k     1‑based rank (k = 1 → smallest).
 * @returns     The k‑th smallest element.
 *
 * @throws RangeError if k is out of bounds.
 */
export function kthSmallestQuickSelect<T>(arr: readonly T[], k: number): T {
  assertKInRange(arr, k);
  // Work on a shallow copy to keep the original array untouched.
  const copy = [...arr];
  return quickSelect(copy, k - 1);
}
// ---------------------------------------------------------------
// Demo – run with `ts-node` or compile to JS and execute with node
// ---------------------------------------------------------------
function demo() {
  const numbers = [7, 2, 5, 3, 9, 1, 4];
  const k = 4; // we expect the 4th smallest → 4

  console.log('Array:', numbers);
  console.log(`k = ${k}`);

  // 1️⃣ Using sorting
  const bySorting = kthSmallestBySorting(numbers, k);
  console.log('kth smallest (sorting):', bySorting);

  // 2️⃣ Using QuickSelect
  const byQuickSelect = kthSmallestQuickSelect(numbers, k);
  console.log('kth smallest (quick‑select):', byQuickSelect);
}

// Uncomment to run the demo
// demo();
Array: [ 7, 2, 5, 3, 9, 1, 4 ]
k = 4
kth smallest (sorting): 4
kth smallest (quick-select): 4
// ---------- utils ----------
function assertKInRange<T>(arr: readonly T[], k: number): void {
  if (!Number.isInteger(k) || k < 1 || k > arr.length) {
    throw new RangeError(
      `k must be an integer between 1 and ${arr.length} (got ${k})`
    );
  }
}
function swap<T>(arr: T[], i: number, j: number): void {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

// ---------- 1️⃣ Sort & index ----------
export function kthSmallestBySorting<T>(arr: readonly T[], k: number): T {
  assertKInRange(arr, k);
  const copy = [...arr];
  copy.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  return copy[k - 1];
}

// ---------- 2️⃣ QuickSelect ----------
function partition<T>(arr: T[], left: number, right: number, pivotIndex: number): number {
  const pivotValue = arr[pivotIndex];
  swap(arr, pivotIndex, right);
  let storeIndex = left;
  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, storeIndex, i);
      storeIndex++;
    }
  }
  swap(arr, storeIndex, right);
  return storeIndex;
}
function quickSelect<T>(arr: T[], kZeroBased: number): T {
  let left = 0;
  let right = arr.length - 1;
  while (true) {
    if (left === right) return arr[left];
    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    const pivotNewIndex = partition(arr, left, right, pivotIndex);
    if (kZeroBased === pivotNewIndex) {
      return arr[pivotNewIndex];
    } else if (kZeroBased < pivotNewIndex) {
      right = pivotNewIndex - 1;
    } else {
      left = pivotNewIndex + 1;
    }
  }
}
export function kthSmallestQuickSelect<T>(arr: readonly T[], k: number): T {
  assertKInRange(arr, k);
  const copy = [...arr];
  return quickSelect(copy, k - 1);
}

// ---------- Demo ----------
function demo() {
  const numbers = [7, 2, 5, 3, 9, 1, 4];
  const k = 4;
  console.log('Array:', numbers);
  console.log(`k = ${k}`);

  console.log('kth smallest (sorting):', kthSmallestBySorting(numbers, k));
  console.log('kth smallest (quick‑select):', kthSmallestQuickSelect(numbers, k));
}

// Uncomment to see it in action
// demo();
