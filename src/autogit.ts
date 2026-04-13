/**
 * Binary search over a sorted array.
 *
 * @param arr      Sorted array to search.
 * @param target   Value to find.
 * @param cmp      Optional custom comparison function.
 *                  Returns a negative number if a < b,
 *                  zero if a == b, and positive if a > b.
 * @returns Index of `target` in `arr`, or -1 if not found.
 */
function binarySearch<T>(
  arr: T[],
  target: T,
  cmp?: (a: T, b: T) => number
): number {
  let low = 0;
  let high = arr.length - 1;

  // Default comparison for numbers or strings
  const compare = cmp ?? ((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const comparison = compare(arr[mid], target);

    if (comparison === 0) return mid;          // found
    if (comparison < 0) low = mid + 1;         // target is bigger
    else high = mid - 1;                       // target is smaller
  }

  return -1; // not found
}
const numbers = [1, 3, 5, 7, 9, 11];

console.log(binarySearch(numbers, 7));  // → 3
console.log(binarySearch(numbers, 4));  // → -1
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  {name: 'Alice', age: 28},
  {name: 'Bob',   age: 34},
  {name: 'Carol', age: 42}
];

function ageComparer(a: Person, b: Person): number {
  return a.age - b.age;
}

const idx = binarySearch(people, {name: '', age: 34}, (p, q) => ageComparer(p, q));
console.log(idx); // -> 1
