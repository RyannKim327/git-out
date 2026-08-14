/**
 * Merge two sorted arrays into one sorted array.
 * The comparator decides the ordering – by default it uses the `<` operator.
 */
function merge<T>(left: T[], right: T[], compare?: (a: T, b: T) => boolean): T[] {
  const result: T[] = [];
  let i = 0; // index into left
  let j = 0; // index into right

  // Grab the compare function, or fall back to simple < comparison
  const comp = compare ?? ((a: T, b: T) => a < b);

  while (i < left.length && j < right.length) {
    // If left[i] comes before right[j] (or equal), push it
    if (comp(left[i], right[j])) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // One of the halves may still have leftovers
  return result.concat(left.slice(i)).concat(right.slice(j));
}

/**
 * Recursive merge sort.  
 * @param array The array to sort.
 * @param compare Optional comparator that returns true if a < b.
 */
export function mergeSort<T>(array: T[], compare?: (a: T, b: T) => boolean): T[] {
  // Stop recursion when array has 0 or 1 item
  if (array.length <= 1) return array.slice(); // return a shallow copy

  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid), compare);
  const right = mergeSort(array.slice(mid), compare);

  return merge(left, right, compare);
}
const numbers = [5, 3, 8, 1, 2, 9];
const sorted = mergeSort(numbers); // => [1, 2, 3, 5, 8, 9]

const people = [
  { name: "Alice", age: 32 },
  { name: "Bob", age: 25 },
  { name: "Eve", age: 29 }
];

// Sort by age
const sortedByAge = mergeSort(people, (a, b) => a.age < b.age);
