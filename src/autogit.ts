/**
 * In‑place quicksort.
 *
 * @param arr  The array to sort
 * @param cmp  Optional comparator: (a,b) => number.
 *             If omitted, the default comparison uses the built‑in
 *             < , == , > operators (works for strings, numbers, etc.).
 * @returns    The same array reference, now sorted
 */
export function quickSort<T>(
    arr: T[],
    cmp?: (a: T, b: T) => number
): T[] {
    // Default comparator for primitives
    const defaultCmp = (a: T, b: T): number => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    };

    const compare = cmp ?? defaultCmp;

    // Lomuto partition: pivot is the last element
    const partition = (lo: number, hi: number): number => {
        const pivot = arr[hi];
        let i = lo;            // place for the next smaller element
        for (let j = lo; j < hi; j++) {
            if (compare(arr[j], pivot) <= 0) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }
        // put pivot in its final place
        [arr[i], arr[hi]] = [arr[hi], arr[i]];
        return i;
    };

    const quick = (lo: number, hi: number): void => {
        if (lo < hi) {
            const p = partition(lo, hi);
            quick(lo, p - 1);
            quick(p + 1, hi);
        }
    };

    quick(0, arr.length - 1);
    return arr;
}
// Numbers – default comparison works
const nums = [5, 3, 8, 4, 2];
quickSort(nums);
console.log(nums); // [2, 3, 4, 5, 8]

// Strings – default comparison is lexicographic
const words = ['banana', 'apple', 'cherry'];
quickSort(words);
console.log(words); // ['apple', 'banana', 'cherry']

// Custom comparator (descending)
interface Person { name: string; age: number; }
const people: Person[] = [
    { name: 'Eve', age: 29 },
    { name: 'Bob', age: 42 },
    { name: 'Alice', age: 35 }
];
quickSort(people, (a, b) => b.age - a.age); // sort by age descending
console.log(people);
