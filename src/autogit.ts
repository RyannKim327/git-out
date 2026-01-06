/**
 * Simple Shell‑Sort implementation
 *
 * @param arr      - array to sort (will be sorted *in‑place*)
 * @param compare  - optional comparator, defaults to numeric/alphabetical
 * @returns The sorted array (same reference that was passed in)
 */
function shellSort<T>(arr: T[], compare?: (a: T, b: T) => number): T[] {
  // Default comparator – works for numbers & strings
  const cmp = compare ?? ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));

  let n = arr.length;

  // Open‑Hibbard gap sequence: 1, 3, 7, 15, … (or any diminishing series)
  // Here we just halve the gap until 1 to keep it straightforward.
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Insertion‑style pass for the current gap
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      // Shift earlier gap‑sorted elements up until the correct spot for temp is found
      while (j >= gap && cmp(temp, arr[j - gap]) < 0) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }

  return arr;
}

/* ---- Example usage ---- */
const nums = [9, 3, 1, 5, 13, 12, 4, 8];
console.log('Before:', nums);
shellSort(nums);                 // sorts in place
console.log('After :', nums);

const words = ['banana', 'apple', 'cherry', 'date'];
shellSort(words, (a, b) => a.localeCompare(b));
console.log('Words sorted:', words);
