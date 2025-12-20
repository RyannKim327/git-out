export function quickSort<T>(
  arr: T[],
  compare?: (a: T, b: T) => number
): T[] {
  if (arr.length <= 1) return arr.slice();

  // Default comparator: works for numbers and strings
  const cmp = compare ?? ((a: T, b: T) => {
    // TypeScript won't know the type here; rely on the caller to provide a proper comparator
    // This cast is safe as long as you provide a correct comparator for T
    // @ts-ignore
    return a < b ? -1 : a > b ? 1 : 0;
  });

  const pivot: T = arr[Math.floor(arr.length / 2)];
  const less = arr.filter((x) => cmp(x, pivot) < 0);
  const equal = arr.filter((x) => cmp(x, pivot) === 0);
  const greater = arr.filter((x) => cmp(x, pivot) > 0);

  return [...quickSort(less, compare), ...equal, ...quickSort(greater, compare)];
}
const nums = [3, 1, 4, 1, 5, 9, 2, 6, 5];
const sortedNums = quickSort(nums);
console.log(sortedNums); // [1, 1, 2, 3, 4, 5, 5, 6, 9]
type Person = { name: string; age: number };

const people: Person[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Carol", age: 35 },
];

const sortedByAge = quickSort(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
export function quickSortInPlace<T>(
  arr: T[],
  left = 0,
  right = arr.length - 1,
  compare?: (a: T, b: T) => number
): void {
  const cmp = compare ?? ((a, b) => {
    // As above, rely on the caller-provided comparator for non-primitive T
    // @ts-ignore
    return a < b ? -1 : a > b ? 1 : 0;
  });

  const partition = (a: T[], low: number, high: number): number => {
    const pivot = a[high];
    let i = low;
    for (let j = low; j < high; j++) {
      if (cmp(a[j], pivot) <= 0) {
        [a[i], a[j]] = [a[j], a[i]];
        i++;
      }
    }
    [a[i], a[high]] = [a[high], a[i]];
    return i;
  };

  if (left < right) {
    const pi = partition(arr, left, right);
    quickSortInPlace(arr, left, pi - 1, compare);
    quickSortInPlace(arr, pi + 1, right, compare);
  }
}
const nums2 = [3, 1, 4, 1, 5, 9, 2, 6, 5];
quickSortInPlace(nums2);
console.log(nums2); // [1, 1, 2, 3, 4, 5, 5, 6, 9]
type Person = { name: string; age: number };
const people2: Person[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Carol", age: 35 },
];

quickSortInPlace(people2, 0, people2.length - 1, (a, b) => a.age - b.age);
console.log(people2);
