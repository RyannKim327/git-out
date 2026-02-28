// Works for numbers, strings, dates, anything that can be compared with < and >.
export function isSorted<T extends number | string | Date>(arr: T[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}
isSorted([1, 2, 3, 4]);        // true
isSorted([1, 3, 2, 4]);        // false
isSorted(['a', 'b', 'c']);     // true
isSorted(['c', 'b', 'a']);     // false
type Comparator<T> = (a: T, b: T) => number;

export function isSortedWith<T>(arr: T[], cmp: Comparator<T>): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (cmp(arr[i - 1], arr[i]) > 0) return false; // `a > b` in ascending order
  }
  return true;
}
interface Person { name: string; age: number; }

const people: Person[] = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
];

isSortedWith(people, (a, b) => a.age - b.age); // true
export const isSorted = <T>(arr: T[], cmp: Comparator<T> = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}): boolean =>
  arr
    .map((value, index, self) => [self[index - 1], value] as const)
    .slice(1) // skip the first undefined pair
    .every(([prev, cur]) => cmp(prev!, cur) <= 0);
