// Optional comparator: should return >0 if a > b, 0 if equal, <0 if a < b
export function bubbleSort<T>(
  arr: T[],
  compare: (a: T, b: T) => number = defaultCompare as any
): T[] {
  const a = arr.slice();
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (compare(a[j], a[j + 1]) > 0) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // early exit if already sorted
  }

  return a;
}
export function bubbleSortInPlace<T>(
  arr: T[],
  compare: (a: T, b: T) => number = defaultCompare as any
): void {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (compare(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
}
function defaultCompare(a: any, b: any): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (typeof a === "string" && typeof b === "string") return a.localeCompare(b);
  // Fallback: compare string representations
  const sa = String(a);
  const sb = String(b);
  return sa < sb ? -1 : sa > sb ? 1 : 0;
}
const nums = [5, 2, 9, 1, 5];
const sortedNums = bubbleSort(nums); // [1, 2, 5, 5, 9]
const nums2 = [5, 2, 9, 1, 5];
bubbleSortInPlace(nums2); // nums2 is now [1, 2, 5, 5, 9]
const words = ["banana", "apple", "cherry"];
const sortedWords = bubbleSort(words, (a, b) => a.localeCompare(b)); // ["apple", "banana", "cherry"]
type Person = { name: string; age: number };
const people: Person[] = [
  { name: "Ada", age: 34 },
  { name: "Ben", age: 21 },
  { name: "Cara", age: 28 },
];

const sortedPeople = bubbleSort(people, (a, b) => a.age - b.age);
/* [
  { name: "Ben", age: 21 },
  { name: "Cara", age: 28 },
  { name: "Ada", age: 34 }
] */
