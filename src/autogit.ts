/**
 * Counting sort for an array of integers.
 *
 * @param arr The array to sort – an array of numbers.
 * @returns A new array containing the sorted values.
 */
export function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return [];

  // Locate the bounds of the values.
  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const val = arr[i];
    if (val < min) min = val;
    if (val > max) max = val;
  }

  const range = max - min + 1;          // Number of distinct possible values
  const count = new Array<number>(range).fill(0);

  // Count occurrences of each integer.
  for (const value of arr) {
    count[value - min]++;               // Shift by min so index 0 stays valid
  }

  // Overwrite the input array (or build a new one) using the counts.
  const sorted: number[] = [];
  for (let i = 0; i < range; i++) {
    const currentVal = i + min;
    const occ = count[i];
    for (let j = 0; j < occ; j++) {
      sorted.push(currentVal);
    }
  }

  return sorted;
}
