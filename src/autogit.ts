/**
 * Merge‑sort for array of T values.
 *
 * @param arr  Input array – left untouched.
 * @param cmp  Optional comparison function. If omitted, values are compared with < >.
 * @returns A new sorted array.
 */
export function mergeSort<T>(arr: readonly T[], cmp?: (a: T, b: T) => number): T[] {
  // Base case: arrays of size 0 or 1 are already sorted.
  if (arr.length <= 1) return [...arr];

  // Helper to merge two already‑sorted halves.
  const merge = (left: T[], right: T[]): T[] => {
    const result: T[] = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      const l = left[i];
      const r = right[j];
      const comp = cmp
        ? cmp(l, r)
        : (l as any) < (r as any)
          ? -1
          : (l as any) > (r as any)
          ? 1
          : 0;

      if (comp <= 0) {
        result.push(l);
        i++;
      } else {
        result.push(r);
        j++;
      }
    }

    // Push any remaining items from left or right.
    return result.concat(left.slice(i), right.slice(j));
  };

  // Split the array into two halves.
  const middle = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, middle), cmp);
  const right = mergeSort(arr.slice(middle), cmp);

  // Merge back together.
  return merge(left, right);
}
const numbers = [42, 1, 23, 4, 16];
const sorted = mergeSort(numbers);   // [1, 4, 16, 23, 42]
console.log(sorted);
console.log(numbers);  // still [42, 1, 23, 4, 16]
const words = ["banana", "Apple", "cherry"];
const sortedWords = mergeSort(words, (a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
console.log(sortedWords); // ["Apple", "banana", "cherry"]
