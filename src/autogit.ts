/**
 * Quicksort implementation for an array of items of type T.
 * 
 * @param items The array to sort.  It will be sorted in‑place.
 * @param compare Optional. A function that returns a negative number if a < b,
 *                zero if a === b, and a positive number if a > b.
 *                If omitted, native `<` / `>` are used for primitives.
 */
export function quickSort<T>(
  items: T[],
  compare?: (a: T, b: T) => number
): void {
  // Default comparison – works for numbers, strings, booleans
  const cmp = compare
    ? compare
    : (a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0);

  // Helper for the recursive sort; index bounds are inclusive
  function sort(left: number, right: number): void {
    if (left >= right) return;

    // Choose pivot – median‑of‑three to avoid worst‑case on sorted input
    const mid = Math.floor((left + right) / 2);
    const pivotIndex = medianOfThree(left, mid, right);
    const pivotValue = items[pivotIndex];

    // Move pivot to the left end to simplify the partition loop
    [items[left], items[pivotIndex]] = [items[pivotIndex], items[left]];

    let i = left + 1;
    let j = right;

    while (i <= j) {
      while (i <= right && cmp(items[i], pivotValue) < 0) i++;
      while (j >= left + 1 && cmp(items[j], pivotValue) > 0) j--;

      if (i < j) [items[i], items[j]] = [items[j], items[i]];
      i++;
      j--;
    }

    // Return pivot to its final spot
    [items[left], items[j]] = [items[j], items[left]];

    // Recurse on each side
    sort(left, j - 1);
    sort(j + 1, right);
  }

  // Median‑of‑three helper – returns index of median of three indices
  function medianOfThree(a: number, b: number, c: number): number {
    const va = items[a], vb = items[b], vc = items[c];
    if ((cmp(va, vb) < 0) ^ (cmp(va, vc) < 0)) return a;
    if ((cmp(vb, va) < 0) ^ (cmp(vb, vc) < 0)) return b;
    return c;
  }

  sort(0, items.length - 1);
}
// Numbers
const nums = [3, 8, 2, 5, 1, 9];
quickSort(nums);               // in‑place sort → [1, 2, 3, 5, 8, 9]

// Strings
const words = ['banana', 'apple', 'cherry'];
quickSort(words);              // → ['apple', 'banana', 'cherry']

// Custom objects
type Person = { name: string; age: number };
const people: Person[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 },
  { name: 'Carol', age: 25 }
];
quickSort(people, (a, b) => a.age - b.age);
// → sorted by age: 20, 25, 30
