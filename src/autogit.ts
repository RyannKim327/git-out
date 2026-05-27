function kthSmallest(arr: number[], k: number): number | undefined {
  if (k < 1 || k > arr.length) return undefined; // out‑of‑range

  const sorted = [...arr].sort((a, b) => a - b); // stable numeric sort
  return sorted[k - 1];                         // k is 1‑based here
}
/**
 * Return the k-th smallest element (1‑based) or `undefined` if out of range.
 */
function kthSmallestQuickSelect(arr: number[], k: number): number | undefined {
  if (k < 1 || k > arr.length) return undefined;

  // work on a copy so the caller’s array isn’t mutated
  const a = [...arr];

  // Helper that returns the zero‑based index of the desired element
  const select = (left: number, right: number, targetIndex: number): number => {
    while (true) {
      if (left === right) return a[left]; // only one element

      // Pick a pivot – here we use the middle element
      const pivotIndex = Math.floor((left + right) / 2);
      const pivotValue = a[pivotIndex];

      // Partition: elements < pivot go left, > pivot go right
      // In‑place partitioning that keeps the pivot’s value
      let i = left;
      let j = right;
      while (i <= j) {
        while (a[i] < pivotValue) i++;
        while (a[j] > pivotValue) j--;
        if (i <= j) {
          [a[i], a[j]] = [a[j], a[i]];
          i++;
          j--;
        }
      }

      // After partitioning: indices [left .. j] <= pivot, [i .. right] >= pivot
      if (targetIndex <= j) {
        right = j;            // target in the left partition
      } else if (targetIndex >= i) {
        left = i;             // target in the right partition
      } else {
        return a[targetIndex]; // the pivot itself is the answer
      }
    }
  };

  // Convert k (1‑based) to zero‑based index
  return select(0, a.length - 1, k - 1);
}
function kthSmallestGeneric<T>(
  arr: T[],
  k: number,
  compare: (a: T, b: T) => number
): T | undefined {
  if (k < 1 || k > arr.length) return undefined;

  const a = [...arr];
  const targetIndex = k - 1;
  let left = 0, right = a.length - 1;

  while (true) {
    if (left === right) return a[left];

    const pivotIndex = Math.floor((left + right) / 2);
    const pivotValue = a[pivotIndex];

    let i = left, j = right;
    while (i <= j) {
      while (compare(a[i], pivotValue) < 0) i++;
      while (compare(a[j], pivotValue) > 0) j--;
      if (i <= j) {
        [a[i], a[j]] = [a[j], a[i]];
        i++; j--;
      }
    }

    if (targetIndex <= j) right = j;
    else if (targetIndex >= i) left = i;
    else return a[targetIndex];
  }
}
