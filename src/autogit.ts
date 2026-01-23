/**
 * Insertion sort – stable, O(n²) average / worst‑case.
 *
 * @param arr   - Array to sort (mutable, in‑place).
 * @param cmp   - Optional compare function (a < b → negative,
 *                a > b → positive, a == b → 0).
 *                If omitted, the default numeric or string
 *                comparison is used.
 * @returns     - The same array reference, now sorted.
 */
function insertionSort<T>(
  arr: T[],
  cmp?: (a: T, b: T) => number
): T[] {
  // Default comparator: JavaScript's <= works for numbers & strings.
  const compare = cmp ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  // Work from the second element onward – the sub‑array `[0, i)` is sorted.
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Shift larger elements rightward until the right spot is found.
    while (j >= 0 && compare(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Put the key into its correct place.
    arr[j + 1] = key;
  }

  return arr;
}
// Numbers
const nums = [21, 4, 18, 15, 6];
console.log(insertionSort(nums));          // [4, 6, 15, 18, 21]

// Strings
const words = ['peach', 'apple', 'banana'];
console.log(insertionSort(words));          // ['apple', 'banana', 'peach']

// Custom objects – sort by `age`
interface Person { name: string; age: number; }
const people: Person[] = [
  { name: 'Ann', age: 33 },
  { name: 'Bob', age: 24 },
  { name: 'Cleo', age: 41 },
];

console.log(
  insertionSort(people, (a, b) => a.age - b.age)
); // [{name:'Bob',age:24}, {name:'Ann',age:33}, {name:'Cleo',age:41}]
console.assert(JSON.stringify(insertionSort([5, 4, 3, 2, 1])) === '[1,2,3,4,5]');
console.assert(JSON.stringify(insertionSort([{x:2}, {x:1}], (a,b)=>a.x-b.x)) === '[{"x":1},{"x":2}]');
