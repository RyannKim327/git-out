function longestIncreasingSubsequence(arr: number[]): number[] {
    if (arr.length === 0) return [];

    // Array to hold the smallest tail element for all increasing subsequences
    const tails: number[] = [];
    // Array to reconstruct the sequence
    const prevIndices: (number | null)[] = new Array(arr.length).fill(null);
    // Keeps the indices of tail elements for each length
    const tailIndices: number[] = [];

    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];

        // Binary search to find the insertion point in tails
        let left = 0;
        let right = tails.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        // If we are extending the largest subsequence
        if (left === tails.length) {
            tails.push(num);
            tailIndices.push(i);
        } else {
            tails[left] = num;
            tailIndices[left] = i;
        }

        // Keep track of the previous index for reconstruction
        prevIndices[i] = left > 0 ? tailIndices[left - 1] : null;
    }

    // Reconstruct the LIS
    const lis: number[] = [];
    let currentIndex = tailIndices[tails.length - 1];

    while (currentIndex !== null) {
        lis.unshift(arr[currentIndex]);
        currentIndex = prevIndices[currentIndex];
    }

    return lis;
}

// Example usage:
const array = [10, 9, 2, 5, 3, 7, 101, 18];
const lis = longestIncreasingSubsequence(array);
console.log(lis); // Output: [2, 3, 7, 18]
