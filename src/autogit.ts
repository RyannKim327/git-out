/**
 * A generic insertion‑sort implementation.
 *
 * @param arr The array to sort (in‑place).
 * @param cmp Optional comparison callback. It should return:
 *            < 0 if a < b
 *            = 0 if a === b
 *            > 0 if a > b
 *
 * @returns The same array reference, now sorted.
 */
export function insertionSort<T>(
  arr: T[],
  cmp?: (a: T, b: T) => number
): T[] {
  // If no custom comparator is supplied, use the default < / >.
  const compare = cmp
    ? cmp
    : (a: T, b: T) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - allow primitive coercion for < and > operators
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };

  // Iterate from the second element to the end.
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Shift larger elements one position to the right.
    while (j >= 0 && compare(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Place key in its correct position.
    arr[j + 1] = key;
  }

  return arr;
}
const numbers = [5, 3, 8, 1, 4];
insertionSort(numbers);
console.log(numbers); // [1, 3, 4, 5, 8]
const names = ["Zoe", "Andrew", "bella", "Clara"];
insertionSort(names);
console.log(names); // ["Andrew", "Clara", "bella", "Zoe"]
interface Item {
  id: number;
  name: string;
}

const items: Item[] = [
  { id: 3, name: "apple" },
  { id: 1, name: "orange" },
  { id: 2, name: "banana" },
];

insertionSort(items, (a, b) => a.id - b.id);
console.log(items);
// [{ id: 1, name: "orange" }, { id: 2, name: "banana" }, { id: 3, name: "apple" }]
export function sorted<T>(arr: T[], cmp?: (a: T, b: T) => number): T[] {
  const copy = [...arr];
  return insertionSort(copy, cmp);
}
