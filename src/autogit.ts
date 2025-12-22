/**
 * Merge-sort (stable).
 *  - O(n log n) time, O(n) extra space
 *  - Returns a NEW array (original is left untouched)
 */
export function mergeSort<T>(
  arr: readonly T[],
  compare: (a: T, b: T) => number = defaultCompare
): T[] {
  // base cases
  if (arr.length < 2) return arr.slice();

  // split
  const mid = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid), compare);
  const right = mergeSort(arr.slice(mid), compare);

  // merge
  return merge(left, right, compare);
}

/* ------------------------------------------------------------------ */
/* --------------------------  helpers  ----------------------------- */
/* ------------------------------------------------------------------ */

/** Default comparator for primitives */
function defaultCompare<T>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** Merge two *sorted* arrays into one sorted array */
function merge<T>(
  left: T[],
  right: T[],
  compare: (a: T, b: T) => number
): T[] {
  const result: T[] = [];
  let i = 0;
  let j = 0;

  // while both arrays have items left
  while (i < left.length && j < right.length) {
    if (compare(left[i], right[j]) <= 0) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // copy any leftovers (only one of these loops will run)
  while (i < left.length)  result.push(left[i++]);
  while (j < right.length)  result.push(right[j++]);

  return result;
}
const nums   = [9, 3, 5, 1, 4, 8, 2, 7];
const sorted = mergeSort(nums);
console.log(sorted); // [1, 2, 3, 4, 5, 7, 8, 9]

// custom objects
interface Person { name: string; age: number; }
const people: Person[] = [
  { name: 'Alice', age: 32 },
  { name: 'Bob',   age: 25 },
  { name: 'Carol', age: 25 },
];

// sort by age asc, then by name asc
const byAge = mergeSort(people, (a, b) =>
  a.age !== b.age ? a.age - b.age : a.name.localeCompare(b.name)
);
console.log(byAge);
export function mergeSortInPlace<T>(
  arr: T[],
  compare = defaultCompare
): void {
  if (arr.length < 2) return;
  const aux = arr.slice(); // one auxiliary buffer
  mergeSortRange(arr, 0, arr.length, aux, compare);
}

function mergeSortRange<T>(
  a: T[],
  lo: number,
  hi: number,
  aux: T[],
  compare: (a: T, b: T) => number
): void {
  if (hi - lo < 2) return;
  const mid = Math.floor((lo + hi) / 2);
  mergeSortRange(a, lo, mid, aux, compare);
  mergeSortRange(a, mid, hi, aux, compare);
  mergeRanges(a, lo, mid, hi, aux, compare);
}

function mergeRanges<T>(
  a: T[],
  lo: number,
  mid: number,
  hi: number,
  aux: T[],
  compare: (a: T, b: T) => number
): void {
  let i = lo;
  let j = mid;
  let k = lo;

  while (i < mid && j < hi) {
    aux[k++] = compare(a[i], a[j]) <= 0 ? a[i++] : a[j++];
  }
  while (i < mid) aux[k++] = a[i++];
  while (j < hi)   aux[k++] = a[j++];
  for (let t = lo; t < hi; ++t) a[t] = aux[t];
}
