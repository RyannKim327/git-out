/**
 * Merge two sorted halves into a single sorted array.
 */
function merge<T>(left: T[], right: T[], compare: (a: T, b: T) => number): T[] {
  const result: T[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    // compare function should return negative if a < b,
    // zero if equal, positive if a > b
    if (compare(left[i], right[j]) <= 0) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Append any leftovers
  return result.concat(left.slice(i)).concat(right.slice(j));
}

/**
 * Recursively sort the array using merge sort.
 * `compare` is optional – if omitted, the native < operator is used.
 */
export function mergeSort<T>(
  arr: T[],
  compare?: (a: T, b: T) => number
): T[] {
  if (arr.length <= 1) return arr.slice();

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), compare);
  const right = mergeSort(arr.slice(mid), compare);

  return merge(left, right, compare ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0)));
}
const nums = [34, 7, 23, 32, 5, 62];
const sortedNums = mergeSort(nums);
console.log(sortedNums); // [5, 7, 23, 32, 34, 62]
const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Carol', age: 35 },
];

const sortedByAge = mergeSort(people, (a, b) => a.age - b.age);
