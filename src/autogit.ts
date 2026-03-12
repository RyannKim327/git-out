/**
 * Sorts an array using the bubble‑sort algorithm.
 *
 * @param arr       The array to sort. The sort is performed in-place.
 * @param compare   Optional comparison function. It should return:
 *                  - a negative number if a < b
 *                  - zero if a == b
 *                  - a positive number if a > b
 *
 * @returns The sorted array (the same instance that was passed in).
 */
export function bubbleSort<T>(arr: T[], compare?: (a: T, b: T) => number): T[] {
  // Default to natural order for numbers and strings
  const cmp = compare ?? ((a: any, b: any) => (a > b ? 1 : a < b ? -1 : 0));

  const len = arr.length;
  if (len < 2) return arr; // already sorted

  let swapped: boolean;
  // We keep looping until no swaps happen in a full pass
  do {
    swapped = false;
    // After each round the largest element in the unsorted portion
    // "bubbles" to its final position, so we can skip the last i elements
    for (let i = 1; i < len; i++) {
      if (cmp(arr[i - 1], arr[i]) > 0) {
        // swap
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        swapped = true;
      }
    }
  } while (swapped);

  return arr;
}
// 1️⃣ Sort plain numbers
const nums = [5, 3, 8, 1, 2];
bubbleSort(nums);           // nums → [1, 2, 3, 5, 8]

// 2️⃣ Sort strings alphabetically
const words = ['banana', 'apple', 'cherry'];
bubbleSort(words);          // words → ['apple', 'banana', 'cherry']

// 3️⃣ Sort objects with a custom key
type Person = { name: string; age: number };
const people: Person[] = [
  { name: 'Zoe',   age: 28 },
  { name: 'Adam',  age: 34 },
  { name: 'Mira',  age: 23 }
];

bubbleSort(people, (p1, p2) => p1.age - p2.age);
// people → [{name:'Mira',age:23}, {name:'Zoe',age:28}, {name:'Adam',age:34}]
