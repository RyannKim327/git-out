/**
 * Radix Sort – Least Significant Digit (LSD) version.
 *
 * Works for non‑negative integers. For signed integers use `radixSortSigned`.
 *
 * @param arr   The array to sort (will be sorted **in‑place**).
 * @param base  The radix (default 10). Use 256 for byte‑wise sorting.
 * @returns The same array reference, now sorted.
 */
export function radixSort(arr: number[], base: number = 10): number[] {
    if (arr.length < 2) return arr; // already sorted

    // 1️⃣ Find the maximum value to know how many digits we need.
    let max = Math.max(...arr);
    // Edge case: all zeros → no passes needed.
    if (max === 0) return arr;

    // 2️⃣ Perform counting sort for each digit position.
    let exp = 1; // 1, base, base², …
    const n = arr.length;
    const output = new Array<number>(n);
    const count = new Array<number>(base);

    while (Math.floor(max / exp) > 0) {
        // ---- reset count array ----
        count.fill(0);

        // ---- 1️⃣ Count occurrences of each digit ----
        for (let i = 0; i < n; i++) {
            const digit = Math.floor(arr[i] / exp) % base;
            count[digit]++;
        }

        // ---- 2️⃣ Transform count into prefix sums (cumulative) ----
        for (let i = 1; i < base; i++) {
            count[i] += count[i - 1];
        }

        // ---- 3️⃣ Build the output array (stable!) ----
        // iterate from right to left so that equal digits keep original order
        for (let i = n - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % base;
            const pos = --count[digit]; // decrement then use as index
            output[pos] = arr[i];
        }

        // ---- 4️⃣ Copy back to the original array for the next pass ----
        for (let i = 0; i < n; i++) {
            arr[i] = output[i];
        }

        // Move to next more‑significant digit
        exp *= base;
    }

    return arr;
}
/**
 * Radix Sort that handles signed 32‑bit integers.
 *
 * @param arr   Array of numbers (will be sorted in‑place).
 * @param base  Radix base (default 10). 256 is a good choice for speed.
 * @returns The same array reference, now sorted.
 */
export function radixSortSigned(arr: number[], base: number = 10): number[] {
    // Separate negatives and non‑negatives
    const negatives: number[] = [];
    const nonNegatives: number[] = [];

    for (const v of arr) {
        if (v < 0) {
            // Store absolute value for sorting; we’ll flip later
            negatives.push(-v);
        } else {
            nonNegatives.push(v);
        }
    }

    // Sort each bucket using the non‑negative routine
    radixSort(negatives, base);
    radixSort(nonNegatives, base);

    // Re‑assemble: negatives (in reverse order) + non‑negatives
    // Example: [-9, -5, -1] + [0, 2, 7] → [-9, -5, -1, 0, 2, 7]
    let idx = 0;
    for (let i = negatives.length - 1; i >= 0; i--) {
        arr[idx++] = -negatives[i];
    }
    for (const v of nonNegatives) {
        arr[idx++] = v;
    }

    return arr;
}
type KeySelector<T> = (item: T) => number;

/**
 * Generic radix sort for any array of objects, using a numeric key selector.
 *
 * @param arr        Array of items to sort (in‑place).
 * @param key        Function that extracts a non‑negative integer key from an item.
 * @param base       Radix base (default 10).
 * @returns The same array reference, now sorted.
 */
export function radixSortBy<T>(arr: T[], key: KeySelector<T>, base: number = 10): T[] {
    if (arr.length < 2) return arr;

    // Find max key value
    let max = 0;
    for (const item of arr) {
        const k = key(item);
        if (k > max) max = k;
    }
    if (max === 0) return arr;

    const n = arr.length;
    const output = new Array<T>(n);
    const count = new Array<number>(base);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        count.fill(0);

        // Count digits
        for (let i = 0; i < n; i++) {
            const digit = Math.floor(key(arr[i]) / exp) % base;
            count[digit]++;
        }

        // Prefix sums
        for (let i = 1; i < base; i++) {
            count[i] += count[i - 1];
        }

        // Stable distribution (right‑to‑left)
        for (let i = n - 1; i >= 0; i--) {
            const digit = Math.floor(key(arr[i]) / exp) % base;
            const pos = --count[digit];
            output[pos] = arr[i];
        }

        // Copy back
        for (let i = 0; i < n; i++) {
            arr[i] = output[i];
        }

        exp *= base;
    }

    return arr;
}
interface Player {
    name: string;
    score: number; // non‑negative integer
}

