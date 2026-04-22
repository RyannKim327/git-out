/**
 * Quick‑sort an array in ascending order.
 * Modifies the original array – if you need a copy, clone it first.
 *
 * @param arr  The array to sort (array of numbers, strings, or any comparable items).
 * @returns    The same array reference, now sorted.
 */
function quickSort<T>(arr: T[]): T[] {
  // Base case: 0 or 1 element is already sorted
  if (arr.length < 2) {
    return arr;
  }

  // Pick a pivot – here we just use the middle element.
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex];

  // Partition into three buckets
  const left: T[] = [];
  const right: T[] = [];

  // Skip the pivot itself to avoid infinite recursion
  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue;
    // @ts-ignore – operator < works on strings/numbers. For custom types, provide a comparator.
    if (arr[i] <= pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  // Recursively sort the buckets and concatenate
  return [...quickSort(left), pivot, ...quickSort(right)];
}
const numbers = [12, 4, 5, 3, 8, 7];
console.log(quickSort(numbers)); // [3, 4, 5, 7, 8, 12]
type Comparator<T> = (a: T, b: T) => number;

function quickSortWithComparator<T>(
  arr: T[],
  compare: Comparator<T>
): T[] {
  if (arr.length < 2) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left: T[] = [];
  const right: T[] = [];

  for (const item of arr) {
    if (compare(item, pivot) <= 0) left.push(item);
    else right.push(item);
  }

  return [...quickSortWithComparator(left, compare), pivot, ...quickSortWithComparator(right, compare)];
}
interface Person { name: string; age: number; }

const people: Person[] = [
  { name: 'Bob', age: 24 },
  { name: 'Alice', age: 30 },
  { name: 'Carol', age: 19 }
];

const byAge = (a: Person, b: Person) => a.age - b.age;
console.log(quickSortWithComparator(people, byAge));
