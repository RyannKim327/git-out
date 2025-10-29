// ----------------------------------------------
// 1.  Generic Heap Sort
// ----------------------------------------------
/**
 * In-place heap sort.
 * @param arr        Array to sort (modified in place)
 * @param compareFn  (a, b) => negative if a < b, 0 if equal, positive if a > b
 */
function heapSort<T>(arr: T[], compareFn: (a: T, b: T) => number): void {
  const n = arr.length;

  // 1. Build max-heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(arr, i, n, compareFn);
  }

  // 2. Repeatedly extract max and place at end
  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    siftDown(arr, 0, end, compareFn);
  }
}

/**
 * Restore max-heap property in arr[0..length).
 * `compareFn` determines the “largest” child.
 */
function siftDown<T>(
  arr: T[],
  root: number,
  length: number,
  compareFn: (a: T, b: T) => number
): void {
  while (true) {
    let largest = root;
    const left  = 2 * root + 1;
    const right = 2 * root + 2;

    if (left  < length && compareFn(arr[left],  arr[largest]) > 0) largest = left;
    if (right < length && compareFn(arr[right], arr[largest]) > 0) largest = right;

    if (largest === root) break;

    [arr[root], arr[largest]] = [arr[largest], arr[root]];
    root = largest;
  }
}

// ----------------------------------------------
// 2.  Convenience wrapper for numbers
// ----------------------------------------------
function heapSortNumbers(arr: number[]): void {
  heapSort(arr, (a, b) => a - b);
}

// ----------------------------------------------
// 3.  Quick sanity check
// ----------------------------------------------
if (require.main === module) {
  const data = [5, 2, 9, 1, 5, 6, 3];
  heapSortNumbers(data);
  console.log('Sorted:', data); // -> [1, 2, 3, 5, 5, 6, 9]
}

export { heapSort, heapSortNumbers };
import { heapSort, heapSortNumbers } from './heapSort';

// 1. Sort numbers
const nums = [8, 3, 5, 4, 1];
heapSortNumbers(nums);
console.log(nums); // [1, 3, 4, 5, 8]

// 2. Sort objects by property
interface Person { name: string; age: number }
const people: Person[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Carol', age: 35 }
];
heapSort(people, (a, b) => a.age - b.age);
console.log(people); // Bob(25), Alice(30), Carol(35)