const players: Player[] = [
    { name: "Alice", score: 42 },
    { name: "Bob",   score: 7 },
    { name: "Cara",  score: 19 },
    { name: "Dave",  score: 42 },
];

radixSortBy(players, p => p.score);
// → players now ordered by ascending score, preserving original order for ties (stable)
// ---------------------------------------------------------------
// Simple sanity‑check driver (run with `ts-node` or `deno run`)
// ---------------------------------------------------------------
function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// 1️⃣ Test plain numbers (including negatives)
const nums = shuffle([-15, 3, 0, -2, 8, 7, -100, 42, 5]);
console.log("Original:", nums);
radixSortSigned(nums);
console.log("Sorted  :", nums); // should be ascending

// 2️⃣ Test objects
interface Item { id: number; value: number; }
const items: Item[] = shuffle([
    { id: 1, value: 23 },
    { id: 2, value: 5 },
    { id: 3, value: 23 },
    { id: 4, value: 0 },
    { id: 5, value: 99 },
]);
radixSortBy(items, it => it.value);
console.log("Sorted items by value:", items);
// radixSort.ts ----------------------------------------------------
export function radixSort(arr: number[], base: number = 10): number[] {
    if (arr.length < 2) return arr;
    let max = Math.max(...arr);
    if (max === 0) return arr;

    const n = arr.length;
    const output = new Array<number>(n);
    const count = new Array<number>(base);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        count.fill(0);
        for (let i = 0; i < n; i++) {
            const digit = Math.floor(arr[i] / exp) % base;
            count[digit]++;
        }
        for (let i = 1; i < base; i++) count[i] += count[i - 1];
        for (let i = n - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % base;
            const pos = --count[digit];
            output[pos] = arr[i];
        }
        for (let i = 0; i < n; i++) arr[i] = output[i];
        exp *= base;
    }
    return arr;
}

// ---------------------------------------------------------------
export function radixSortSigned(arr: number[], base: number = 10): number[] {
    const negatives: number[] = [];
    const nonNegatives: number[] = [];

    for (const v of arr) {
        if (v < 0) negatives.push(-v);
        else nonNegatives.push(v);
    }

    radixSort(negatives, base);
    radixSort(nonNegatives, base);

    let idx = 0;
    for (let i = negatives.length - 1; i >= 0; i--) arr[idx++] = -negatives[i];
    for (const v of nonNegatives) arr[idx++] = v;
    return arr;
}

// ---------------------------------------------------------------
type KeySelector<T> = (item: T) => number;

export function radixSortBy<T>(arr: T[], key: KeySelector<T>, base: number = 10): T[] {
    if (arr.length < 2) return arr;

    let max = 0;
    for (const item of arr) {
        const k = key(item);
        if (k > max) max = k;
    }
    if (max === 0) return arr;

    const n = arr.length;
    const output = new Array<T>(n);
    const count = new Array<number>(base);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        count.fill(0);
        for (let i = 0; i < n; i++) {
            const digit = Math.floor(key(arr[i]) / exp) % base;
            count[digit]++;
        }
        for (let i = 1; i < base; i++) count[i] += count[i - 1];
        for (let i = n - 1; i >= 0; i--) {
            const digit = Math.floor(key(arr[i]) / exp) % base;
            const pos = --count[digit];
            output[pos] = arr[i];
        }
        for (let i = 0; i < n; i++) arr[i] = output[i];
        exp *= base;
    }
    return arr;
}

// ---------------------------------------------------------------
// Simple demo (uncomment to run as a script)
// ---------------------------------------------------------------
/*
function shuffle<T>(a: T[]): T[] {
    const arr = [...a];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Numbers (including negatives)
const nums = shuffle([-15, 3, 0, -2, 8, 7, -100, 42, 5]);
console.log('Before:', nums);
radixSortSigned(nums);
console.log('After :', nums);

// Objects
interface Player { name: string; score: number; }
const players: Player[] = shuffle([
    { name: 'Alice', score: 42 },
    { name: 'Bob',   score: 7 },
    { name: 'Cara',  score: 19 },
    { name: 'Dave',  score: 42 },
]);
radixSortBy(players, p => p.score);
console.log('Players sorted by score:', players);
*/
