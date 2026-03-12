/**
 * Merge‑Sort for an array.
 *
 * @param arr   The array to sort.
 * @param cmp   Optional comparison function. If omitted, the default <, > operators are used.
 * @returns The sorted array (in‑place, but a new array is returned for convenience).
 */
export function mergeSort<T>(
  arr: T[],
  cmp?: (a: T, b: T) => number
): T[] {
  // No need to sort if the array is empty or has a single element.
  if (arr.length <= 1) return arr.slice();

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), cmp);
  const right = mergeSort(arr.slice(mid), cmp);

  return merge(left, right, cmp);
}

/**
 * Merges two sorted arrays into a new sorted array.
 *
 * @param left  The left sorted half.
 * @param right The right sorted half.
 * @param cmp   Comparison function (optional).
 * @returns A new sorted array containing all elements from left and right.
 */
function merge<T>(
  left: T[],
  right: T[],
  cmp?: (a: T, b: T) => number
): T[] {
  const result: T[] = [];
  let i = 0,
    j = 0;

  const compare = cmp
    ? cmp
    : (a: T, b: T) => {
        // default numeric or string comparison
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };

  while (i < left.length && j < right.length) {
    if (compare(left[i], right[j]) <= 0) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Attach leftovers … at most one of these will push anything.
  return result.concat(left.slice(i)).concat(right.slice(j));
}
// Numbers
const nums = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort(nums)); // [3, 9, 10, 27, 38, 43, 82]

// Strings
const words = ["pear", "apple", "banana", "cherry"];
console.log(mergeSort(words)); // ['apple', 'banana', 'cherry', 'pear']

// Custom type
type Person = { name: string; age: number };
const people: Person[] = [
  { name: "Alice", age: 34 },
  { name: "Bob", age: 23 },
  { name: "Carol", age: 28 }
];
console.log(
  mergeSort(people, (a, b) => a.age - b.age)
);
// People sorted by age: Bob, Carol, Alice
function isSorted<T>(arr: T[], cmp?: (a: T, b: T) => number): boolean {
  const compare = cmp
    ? cmp
    : (a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0);
  for (let i = 1; i < arr.length; i++) {
    if (compare(arr[i - 1], arr[i]) > 0) return false;
  }
  return true;
}

console.log(isSorted(mergeSort([5, 2, 9, 1, 5, 6]))); // true
