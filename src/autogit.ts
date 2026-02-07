/**
 * Random sort – a quick‑sort implementation that picks a random
 * pivot for each split.
 *
 * The algorithm is deterministic in complexity (O(n log n) on average),
 * but the pivot choice is completely random, which can be useful for
 * teaching purposes or for avoiding worst‑case sequences.
 */

function randomQuickSort<T>(input: T[], compare?: (a: T, b: T) => number): T[] {
  // If there are 0 or 1 elements, it's already sorted.
  if (input.length <= 1) {
    return [...input];
  }

  // Choose a random pivot index.
  const pivotIndex = Math.floor(Math.random() * input.length);
  const pivot = input[pivotIndex];

  // Helper to decide the order.
  const cmp = compare ||
    // Default to numeric or string comparison.
    ((a: T, b: T) => (a as any) < b ? -1 : (a as any) > b ? 1 : 0);

  // Partition the array into two bins: <= pivot and > pivot.
  const smaller: T[] = [];
  const larger: T[] = [];

  for (let i = 0; i < input.length; i++) {
    if (i === pivotIndex) continue; // skip the pivot itself
    const item = input[i];
    if (cmp(item, pivot) <= 0) {
      smaller.push(item);
    } else {
      larger.push(item);
    }
  }

  // Recursively sort each sub‑array and concatenate the results.
  return [
    ...randomQuickSort(smaller, compare),
    pivot,
    ...randomQuickSort(larger, compare),
  ];
}

/* --- Example usage ----------------------------------------------------- */
const nums = [23, 4, 42, 8, 15, 16, 42, 23, 4, 17];
console.log('Unsorted:', nums);
console.log('Sorted:', randomQuickSort(nums));
