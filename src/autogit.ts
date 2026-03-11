/**
 * Random‑pivot quick sort.
 *
 * @param arr   The array to sort (in‑place).
 * @returns     The sorted array (the same reference as `arr`).
 */
export function quickSortRandom<T>(arr: T[], compare?: (a: T, b: T) => number): T[] {
  if (arr.length <= 1)
    return arr;

  // So we can provide a custom comparison, but default is the usual "<".
  const cmp = compare ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  // Pick a random index as pivot
  const pivotIndex = Math.floor(Math.random() * arr.length);
  const pivotValue = arr[pivotIndex];

  // Partition into two new arrays
  const lows: T[] = [];
  const highs: T[] = [];
  const pivots: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    const comparison = cmp(value, pivotValue);
    if (comparison < 0)    lows.push(value);
    else if (comparison > 0) highs.push(value);
    else                    pivots.push(value);   // equals pivot
  }

  // Recurse and concatenate
  return quickSortRandom(lows, cmp)
          .concat(pivots, quickSortRandom(highs, cmp));
}

// ---- Demo ---------------------------------------------------------

const unsorted = [7, 2, 9, 4, 1, 5, 3, 8, 6];
console.log('original: ', unsorted);
const sorted = quickSortRandom(unsorted);
console.log('sorted:   ', sorted);
