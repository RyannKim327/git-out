/**
 * Shell sort – a simple, in‑place algorithm that improves on insertion sort.
 * Sorts an array of numbers in ascending order.
 *
 * @param arr The array to sort (modified in place)
 * @param compare Optional compare function (defaults to numeric comparison)
 */
export function shellSort(
  arr: number[],
  compare?: (a: number, b: number) => number
): void {
  const len = arr.length;
  const cmp = compare ?? ((a, b) => a - b);

  // A common gap sequence: halving each time (Shell's original)
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Gapped insertion sort
    for (let i = gap; i < len; i++) {
      let temp = arr[i];
      let j = i;

      // Move elements that are greater than temp backward by 'gap' places
      while (j >= gap && cmp(arr[j - gap], temp) > 0) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      // Bring temp into its spot
      arr[j] = temp;
    }
  }
}
const data = [40, 3, 10, 5, 1, 15];
shellSort(data);

console.log(data); // [1, 3, 5, 10, 15, 40]
export function shellSort<T>(
  arr: T[],
  compare?: (a: T, b: T) => number
): void {
  const len = arr.length;
  const cmp = compare ?? ((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && cmp(arr[j - gap], temp) > 0) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
}
shellSort(['banana', 'apple', 'pear'], (a, b) => a.localeCompare(b));
