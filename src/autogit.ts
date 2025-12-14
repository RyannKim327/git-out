function kthSmallest(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) throw new RangeError('k out of range');
  return [...arr].sort((a, b) => a - b)[k - 1];
}

/* example */
console.log(kthSmallest([7, 2, 1, 8, 3], 3)); // 3
function kthSmallest(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) throw new RangeError('k out of range');

  const a = [...arr];                // work on a copy so caller’s array isn’t mutated
  return quickSelect(a, 0, a.length - 1, k - 1); // kth smallest is index k-1
}

function quickSelect(a: number[], left: number, right: number, idx: number): number {
  if (left === right) return a[left];

  const pivotIndex = partition(a, left, right);
  if (idx === pivotIndex) return a[idx];
  if (idx < pivotIndex)
    return quickSelect(a, left, pivotIndex - 1, idx);
  return quickSelect(a, pivotIndex + 1, right, idx);
}

function partition(a: number[], left: number, right: number): number {
  const pivot = a[right];
  let i = left;
  for (let j = left; j < right; ++j) {
    if (a[j] < pivot) [a[i], a[j]] = [a[j], a[i]], ++i;
  }
  [a[i], a[right]] = [a[right], a[i]];
  return i;
}

/* example */
console.log(kthSmallest([7, 2, 1, 8, 3], 3)); // 3
