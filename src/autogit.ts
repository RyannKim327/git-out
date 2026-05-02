/**
 * Merge two sorted sub‑arrays into one sorted array.
 * `left` and `right` must already be sorted.
 * Returns a new sorted array.
 */
function merge<T>(
  left: T[],
  right: T[],
  compare: (a: T, b: T) => number
): T[] {
  const result: T[] = [];
  let i = 0; // index for left
  let j = 0; // index for right

  while (i < left.length && j < right.length) {
    // If left[i] <= right[j] according to the compare function,
    // push left[i] into the result and advance i
    if (compare(left[i], right[j]) <= 0) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Append any remaining elements.
  // Only one of the following while loops will actually run.
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

/**
 * Recursively divides the array and merges the sorted halves.
 * `compare` should return:
 *   < 0 if a < b
 *   0  if a === b
 *   > 0 if a > b
 */
export function mergeSort<T>(
  array: T[],
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  if (array.length <= 1) return array; // Base case: already sorted

  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid), compare);
  const right = mergeSort(array.slice(mid), compare);

  return merge(left, right, compare);
}
// Sort numbers
const nums = [8, 3, 5, 1, 9, 0];
const sortedNums = mergeSort(nums);
// -> [0, 1, 3, 5, 8, 9]

// Sort strings alphabetically
const words = ["pear", "apple", "banana"];
const sortedWords = mergeSort(words);
// -> ["apple", "banana", "pear"]

// Sort objects by a property
type Person = { name: string; age: number };
const people: Person[] = [
  { name: "Charlie", age: 25 },
  { name: "Alice", age: 30 },
  { name: "Bob", age: 20 },
];

const sortedByAge = mergeSort(people, (a, b) => a.age - b.age);
// -> [{name:"Bob", age:20}, {name:"Charlie", age:25}, {name:"Alice", age:30}]
