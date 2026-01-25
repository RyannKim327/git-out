// A tiny helper interface when you want a custom comparator
export interface Comparable<T> {
  compareTo(other: T): number;   // negative if this < other
}
/**
 * Heap‑sort: in‑place, O(n log n) time, O(1) auxiliary space.
 * @param arr  The array to sort.
 * @param compare  Optional comparator: (a, b) => number
 *                 (negative if a < b, zero if equal, positive if a > b).
 *                 If omitted, the array is assumed to contain values
 *                 that support the `<` operator.
 */
export function heapSort<T>(
  arr: T[],
  compare?: (a: T, b: T) => number
): void {
  const cmp = compare ?? defaultCompare;

  // 1. Build a max‑heap
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    siftDown(arr, i, arr.length, cmp);
  }

  // 2. Repeatedly swap the max element to the end and restore heap
  for (let end = arr.length - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    siftDown(arr, 0, end, cmp);  // `end` is the new heap size
  }

  /** Comparator that works on primitive numbers or strings … */
  function defaultCompare(a: any, b: any): number {
    return a < b ? -1 : a > b ? 1 : 0;   // 0 when equal
  }
}
function siftDown<T>(
  arr: T[],
  start: number,
  heapSize: number,
  compare: (a: T, b: T) => number
): void {
  let root = start;

  while (true) {
    const left = 2 * root + 1;
    const right = left + 1;
    let swap: number | null = null;

    // Is there a left child larger than root?
    if (left < heapSize && compare(arr[left], arr[root]) > 0) {
      swap = left;
    }

    // Is there a right child that beats the current swap?
    if (
      right < heapSize &&
      (swap === null || compare(arr[right], arr[swap]) > 0)
    ) {
      swap = right;
    }

    // Nothing to swap → we’re done
    if (swap === null) break;

    [arr[root], arr[swap]] = [arr[swap], arr[root]];
    root = swap;
  }
}
// Numbers
const nums = [12, 11, 13, 5, 6, 7];
heapSort(nums);
console.log(nums);   // [5, 6, 7, 11, 12, 13]

// Strings (lexicographic)
let words = ["pear", "apple", "orange", "banana"];
heapSort(words);
console.log(words);  // ["apple", "banana", "orange", "pear"]

// Custom objects with a `compareTo` method
class Person {
  constructor(public name: string, public age: number) {}
  compareTo(other: Person) {
    return this.age - other.age;  // ascending by age
  }
}

const people = [
  new Person("Bob", 30),
  new Person("Alice", 25),
  new Person("Charlie", 35)
];

// Provide the comparator manually
heapSort(people, (a, b) => a.compareTo(b));
console.log(people.map(p => `${p.name}(${p.age})`));  // Alice(25) Bob(30) Charlie(35)
