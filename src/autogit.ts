/**
 * Generic insertion sort.
 * @param arr  The array to sort – it will be mutated in‑place.
 * @returns    The sorted array (the same reference that was passed in).
 */
export function insertionSort<T>(arr: T[]): T[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    /* shift elements that are greater than key one position to the right */
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }
  return arr;
}
const numbers = [8, 3, 5, 4, 6, 1];
console.log(insertionSort(numbers)); // [1, 3, 4, 5, 6, 8]
const words = ['orange', 'apple', 'banana'];
console.log(insertionSort(words)); // ['apple', 'banana', 'orange']
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: 'Zoe', age: 29 },
  { name: 'Anna', age: 22 },
  { name: 'Mike', age: 35 }
];

function sortByAge(arr: Person[]): Person[] {
  return insertionSort(arr, (a, b) => a.age - b.age);
}

// extended version that accepts a compare function
export function insertionSort<T>(
  arr: T[],
  compareFn?: (a: T, b: T) => number
): T[] {
  const cmp = compareFn ?? ((a: T, b: T) => (a > b ? 1 : a < b ? -1 : 0));
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && cmp(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

console.log(sortByAge(people));
/*
[
  { name: 'Anna', age: 22 },
  { name: 'Zoe', age: 29 },
  { name: 'Mike', age: 35 }
]
*/
