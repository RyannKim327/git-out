/**
 * Random sort (Bogosort) implementation in TypeScript.
 *
 * WARNING: This algorithm has factorial time complexity (O(n!)) and
 * should only be used for demonstration or tiny arrays.
 */

/**
 * Returns a new array that is a random permutation of the input.
 */
function shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        // Pick a random index from 0..i
        const j = Math.floor(Math.random() * (i + 1));
        // Swap copy[i] and copy[j]
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

/**
 * Checks whether an array is sorted in non‑decreasing order.
 */
function isSorted(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) return false;
    }
    return true;
}

/**
 * Randomly sorts the given numeric array using Bogosort.
 * Returns a new sorted array and the number of shuffles performed.
 *
 * @param input The array to sort (will not be mutated).
 * @returns An object containing the sorted array and shuffle count.
 */
function bogosort(input: number[]): { sorted: number[]; attempts: number } {
    let attempts = 0;
    let candidate = [...input];

    while (!isSorted(candidate)) {
        candidate = shuffle(candidate);
        attempts++;
    }

    return { sorted: candidate, attempts };
}

/* ------------------- Example usage ------------------- */
const unsorted = [3, 1, 4, 2];
console.log('Original:', unsorted);

const { sorted, attempts } = bogosort(unsorted);
console.log('Sorted:', sorted);
console.log('Shuffles performed:', attempts);
