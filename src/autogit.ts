// A very basic, in‑place bubble sort for numbers
export function bubbleSort(values: number[]): void {
  const n = values.length;
  for (let i = 0; i < n - 1; i++) {
    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      if (values[j] > values[j + 1]) {
        // swap
        [values[j], values[j + 1]] = [values[j + 1], values[j]];
      }
    }
  }
}
export function bubbleSortOptimized(values: number[]): void {
  const n = values.length;
  let swapped: boolean;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (values[j] > values[j + 1]) {
        [values[j], values[j + 1]] = [values[j + 1], values[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
}
export function bubbleSort<T>(
  values: T[],
  compareFn: (a: T, b: T) => number = (a, b) => a > b ? 1 : a < b ? -1 : 0
): void {
  const n = values.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (compareFn(values[j], values[j + 1]) > 0) {
        [values[j], values[j + 1]] = [values[j + 1], values[j]];
      }
    }
  }
}
interface Person { name: string; age: number; }

const data: Person[] = [
  { name: 'Zoe', age: 28 },
  { name: 'Alex', age: 33 },
  { name: 'Bob', age: 22 },
];

bubbleSort(data, (a, b) => a.name.localeCompare(b.name));

console.log(data); // Alex, Bob, Zoe
export function bubbleSortCopy<T>(
  values: T[],
  compareFn: (a: T, b: T) => number = (a, b) => a > b ? 1 : a < b ? -1 : 0
): T[] {
  const copy = [...values];
  bubbleSort(copy, compareFn);
  return copy;
}
const arr = [5, 1, 4, 2, 8];
bubbleSort(arr);
console.log(arr); // [1, 2, 4, 5, 8]
