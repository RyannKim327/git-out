function findLIS_N_Squared(arr: number[]): { length: number; subsequence: number[] } {
    const n = arr.length;

    if (n === 0) {
        return { length: 0, subsequence: [] };
    }

    // dp[i] stores the length of the LIS ending at arr[i]
    const dp: number[] = new Array(n).fill(1);
    // prev[i] stores the index of the element that came before arr[i] in the LIS
    const prev: number[] = new Array(n).fill(-1);

    let maxLength = 1;
    let endIndex = 0; // To track the end of the longest subsequence

    // Calculate dp values and track predecessors
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[i] > arr[j] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
        // Update maxLength and endIndex if a longer LIS is found
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            endIndex = i;
        }
    }

    // Reconstruct the actual subsequence
    const subsequence: number[] = [];
    let currentIndex = endIndex;
    while (currentIndex !== -1) {
        subsequence.push(arr[currentIndex]);
        currentIndex = prev[currentIndex];
    }
    subsequence.reverse(); // The sequence was built in reverse order

    return { length: maxLength, subsequence: subsequence };
}

// --- Example Usage (O(n^2)) ---
const arr1 = [10, 22, 9, 33, 21, 50, 41, 60, 80];
const lis1 = findLIS_N_Squared(arr1);
console.log("Array 1:", arr1);
console.log("LIS (O(n^2)): Length =", lis1.length, ", Subsequence =", lis1.subsequence);
// Expected: Length = 6, Subsequence = [10, 22, 33, 41, 60, 80] or [10, 22, 33, 50, 60, 80]

const arr2 = [3, 10, 2, 1, 20];
const lis2 = findLIS_N_Squared(arr2);
console.log("\nArray 2:", arr2);
console.log("LIS (O(n^2)): Length =", lis2.length, ", Subsequence =", lis2.subsequence);
// Expected: Length = 3, Subsequence = [3, 10, 20] or [2, ?, 20]

const arr3 = [7, 7, 7, 7, 7, 7]; // No strictly increasing subsequence longer than 1
const lis3 = findLIS_N_Squared(arr3);
console.log("\nArray 3:", arr3);
console.log("LIS (O(n^2)): Length =", lis3.length, ", Subsequence =", lis3.subsequence);
// Expected: Length = 1, Subsequence = [7]

const arr4 = [1, 2, 3, 4, 5];
const lis4 = findLIS_N_Squared(arr4);
console.log("\nArray 4:", arr4);
console.log("LIS (O(n^2)): Length =", lis4.length, ", Subsequence =", lis4.subsequence);
// Expected: Length = 5, Subsequence = [1, 2, 3, 4, 5]

const arr5 = [5, 4, 3, 2, 1];
const lis5 = findLIS_N_Squared(arr5);
console.log("\nArray 5:", arr5);
console.log("LIS (O(n^2)): Length =", lis5.length, ", Subsequence =", lis5.subsequence);
// Expected: Length = 1, Subsequence = [5] (or [4], [3], etc.)
// Helper function for binary search (lower bound)
function lowerBound(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length;

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low; // This is the index where 'target' would be inserted
}

function findLIS_N_log_N(arr: number[]): { length: number } {
    const n = arr.length;

    if (n === 0) {
        return { length: 0 };
    }

    // tails[k] stores the smallest ending element of all increasing subsequences of length k+1
    const tails: number[] = [];

    for (const num of arr) {
        if (tails.length === 0 || num > tails[tails.length - 1]) {
            // Case 1: num extends the current longest LIS
            tails.push(num);
        } else {
            // Case 2: num can potentially form a "better" LIS of an existing length
            // Find the first element in tails that is >= num
            const idx = lowerBound(tails, num);
            tails[idx] = num; // Replace it with num
        }
    }

    return { length: tails.length };
}

// --- Example Usage (O(n log n)) ---
console.log("\n--- O(n log n) Approach (Length Only) ---");
const arr6 = [10, 22, 9, 33, 21, 50, 41, 60, 80];
const lis6 = findLIS_N_log_N(arr6);
console.log("Array 6:", arr6);
console.log("LIS (O(n log n)): Length =", lis6.length); // Expected: Length = 6

const arr7 = [3, 10, 2, 1, 20];
const lis7 = findLIS_N_log_N(arr7);
console.log("\nArray 7:", arr7);
console.log("LIS (O(n log n)): Length =", lis7.length); // Expected: Length = 3

const arr8 = [7, 7, 7, 7, 7, 7];
const lis8 = findLIS_N_log_N(arr8);
console.log("\nArray 8:", arr8);
console.log("LIS (O(n log n)): Length =", lis8.length); // Expected: Length = 1

const arr9 = [1, 2, 3, 4, 5];
const lis9 = findLIS_N_log_N(arr9);
console.log("\nArray 9:", arr9);
console.log("LIS (O(n log n)): Length =", lis9.length); // Expected: Length = 5

const arr10 = [5, 4, 3, 2, 1];
const lis10 = findLIS_N_log_N(arr10);
console.log("\nArray 10:", arr10);
console.log("LIS (O(n log n)): Length =", lis10.length); // Expected: Length = 1
