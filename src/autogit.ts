/**
 * Generic type that can be compared with the <=> operator.
 * For custom objects you can supply a comparator function.
 */
type Comparable = number | string | boolean;

/**
 * Swap two elements in an array
 */
function swap<T>(arr: T[], i: number, j: number): void {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

/**
 * Heapify the subtree rooted at `i`, assuming that the binary trees
 * rooted at its children are already heaps.
 *
 * @param arr    the array
 * @param heapSize the current size of the heap
 * @param i      the index of the root of the subtree
 * @param compare comparison function (a, b) => true if a > b
 */
function heapify<T>(
  arr: T[],
  heapSize: number,
  i: number,
  compare: (a: T, b: T) => boolean
): void {
  let largest = i;
  const left   = 2 * i + 1;
  const right  = 2 * i + 2;

  if (left < heapSize && compare(arr[left], arr[largest])) {
    largest = left;
  }
  if (right < heapSize && compare(arr[right], arr[largest])) {
    largest = right;
  }

  if (largest !== i) {
    swap(arr, i, largest);
    heapify(arr, heapSize, largest, compare);
  }
}

/**
 * Build a max‑heap from an unsorted array
 */
function buildMaxHeap<T>(
  arr: T[],
  compare: (a: T, b: T) => boolean
): void {
  const heapSize = arr.length;
  // Start from the last non‑leaf node
  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    heapify(arr, heapSize, i, compare);
  }
}

/**
 * Heap sort – sorts `arr` *in place*.
 *
 * @param arr      the array to sort
 * @param compare  optional comparator; defaults to (a > b)
 */
export function heapSort<T>(
  arr: T[],
  compare?: (a: T, b: T) => boolean
): void {
  const cmp = compare ?? ((a: any, b: any) => a > b);

  buildMaxHeap(arr, cmp);

  for (let i = arr.length - 1; i > 0; i--) {
    // The max element is at index 0; move it to its final place
    swap(arr, 0, i);
    // Re‑heapify the reduced heap
    heapify(arr, i, 0, cmp);
  }
}

/* --------------------------------------------------------------------- */
/* Example usage & tiny tests                                           */
/* --------------------------------------------------------------------- */

// 1️⃣ Numbers ---------------------------------------------------------
const nums = [5, 3, 8, 4, 1, 7, 2, 6];
heapSort(nums);
console.log('Sorted numbers:', nums); // [1, 2, 3, 4, 5, 6, 7, 8]

// 2️⃣ Strings ---------------------------------------------------------
const words = ['pear', 'apple', 'orange', 'banana'];
heapSort(words); // default lexicographic order
console.log('Sorted words:', words); // ['apple', 'banana', 'orange', 'pear']

// 3️⃣ Custom objects --------------------------------------------------
interface Person { name: string; age: number }
const people: Person[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob',   age: 22 },
  { name: 'Eva',   age: 27 }
];
// Sort by age ascending
heapSort(people, (a, b) => a.age > b.age);
console.log('People sorted by age:', people);
/* [
  { name: 'Bob', age: 22 },
  { name: 'Eva', age: 27 },
  { name: 'Alice', age: 30 }
] */
