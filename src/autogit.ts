/**
 * Selection sort – sorts an array in‑place in ascending order.
 *
 * @param array   The array to sort.  It will be mutated.
 * @param compare Callback used to decide order. If omitted, a natural
 *                ascending numeric/string comparison is used.
 * @returns The same array instance, now sorted.
 */
export function selectionSort<T>(
  array: T[],
  compare?: (a: T, b: T) => number
): T[] {
  const len = array.length;

  // default comparer: numeric or string ascending
  const cmp = compare ?? ((a: any, b: any) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  for (let i = 0; i < len - 1; i++) {
    // assume min at current position
    let minIdx = i;

    // find the smallest element in the unsorted portion
    for (let j = i + 1; j < len; j++) {
      if (cmp(array[j], array[minIdx]) < 0) {
        minIdx = j;
      }
    }

    // swap if we found a smaller element
    if (minIdx !== i) {
      const temp = array[i];
      array[i] = array[minIdx];
      array[minIdx] = temp;
    }
  }

  return array;
}
// simple numeric sorting
let nums = [64, 25, 12, 22, 11];
selectionSort(nums);
console.log(nums); // [11, 12, 22, 25, 64]

// sorting strings
let words = ["banana", "avocado", "cherry"];
selectionSort(words);
console.log(words); // ["avocado", "banana", "cherry"]

// custom comparator – descending numbers
selectionSort(nums, (a, b) => b - a);
console.log(nums); // [64, 25, 22, 12, 11]
