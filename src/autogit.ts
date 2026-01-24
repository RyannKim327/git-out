/**
 * Returns the k‑th smallest element (1‑based index).
 * O(n log n) by quick‑sort.
 */
export function kthSmallestSort(arr: number[], k: number): number {
  if (!arr.length) throw new Error('Array is empty');
  if (k < 1 || k > arr.length) throw new Error('k out of bounds');

  // Create a copy so the original array stays untouched
  const copy = [...arr].sort((a, b) => a - b);
  return copy[k - 1];
}

/**
 * Returns the k‑th smallest element in expected linear time via QuickSelect.
 * Stable but not guaranteed worst‑case performance.
 */
export function kthSmallestQuickSelect(arr: number[], k: number): number {
  if (!arr.length) throw new Error('Array is empty');
  if (k < 1 || k > arr.length) throw new Error('k out of bounds');

  // Recursive helper
  function quickSelect(nums: number[], left: number, right: number, kth: number): number {
    if (left === right) return nums[left];

    let pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    pivotIndex = partition(nums, left, right, pivotIndex);

    const leftSize = pivotIndex - left + 1;
    if (kth < leftSize) return quickSelect(nums, left, pivotIndex - 1, kth);
    if (kth === leftSize) return nums[pivotIndex];
    return quickSelect(nums, pivotIndex + 1, right, kth - leftSize);
  }

  function partition(nums: number[], left: number, right: number, pivotIndex: number): number {
    const pivotValue = nums[pivotIndex];
    // Move pivot to end
    [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];
    let storeIndex = left;

    for (let i = left; i < right; i++) {
      if (nums[i] < pivotValue) {
        [nums[storeIndex], nums[i]] = [nums[i], nums[storeIndex]];
        storeIndex++;
      }
    }
    // Move pivot to its final place
    [nums[right], nums[storeIndex]] = [nums[storeIndex], nums[right]];
    return storeIndex;
  }

  // Clone the array so we don't mutate the caller's array
  const clone = [...arr];
  return quickSelect(clone, 0, clone.length - 1, k);
}
const data = [7, 2, 5, 3, 9, 1];
const kth = 3; // 3rd smallest

console.log(kthSmallestSort(data, kth));          // 5
console.log(kthSmallestQuickSelect(data, kth));   // 5
export function kthSmallest<T>(
  arr: T[],
  k: number,
  cmp: (a: T, b: T) => number,
): T {
  // ...same logic, replace numeric comparisons with cmp(...)
}
