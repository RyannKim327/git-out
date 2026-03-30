/**
 * In‑place selection sort.
 *
 * @param arr  The array to sort.
 * @param compare Optional comparison callback. Should return:
 *                 < 0 if a < b
 *                 > 0 if a > b
 *                 0 if a == b
 */
export function selectionSort<T>(
  arr: T[],
  compare?: (a: T, b: T) => number
): void {
  const cmp = compare ?? defaultCompare;

  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    // Find the minimum element in arr[i…len-1]
    let minIdx = i;
    for (let j = i + 1; j < len; j++) {
      if (cmp(arr[j], arr[minIdx]) < 0) {
        minIdx = j;
      }
    }
    // Swap the found minimum with the first element
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
}

/**
 * Default comparer for numbers and strings.
 */
function defaultCompare(a: any, b: any): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
// 1. Sorting numbers
const nums = [64, 25, 12, 22, 11];
selectionSort(nums);
console.log(nums); // [11, 12, 22, 25, 64]

// 2. Sorting strings
const fruits = ['banana', 'apple', 'cherry'];
selectionSort(fruits);
console.log(fruits); // ['apple', 'banana', 'cherry']

// 3. Sorting objects by a key
type Person = { name: string; age: number };
const people: Person[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 22 },
  { name: 'Carol', age: 25 },
];

selectionSort(people, (a, b) => a.age - b.age);
console.log(people);
/*
[
  { name: 'Bob', age: 22 },
  { name: 'Carol', age: 25 },
  { name: 'Alice', age: 30 }
]
*/
