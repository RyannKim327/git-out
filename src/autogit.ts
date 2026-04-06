/**
 * Fibonacci Search
 *
 * @param arr  – sorted array (ascending)
 * @param target – value that we want to locate
 * @returns the index of target or −1 if it isn't present
 */
export function fibonacciSearch<T>(
    arr: readonly T[],
    target: T,
    cmp: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): number {
    const n = arr.length;

    // ---- 1. Generate the smallest Fibonacci number ≥ n ----
    let fibMMm2 = 0; // (m‑2)’th Fibonacci
    let fibMMm1 = 1; // (m‑1)’th Fibonacci
    let fibM = fibMMm2 + fibMMm1; // m’th Fibonacci

    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }

    // ---- 2. Marks the eliminated range from front ----
    let offset = -1;

    // ---- 3. While there are elements to inspect ----
    while (fibM > 1) {
        // Calculate the index to check
        const i = Math.min(offset + fibMMm2, n - 1);

        const comp = cmp(arr[i], target);

        // case 1: the target is greater than the value at index i
        if (comp < 0) {
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
        }
        // case 2: the target is less than the value at index i
        else if (comp > 0) {
            fibM = fibMMm2;
            fibMMm1 = fibMMm1 - fibMMm2;
            fibMMm2 = fibM - fibMMm1;
        }
        // case 3: element found
        else {
            return i;
        }
    }

    // ---- 4. If the last remaining element is the target ----
    if (fibMMm1 && offset + 1 < n && cmp(arr[offset + 1], target) === 0) {
        return offset + 1;
    }

    return -1; // not found
}
const nums = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
const idx = fibonacciSearch(nums, 13);

console.log(idx); // → 6
console.log(idx === -1 ? "Not found" : `Found at ${idx}`);
