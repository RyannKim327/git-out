/**
 * Shell sort – an in‑place comparison sort.
 *
 * @param arr   The array to sort.
 * @param cmp   Optional comparator: (a, b) => number. Positive if a > b,
 *              negative if a < b, zero if equal. If omitted, the
 *              default uses the `<` operator.
 * @returns     The same array instance, now sorted.
 */
export function shellSort<T>(arr: T[], cmp?: (a: T, b: T) => number): T[] {
  const compare = cmp ?? ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));

  let n = arr.length;
  // Start with a gap of about n/2 and halve it each loop.
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Insertion‑sort on elements gap apart.
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      // Shift all larger gap‑spaced elements one step forward.
      while (j >= gap && compare(temp, arr[j - gap]) < 0) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}
// sort.ts
export { shellSort };
// └─ ... implementation shown above
import { shellSort } from './sort';

const numbers = [23, 12, 1, 10, 7, 3, 9];
console.log('unsorted:', numbers);

shellSort(numbers);                 // default numeric comparison
console.log('sorted:   ', numbers);

// Custom comparator (descending)
shellSort(numbers, (a, b) => b - a);
console.log('desc:    ', numbers);
