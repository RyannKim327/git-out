/**
 * Shell sort – a classic gap‑based insertion sort
 *
 * @template T - type held in the array
 * @param arr   Array to be sorted in place
 * @param cmp   Optional comparator, defaults to numeric comparison
 * @returns     The sorted array (same reference as `arr`)
 */
export function shellSort<T>(
  arr: T[],
  cmp: (a: T, b: T) => number = (a: any, b: any) => a - b
): T[] {
  const n = arr.length;

  // A common sequence: n/2, n/4, …, 1
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      // shift earlier gap-sorted elements until the correct spot for temp is found
      while (j >= gap && cmp(arr[j - gap], temp) > 0) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }

  return arr;
}
// 1️⃣ Sort numbers
const numbers = [23, 12, 1, 8, 34, 54, 2, 3];
shellSort(numbers);
console.log(numbers); // → [1, 2, 3, 8, 12, 23, 34, 54]

// 2️⃣ Sort strings alphabetically
shellSort(["banana", "apple", "cherry", "date"], (a, b) => a.localeCompare(b));

// 3️⃣ Sort objects by a property
interface Person { name: string; age: number }
const people: Person[] = [
  { name: "Zoe", age: 29 },
  { name: "Alex", age: 22 },
  { name: "Mia", age: 35 }
];
shellSort(people, (a, b) => a.age - b.age);
console.log(people.map(p => p.age));  // → [22, 29, 35]
