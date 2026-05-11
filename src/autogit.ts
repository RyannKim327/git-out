/**
 * In‑place Selection Sort.
 *
 * @param arr   The array to sort.
 * @param cmp   Optional comparison function.
 *              Should return a negative number if a < b,
 *              zero if a === b, and positive if a > b.
 */
function selectionSort<T>(
  arr: T[],
  cmp: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): void {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    // Assume the minimum is at i.
    let minIndex = i;

    // Search for the true minimum in the unsorted part.
    for (let j = i + 1; j < n; j++) {
      if (cmp(arr[j], arr[minIndex]) < 0) {
        minIndex = j;
      }
    }

    // If minIndex changed, swap the two values.
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
}
const nums = [64, 25, 12, 22, 11];
selectionSort(nums);
console.log(nums); // [11, 12, 22, 25, 64]
interface Person { name: string; age: number }

const people: Person[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];

selectionSort(people, (p1, p2) => p1.age - p2.age);
console.log(people);
