/**
 * Merge-sort (stable, O(n log n))
 * --------------------------------
 * @param arr         Array to sort (left untouched)
 * @param compareFn   Optional comparator (a, b) => negative | 0 | positive
 * @returns           New sorted array
 */
export function mergeSort<T>(
  arr: readonly T[],
  compareFn?: (a: T, b: T) => number
): T[] {
  // default comparator uses natural ordering
  const cmp =
    compareFn ??
    ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));

  // recursive helper
  function ms(lo: number, hi: number): T[] {
    if (hi - lo <= 1) return [arr[lo]];          // size-1 slice

    const mid = Math.floor((lo + hi) / 2);
    const left  = ms(lo, mid);
    const right = ms(mid, hi);
    return merge(left, right, cmp);
  }

  return ms(0, arr.length);
}

/**
 * Merge two *sorted* arrays into a new sorted array
 */
function merge<T>(a: T[], b: T[], cmp: (x: T, y: T) => number): T[] {
  const res: T[] = [];
  let i = 0, j = 0;

  while (i < a.length && j < b.length) {
    res.push(cmp(a[i], b[j]) <= 0 ? a[i++] : b[j++]);
  }
  // one of the two may have leftovers
  return res.concat(a.slice(i)).concat(b.slice(j));
}

/* ---------- usage examples ---------- */

// numbers
const nums = [9, 2, 7, 4, 5, 6, 3, 8, 1, 0];
console.log(mergeSort(nums)); // [0,1,2,3,4,5,6,7,8,9]

// strings
const words = ["pear", "Peach", "apple", "Apricot"];
console.log(mergeSort(words)); // case-sensitive order

// custom comparator (case-insensitive)
console.log(
  mergeSort(words, (a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
);

// objects by property
interface Person { name: string; age: number }
const people: Person[] = [
  { name: "Alice", age: 32 },
  { name: "Bob", age: 25 },
  { name: "Carol", age: 29 }
];
const byAge = mergeSort(people, (p, q) => p.age - q.age);
console.log(byAge);
