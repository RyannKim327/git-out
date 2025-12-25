function longestIncreasingSubsequenceDP(arr: number[]): number[] {
    const n = arr.length;
    if (n === 0) return [];
    
    // dp[i] stores the length of LIS ending at index i
    const dp: number[] = new Array(n).fill(1);
    
    // prev[i] stores the previous index in the LIS ending at index i
    const prev: number[] = new Array(n).fill(-1);
    
    // Fill dp and prev arrays
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
    }
    
    // Find the maximum length and its ending index
    let maxLength = 1;
    let endIndex = 0;
    
    for (let i = 0; i < n; i++) {
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            endIndex = i;
        }
    }
    
    // Reconstruct the LIS
    const lis: number[] = [];
    let current = endIndex;
    
    while (current >= 0) {
        lis.unshift(arr[current]);
        current = prev[current];
    }
    
    return lis;
}
function longestIncreasingSubsequence(arr: number[]): number[] {
    const n = arr.length;
    if (n === 0) return [];
    
    // tails[i] stores the smallest tail value for LIS of length i+1
    const tails: number[] = [];
    
    // prevIndices[i] stores the previous index in the LIS ending at tails[i]
    const prevIndices: number[] = new Array(n).fill(-1);
    
    // indices[i] stores the index in arr that corresponds to tails[i]
    const indices: number[] = new Array(n).fill(-1);
    
    tails.push(arr[0]);
    indices[0] = 0;
    
    for (let i = 1; i < n; i++) {
        if (arr[i] > tails[tails.length - 1]) {
            // Extend the largest subsequence
            prevIndices[i] = indices[tails.length - 1];
            tails.push(arr[i]);
            indices[tails.length - 1] = i;
        } else {
            // Replace the first element in tails that is >= arr[i]
            const pos = binarySearch(tails, arr[i]);
            tails[pos] = arr[i];
            indices[pos] = i;
            
            if (pos > 0) {
                prevIndices[i] = indices[pos - 1];
            }
        }
    }
    
    // Reconstruct the LIS
    const lis: number[] = [];
    let currentIndex = indices[tails.length - 1];
    
    while (currentIndex !== -1) {
        lis.unshift(arr[currentIndex]);
        currentIndex = prevIndices[currentIndex];
    }
    
    return lis;
}

function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] >= target) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return result;
}
// Example usage
const arr = [10, 22, 9, 33, 21, 50, 41, 60, 80];
const lisDP = longestIncreasingSubsequenceDP(arr);
const lis = longestIncreasingSubsequence(arr);

console.log("Original array:", arr);
console.log("LIS (O(n²)):", lisDP);
console.log("LIS (O(n log n)):", lis);
console.log("Length:", lis.length);

// Output:
// Original array: [10, 22, 9, 33, 21, 50, 41, 60, 80]
// LIS (O(n²)): [10, 22, 33, 50, 60, 80]
// LIS (O(n log n)): [10, 22, 33, 50, 60, 80]
// Length: 6
function lisLength(arr: number[]): number {
    const tails: number[] = [];
    
    for (const num of arr) {
        const pos = binarySearch(tails, num);
        if (pos === -1) {
            tails.push(num);
        } else {
            tails[pos] = num;
        }
    }
    
    return tails.length;
}
