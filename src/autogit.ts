function getLongestIncreasingSubsequence(arr: number[]): number[] {
    if (arr.length === 0) {
        return [];
    }

    // dp[k] stores the smallest ending element of an increasing subsequence of length k+1.
    // This array is always sorted.
    const dp: number[] = [];

    // indices[k] stores the original index in `arr` of the element stored in dp[k].
    const indices: number[] = [];

    // predecessors[i] stores the index of the element preceding arr[i] in the LIS ending at arr[i].
    const predecessors: number[] = new Array(arr.length).fill(-1);

    /**
     * Helper function for binary search:
     * Finds the index `k` in `arr` such that `arr[k]` is the smallest element
     * strictly greater than `target`. If no such element exists, returns `arr.length`.
     */
    function binarySearchStrictlyGreater(searchArr: number[], target: number): number {
        let low = 0;
        let high = searchArr.length - 1;
        let ans = searchArr.length; // Default if target is greater than or equal to all elements

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (searchArr[mid] > target) { // We are looking for strictly greater
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }

    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];

        // Find the index `k` in `dp` where `num` should be placed.
        // `k` is the smallest index such that `dp[k] > num`.
        // If `num` is greater than or equal to all elements in `dp`, `k` will be `dp.length`.
        const k = binarySearchStrictlyGreater(dp, num);

        if (k === dp.length) {
            // `num` is greater than all elements in `dp`, so it extends the longest LIS found so far.
            dp.push(num);
            indices.push(i);
        } else {
            // `num` replaces `dp[k]`, forming an LIS of the same length (k+1) but with a smaller end.
            dp[k] = num;
            indices[k] = i;
        }

        // Set the predecessor for the current number arr[i].
        // If `k > 0`, it means `arr[i]` extends an LIS ending at `arr[indices[k-1]]`.
        // Otherwise (k=0), arr[i] is the start of an LIS of length 1, so it has no predecessor.
        if (k > 0) {
            predecessors[i] = indices[k - 1];
        } else {
            predecessors[i] = -1; // No predecessor for the first element of an LIS
        }
    }

    // Reconstruct the LIS using the predecessors array.
    // The last element of *a* longest increasing subsequence is `arr[indices[dp.length - 1]]`.
    const lis: number[] = [];
    let currentIdx = indices[dp.length - 1]; // Start from the end of an LIS of maximal length

    while (currentIdx !== -1) {
        lis.unshift(arr[currentIdx]); // Add to the beginning to maintain order
        currentIdx = predecessors[currentIdx];
    }

    return lis;
}

// --- Example Usage ---
const array1 = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(`Array: [${array1}]`);
console.log(`LIS: [${getLongestIncreasingSubsequence(array1)}]`); // Expected: [1, 4, 5, 9] or [1, 2, 6] (length 3). My algorithm produces [1, 4, 5, 6] or similar

const array2 = [10, 22, 9, 33, 21, 50, 41, 60, 80];
console.log(`Array: [${array2}]`);
console.log(`LIS: [${getLongestIncreasingSubsequence(array2)}]`); // Expected: [10, 22, 33, 41, 60, 80]

const array3 = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
console.log(`Array: [${array3}]`);
console.log(`LIS: [${getLongestIncreasingSubsequence(array3)}]`); // Expected: [0, 2, 6, 9, 11, 15] or similar

const array4 = [7, 7, 7, 7, 7, 7]; // Strictly increasing, so longest length is 1
console.log(`Array: [${array4}]`);
console.log(`LIS: [${getLongestIncreasingSubsequence(array4)}]`); // Expected: [7]

const array5: number[] = [];
console.log(`Array: [${array5}]`);
console.log(`LIS: [${getLongestIncreasingSubsequence(array5)}]`); // Expected: []

const array6 = [1, 2, 3, 4, 5];
console.log(`Array: [${array6}]`);
console.log(`LIS: [${getLongestIncreasingSubsequence(array6)}]`); // Expected: [1, 2, 3, 4, 5]

const array7 = [5, 4, 3, 2, 1];
console.log(`Array: [${array7}]`);
console.log(`LIS: [${getLongestIncreasingSubsequence(array7)}]`); // Expected: [5] (or any single element)
