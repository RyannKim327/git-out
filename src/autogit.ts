// Generic helper that works for any type that supports the < operator
function isSortedAscending<T>(arr: T[], comparator?: (a: T, b: T) => boolean): boolean {
  // If a comparator isn’t supplied, fall back to the default "<" | ">" comparison.
  // This works for numbers, strings, Dates, etc.
  const cmp = comparator ?? ((a: any, b: any) => a < b);

  // Walk through the array once and bail out on the first violation.
  for (let i = 1; i < arr.length; i++) {
    // cmp(a, b) should be true for an ascending array.
    // For numbers, that means a < b; you could allow equality by `%=` or `<=`.
    if (!cmp(arr[i-1], arr[i])) {
      // The pair is out of order – the array isn’t sorted.
      return false;
    }
  }
  return true;          // All pairs were in the correct order.
}
const nums = [1, 3, 3, 7, 12];
console.log(isSortedAscending(nums));      // true

const people = [
  { name: 'Alice', age: 34 },
  { name: 'Bob', age: 27 },
];
console.log(isSortedAscending(people, (x, y) => x.age < y.age)); // false
function isSortedCompare<T>(arr: T[], comparator?: (a: T, b: T) => boolean): boolean {
  const sorted = [...arr].sort((a,b)=> (comparator ? (comparator(a,b)?-1:1) : a < b ? -1 : 1));
  return JSON.stringify(sorted) === JSON.stringify(arr);
}
const isSorted = (a: number[]) => a.every((v, i, l) => i === 0 || l[i-1] <= v);
