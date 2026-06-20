/**
 * Bubble‑sort in place.
 * Works on arrays of any type that can be compared with the `<` operator.
 */
export function bubbleSort<T>(arr: T[]): void {
  let swapped: boolean;

  // keep looping until a pass produces no swaps
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      // compare adjacent elements
      if (arr[i] > arr[i + 1]) {
        // swap them
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;      // a swap happened, so we might need another pass
      }
    }
  } while (swapped);
}
const numbers = [5, 3, 8, 4, 1];
bubbleSort(numbers);
console.log(numbers); // → [1, 3, 4, 5, 8]

const strings = ["pear", "apple", "banana"];
bubbleSort(strings);
console.log(strings); // → ["apple", "banana", "pear"]
