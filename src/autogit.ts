/**
 * Returns the indices and values of the longest strictly increasing subsequence.
 *
 * @param arr - The input numeric array.
 * @returns An object containing:
 *   - sequence: the LIS as an array of numbers.
 *   - indices:  the original indices of those numbers in `arr`.
 *
 * Complexity:   Time  O(n log n)
 *               Space O(n)
 */
export function longestIncreasingSubsequence(arr: number[]): {
    sequence: number[],
    indices:   number[]
} {
    if (arr.length === 0) return { sequence: [], indices: [] };

    // tail[i] holds the index in arr of the smallest ending value
    // of an increasing subsequence of length i+1.
    const tail: number[] = [];
    // prev[i] tracks the index of the predecessor of arr[i] in the LIS ending at i.
    const prev: (number | null)[] = Array(arr.length).fill(null);

    for (let i = 0; i < arr.length; i++) {
        const x = arr[i];

        // Binary search to find the insertion point in tail.
        let low = 0, high = tail.length;
        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            if (arr[tail[mid]] < x) low = mid + 1;
            else high = mid;
        }

        // low is the position where x will sit in tail
        if (low > 0) {
            prev[i] = tail[low - 1]; // point to predecessor
        }
        if (low === tail.length) {
            tail.push(i);
        } else {
            tail[low] = i; // replace a larger tail with a smaller one
        }
    }

    // Reconstruct the LIS by walking back from the last index
    const indices: number[] = [];
    let cur: number | null = tail[tail.length - 1];
    while (cur !== null) {
        indices.push(cur);
        cur = prev[cur];
    }
    indices.reverse(); // from start to end

    const sequence = indices.map(i => arr[i]);

    return { sequence, indices };
}
const arr = [3, 10, 2, 1, 20, 4, 6, 12];
const result = longestIncreasingSubsequence(arr);

console.log(result.sequence); // [3, 10, 20]
console.log(result.indices);  // [0, 1, 4]
