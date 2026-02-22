/**
 * Selection sort – O(n²) time, O(1) extra space.
 *
 * @param arr The array to sort.
 * @returns The same array instance, now sorted.
 */
function selectionSort<T>(arr: T[]): T[] {
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    // index of the smallest element in the unsorted suffix
    let minIdx = i;

    // search for a smaller element
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // swap the found minimum with the current position
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }

  return arr;
}
// Numbers
const numbers = [64, 25, 12, 22, 11];
console.log(selectionSort(numbers)); // [11, 12, 22, 25, 64]

// Strings
const words = ['pear', 'apple', 'orange', 'banana'];
console.log(selectionSort(words));   // ['apple', 'banana', 'orange', 'pear']

// Custom objects – provide a compare function
interface Person { name: string; age: number }

function sortByAge(a: Person, b: Person) {
  return a.age - b.age;
}

const people: Person[] = [
  { name: 'Alice', age: 34 },
  { name: 'Bob', age: 28 },
  { name: 'Carol', age: 41 }
];

// Simple wrapper to let us pass a comparator
function selectionSortWith<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < len; j++) {
      if (compare(arr[j], arr[minIdx]) < 0) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

console.log(selectionSortWith(people, sortByAge));
// [{ name: 'Bob', age: 28 }, { name: 'Alice', age: 34 }, { name: 'Carol', age: 41 }]
