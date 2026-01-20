/**
 * Randomised quick‑sort for numbers (works for any type T that can be compared)
 * with an optional compare function.
 */
function randomQuickSort<T>(
  arr: T[],
  compare?: (a: T, b: T) => number
): T[] {
  const cmp = compare ?? ((a: T, b: T) => (a as any) < (b as any) ? -1 : (a as any) > (b as any) ? 1 : 0);

  function sort(start: number, end: number): void {
    if (end - start <= 1) return;              // 0 or 1 element

    // Pick a random pivot index in [start, end-1]
    const pivotIndex = start + Math.floor(Math.random() * (end - start));
    const pivotValue = arr[pivotIndex];

    // Move pivot to the end for convenience
    [arr[pivotIndex], arr[end - 1]] = [arr[end - 1], arr[pivotIndex]];

    // Partition: all < pivot on the left, others on the right
    let storeIndex = start;
    for (let i = start; i < end - 1; i++) {
      if (cmp(arr[i], pivotValue) < 0) {
        [arr[i], arr[storeIndex]] = [arr[storeIndex], arr[i]];
        storeIndex++;
      }
    }

    // Place pivot in its final position
    [arr[storeIndex], arr[end - 1]] = [arr[end - 1], arr[storeIndex]];

    // Recurse on partitions
    sort(start, storeIndex);
    sort(storeIndex + 1, end);
  }

  // Make a copy to keep input immutable
  const copy = arr.slice();
  sort(0, copy.length);
  return copy;
}

/* ----- Usage example ----- */
const unsorted = [7, 2, 9, 4, 3, 1, 5, 6];
const sorted = randomQuickSort(unsorted);
console.log('original:', unsorted);
console.log('sorted  :', sorted);
