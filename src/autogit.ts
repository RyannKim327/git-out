// Generic, in‑place quicksort
export function quickSort<T>(
  arr: T[],
  compareFn?: (a: T, b: T) => number,
  low = 0,
  high = arr.length - 1,
): T[] {
  // Default comparator: numeric/string natural order
  const cmp = compareFn ?? ((a: T, b: T) =>
    a < b ? -1 : a > b ? 1 : 0,
  );

  // Helper: partition using Hoare's scheme
  const partition = (l: number, h: number): number => {
    const pivot = arr[Math.floor((l + h) / 2)];
    let i = l - 1;
    let j = h + 1;
    while (true) {
      do { i++; } while (cmp(arr[i], pivot) < 0);
      do { j--; } while (cmp(arr[j], pivot) > 0);
      if (i >= j) return j;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  };

  if (low < high) {
    const p = partition(low, high);
    quickSort(arr, compareFn, low, p);
    quickSort(arr, compareFn, p + 1, high);
  }
  return arr; // for convenience – returns the same array reference
}
export function quickSortImmutable<T>(
  arr: readonly T[],
  compareFn?: (a: T, b: T) => number,
): T[] {
  if (arr.length <= 1) return [...arr];

  const compare = compareFn ?? ((a: T, b: T) =>
    a < b ? -1 : a > b ? 1 : 0,
  );

  const pivot = arr[Math.floor(arr.length / 2)];
  const lows = arr.filter((x) => compare(x, pivot) < 0);
  const highs = arr.filter((x) => compare(x, pivot) > 0);
  const pivots = arr.filter((x) => compare(x, pivot) === 0);

  return [
    ...quickSortImmutable(lows, compareFn),
    ...pivots,
    ...quickSortImmutable(highs, compareFn),
  ];
}
const nums = [34, 7, 23, 32, 5, 62];
quickSort(nums);               // mutates `nums`
console.log(nums);             // [5, 7, 23, 32, 34, 62]

let strs = ["banana", "apple", "cherry"];
quickSort(strs, (a, b) => a.localeCompare(b));
console.log(strs);             // ["apple", "banana", "cherry"]

let objs = [
  { id: 3, name: "c" },
  { id: 1, name: "a" },
  { id: 2, name: "b" },
];
quickSort(
  objs,
  (a, b) => a.id - b.id,
);
console.log(objs);
// [{ id: 1, name: "a" }, { id: 2, name: "b" }, { id: 3, name: "c" }]
