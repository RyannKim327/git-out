/**
 * Generic binary search.
 *
 * @param arr   Sorted array.
 * @param key  Value you’re looking for.
 * @param cmp  Optional comparison callback.
 *
 * @returns The index of `key` if found, otherwise –1.
 */
export function binarySearch<T>(
    arr: T[],
    key: T,
    cmp?: (a: T, b: T) => number
): number {
    if (arr.length === 0) return -1;

    // Default to natural ordering for primitives.
    const compare = cmp ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));

    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        // Guard against overflow in large arrays.
        const mid = low + ((high - low) >> 1);
        const midVal = arr[mid];

        const comparison = compare(midVal, key);

        if (comparison === 0) {
            return mid;          // Found!
        } else if (comparison < 0) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;  // Not found
}
// 1️⃣ Integers (no cmp needed)
const numbers = [3, 7, 12, 19, 27];
const idx1 = binarySearch(numbers, 12); // 2

// 2️⃣ Strings
const words = ['apple', 'banana', 'cherry', 'date'];
const idx2 = binarySearch(words, 'cherry'); // 2

// 3️⃣ Objects – supply a compare
type User = { id: number; name: string };
const users: User[] = [
    { id: 10, name: 'Zoe' },
    { id: 20, name: 'Bob' },
    { id: 30, name: 'Alice' },
].sort((a, b) => a.id - b.id);

const idx3 = binarySearch(users, { id: 20, name: '' }, (a, b) => a.id - b.id); // 1
