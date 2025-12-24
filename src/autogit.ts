type Comparator<T> = (a: T, b: T) => number; // <0 if a<b, 0 if equal, >0 if a>b
/**
 * Restores the max‑heap property for the subtree rooted at `i`.
 *
 * @param arr        The array that stores the heap.
 * @param heapSize   Number of elements that belong to the heap (may be < arr.length during sorting).
 * @param i          Index of the root of the subtree to heapify.
 * @param compare    Comparator that returns a positive number when a > b.
 */
function heapify<T>(arr: T[], heapSize: number, i: number, compare: Comparator<T>): void {
    let largest = i;               // Assume current node is the largest
    const left = 2 * i + 1;        // Left child index
    const right = 2 * i + 2;       // Right child index

    // If left child exists and is larger than root
    if (left < heapSize && compare(arr[left], arr[largest]) > 0) {
        largest = left;
    }

    // If right child exists and is larger than the current largest
    if (right < heapSize && compare(arr[right], arr[largest]) > 0) {
        largest = right;
    }

    // If the largest is not the root, swap and continue heapifying
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, heapSize, largest, compare);
    }
}

/**
 * Builds a max‑heap from an unsorted array.
 *
 * @param arr     The array to turn into a heap (modified in place).
 * @param compare Comparator.
 */
function buildMaxHeap<T>(arr: T[], compare: Comparator<T>): void {
    const n = arr.length;
    // Start from the last non‑leaf node and heapify each one.
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, compare);
    }
}
/**
 * Sorts an array using the heap‑sort algorithm.
 *
 * @param array    The array to sort. It will be sorted **in‑place**.
 * @param compare  Optional comparator. If omitted, a default numeric/string comparator is used.
 * @returns        The same array reference, now sorted.
 */
export function heapSort<T>(array: T[], compare?: Comparator<T>): T[] {
    // ---------- 1️⃣ Default comparator ----------
    const defaultCompare: Comparator<T> = (a, b) => {
        // Works for numbers and strings; for other types you must supply a comparator.
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    };
    const cmp = compare ?? defaultCompare;

    // ---------- 2️⃣ Build the initial max‑heap ----------
    buildMaxHeap(array, cmp);

    // ---------- 3️⃣ Extract elements one by one ----------
    for (let heapSize = array.length - 1; heapSize > 0; heapSize--) {
        // Move current max (root) to the end of the unsorted portion
        [array[0], array[heapSize]] = [array[heapSize], array[0]];
        // Restore heap property for the reduced heap
        heapify(array, heapSize, 0, cmp);
    }

    return array; // optional, because the array is mutated in place
}
import { heapSort } from "./heapSort";

const nums = [9, 4, 1, 7, 3, 6, 2];
console.log("Before:", nums);

heapSort(nums);               // sorts in place
console.log("After :", nums);
// Output:
// Before: [9, 4, 1, 7, 3, 6, 2]
// After : [1, 2, 3, 4, 6, 7, 9]
const words = ["pear", "apple", "orange", "banana"];
heapSort(words);
console.log(words); // ["apple","banana","orange","pear"]
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 32 },
    { name: "Bob",   age: 24 },
    { name: "Carol", age: 29 },
];

// Sort by age ascending
heapSort(people, (a, b) => a.age - b.age);

console.log(people);
// [
//   { name: 'Bob',   age: 24 },
//   { name: 'Carol', age: 29 },
//   { name: 'Alice', age: 32 }
// ]
// heapSort.ts
type Comparator<T> = (a: T, b: T) => number;

function heapify<T>(arr: T[], heapSize: number, i: number, compare: Comparator<T>): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < heapSize && compare(arr[left], arr[largest]) > 0) {
        largest = left;
    }
    if (right < heapSize && compare(arr[right], arr[largest]) > 0) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, heapSize, largest, compare);
    }
}

function buildMaxHeap<T>(arr: T[], compare: Comparator<T>): void {
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        heapify(arr, arr.length, i, compare);
    }
}

/**
 * Heap sort – sorts the array in place.
 *
 * @param array   The array to sort.
 * @param compare Optional comparator; defaults to numeric/string order.
 * @returns       The same array reference (now sorted).
 */
export function heapSort<T>(array: T[], compare?: Comparator<T>): T[] {
    const defaultCompare: Comparator<T> = (a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    };
    const cmp = compare ?? defaultCompare;

    buildMaxHeap(array, cmp);

    for (let heapSize = array.length - 1; heapSize > 0; heapSize--) {
        [array[0], array[heapSize]] = [array[heapSize], array[0]];
        heapify(array, heapSize, 0, cmp);
    }

    return array;
}
