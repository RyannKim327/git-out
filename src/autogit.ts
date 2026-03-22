/**
 * Returns the k‑th smallest element (1‑based index) in `arr`.
 *
 * @param arr - The array of numbers (can contain duplicates).
 * @param k   - 1 = smallest, 2 = second smallest, …, arr.length = largest.
 * @returns   The value of the k‑th smallest element.
 *
 * @throws    If k is out of bounds.
 */
function kthSmallest(arr: number[], k: number): number;
function partition(
  arr: number[],
  left: number,
  right: number,
  pivotIndex: number
): number {
  const pivotValue = arr[pivotIndex];
  // Move pivot to end
  [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
  let storeIndex = left;

  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      [arr[i], arr[storeIndex]] = [arr[storeIndex], arr[i]];
      storeIndex++;
    }
  }
  // Move pivot to its final place
  [arr[storeIndex], arr[right]] = [arr[right], arr[storeIndex]];
  return storeIndex;
}
function quickSelect(
  arr: number[],
  left: number,
  right: number,
  k: number // 0‑based rank we’re looking for
): number {
  if (left === right) {
    return arr[left];
  }

  // Pick a pivot (here: random for average‑case safety)
  const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
  const pivotPos   = partition(arr, left, right, pivotIndex);

  if (k === pivotPos) {
    return arr[pivotPos];
  } else if (k < pivotPos) {
    return quickSelect(arr, left, pivotPos - 1, k);
  } else {
    return quickSelect(arr, pivotPos + 1, right, k);
  }
}
function kthSmallest(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) {
    throw new Error("k is out of bounds");
  }

  // idx = k‑1 because we want 1‑based → 0‑based conversion
  const idx = k - 1;
  // We’ll mutate the original array – if you want to avoid that, clone it:
  // const copy = arr.slice();
  // const result = quickSelect(copy, 0, copy.length - 1, idx);

  return quickSelect(arr, 0, arr.length - 1, idx);
}
const sample = [12, 3, 5, 7, 4, 19, 26];
console.log(kthSmallest(sample, 1)); // 3  (smallest)
console.log(kthSmallest(sample, 3)); // 5  (third smallest)
console.log(kthSmallest(sample, 7)); // 26 (largest)
function kthSmallestIter(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) throw new Error("k out of bounds");
  let left = 0;
  let right = arr.length - 1;
  const target = k - 1;

  while (true) {
    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    const pivotPos = partition(arr, left, right, pivotIndex);

    if (pivotPos === target) {
      return arr[pivotPos];
    }
    if (pivotPos > target) {
      right = pivotPos - 1;
    } else {
      left = pivotPos + 1;
    }
  }
}
