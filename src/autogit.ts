function isSortedAsc<T>(arr: T[], compareFn?: (a: T, b: T) => number): boolean {
  if (arr.length < 2) return true;           // One or no elements is always sorted

  // Default comparison is the "<=" operator for primitives
  const cmp = compareFn ?? ((a: T, b: T) => (a as any) <= (b as any) ? 0 : 1);

  for (let i = 1; i < arr.length; i++) {
    // If the current element is less than the previous one, it’s not sorted
    if (cmp(arr[i - 1], arr[i]) > 0) return false;
  }
  return true;
}
console.log(isSortedAsc([1, 2, 3, 4]));  // true
console.log(isSortedAsc([1, 3, 2, 5]));  // false
interface Person { age: number; name: string }

const people = [
  { age: 22, name: "Alice" },
  { age: 29, name: "Bob" },
  { age: 30, name: "Carol" }
];

console.log(isSortedAsc(people, (a, b) => a.age - b.age)); // true
const isSortedAscShortcut = (arr: number[]): boolean =>
  arr.every((v, i, a) => i === 0 || a[i - 1] <= v);
