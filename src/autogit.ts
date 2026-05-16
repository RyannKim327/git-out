/* ------------------------------------------------------------
   Heap‑sort in TypeScript
   ------------------------------------------------------------ */

/**
 * Build a max‑heap in place.
 * `heapSize` is the number of elements to consider from the start of `arr`.
 */
function heapify<T>(arr: T[], heapSize: number, i: number, cmp: (a: T, b: T) => number) {
    const left  = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;

    if (left  < heapSize && cmp(arr[left],  arr[largest]) > 0) largest = left;
    if (right < heapSize && cmp(arr[right], arr[largest]) > 0) largest = right;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, heapSize, largest, cmp);
    }
}

/**
 * Transform an array into a heap.  O(n) time.
 */
function buildHeap<T>(arr: T[], cmp: (a: T, b: T) => number) {
    const heapSize = arr.length;
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
        heapify(arr, heapSize, i, cmp);
    }
}

/**
 * Heap‑sort: sorts `arr` in place and returns it.
 * Default comparison is numeric ascending order.
 */
export function heapSort<T>(arr: T[], cmp?: (a: T, b: T) => number): T[] {
    const compare = cmp ?? ((a, b) => (a as any) - (b as any));

    // 1️⃣ build max‑heap
    buildHeap(arr, compare);

    // 2️⃣ repeatedly extract the max and rebuild heap
    let heapSize = arr.length;
    for (let i = arr.length - 1; i > 0; i--) {
        // put current max (root) at the end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapSize--;

        // restore heap property on the reduced heap
        heapify(arr, heapSize, 0, compare);
    }

    return arr;
}
const numbers = [5, 3, 8, 4, 1, 7, 2];
heapSort(numbers);
console.log(numbers); // → [1, 2, 3, 4, 5, 7, 8]
interface Person { name: string; age: number }

// Sort by age ascending
heapSort(people, (a, b) => a.age - b.age);
