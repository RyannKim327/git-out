/**
 * Returns true if the array is sorted in ascending order.
 * By default it uses the usual `<`/`>` comparison (works for numbers, strings, Dates, etc.).
 * If you need a custom order you can supply a comparator:
 *   (a, b) => a.value - b.value   // numeric
 *   (a, b) => a.name.localeCompare(b.name) // string property
 */
function isSorted<T>(
  arr: readonly T[],
  comparator?: (a: T, b: T) => number
): boolean {
  if (arr.length < 2) return true;          // 0 or 1 element → already sorted

  const cmp = comparator ?? ((a: T, b: T) => {
    // Default comparison: works for numbers, strings, Dates, etc.
    return (a as any) < (b as any) ? -1 : (a as any) > (b as any) ? 1 : 0;
  });

  for (let i = 1; i < arr.length; i++) {
    if (cmp(arr[i - 1], arr[i]) > 0) {
      return false; // a previous element is larger → not sorted
    }
  }
  return true;
}
// Numbers
console.log(isSorted([1, 2, 3, 4]));           // true
console.log(isSorted([1, 3, 2, 4]));           // false

// Strings
console.log(isSorted(['a', 'b', 'c']));       // true

// Dates
console.log(
  isSorted([
    new Date('2020-01-01'),
    new Date('2020-06-01'),
    new Date('2021-01-01')
  ])
); // true

// Objects with a specific key
const people = [{ age: 25 }, { age: 32 }, { age: 40 }];
console.log(isSorted(people, (p, q) => p.age - q.age)); // true
const isSortedFunctional = <T>(arr: readonly T[], cmp = (a: T, b: T) => (a as any) < (b as any) ? -1 : (a as any) > (b as any) ? 1 : 0) =>
  arr.every((v, i, a) => i === 0 || cmp(a[i - 1], v) <= 0);
