/**
 * Binary search on a sorted array.
 *
 * @param arr   Sorted array (ascending).
 * @param key   Value to search for.
 * @returns     Index of `key` in `arr`, or -1 if not found.
 */
export function binarySearch<T extends number | string>(arr: T[], key: T): number {
    let low  = 0;
    let high = arr.length - 1;

    while (low <= high) {
        // Use floor division so we don’t overshoot on odd lengths.
        const mid = Math.floor((low + high) / 2);
        const midVal = arr[mid];

        if (midVal === key) {
            return mid;                // Found it!
        }
        else if (midVal < key) {
            low = mid + 1;              // Search right half
        } else {
            high = mid - 1;             // Search left half
        }
    }
    return -1; // Not found
}
type Comparator<T> = (a: T, b: T) => number; // negative if a < b, zero if equal, positive otherwise

export function binarySearchWith<T>(arr: T[], key: T, cmp: Comparator<T>): number {
    let low = 0, high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const comp = cmp(arr[mid], key);

        if (comp === 0) return mid;
        if (comp < 0)  low = mid + 1;
        else           high = mid - 1;
    }
    return -1;
}
const numbers = [3, 7, 12, 20, 31, 45, 58];
console.log(binarySearch(numbers, 20)); // → 3

// With a custom comparator for objects:
const people = [{id: 1, name: 'Alice'}, {id: 3, name: 'Bob'}, {id: 7, name: 'Carol'}];
const idCmp = (p: typeof people[0], key: number) => p.id - key;
console.log(binarySearchWith(people, 3, idCmp)); // → 1
