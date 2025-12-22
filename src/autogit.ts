function longestIncreasingSubsequenceDP(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const n = nums.length;
    const dp: number[] = new Array(n).fill(1); // Length of LIS ending at each index
    const prev: number[] = new Array(n).fill(-1); // Previous index in the sequence
    
    let maxLength = 1;
    let endIndex = 0;
    
    // Build DP table
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
                
                if (dp[i] > maxLength) {
                    maxLength = dp[i];
                    endIndex = i;
                }
            }
        }
    }
    
    // Reconstruct the sequence
    const sequence: number[] = [];
    let current = endIndex;
    
    while (current !== -1) {
        sequence.unshift(nums[current]);
        current = prev[current];
    }
    
    return sequence;
}
function longestIncreasingSubsequence(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const n = nums.length;
    const tails: number[] = []; // Smallest tail of increasing subsequence of length i+1
    const prevIndices: number[] = new Array(n).fill(-1);
    const indices: number[] = []; // Stores indices of elements in tails
    
    tails.push(nums[0]);
    indices.push(0);
    
    for (let i = 1; i < n; i++) {
        if (nums[i] > tails[tails.length - 1]) {
            // Extend the longest subsequence
            prevIndices[i] = indices[indices.length - 1];
            tails.push(nums[i]);
            indices.push(i);
        } else {
            // Replace the first element in tails that is >= nums[i]
            const pos = binarySearch(tails, nums[i]);
            tails[pos] = nums[i];
            indices[pos] = i;
            
            // Update previous index if not the first element
            if (pos > 0) {
                prevIndices[i] = indices[pos - 1];
            }
        }
    }
    
    // Reconstruct the sequence
    const sequence: number[] = [];
    let currentIndex = indices[indices.length - 1];
    
    while (currentIndex !== -1) {
        sequence.unshift(nums[currentIndex]);
        currentIndex = prevIndices[currentIndex];
    }
    
    return sequence;
}

function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left; // Position to insert/replace
}
interface LISResult {
    length: number;
    sequence: number[];
}

function findLongestIncreasingSubsequence(nums: number[]): LISResult {
    const sequence = longestIncreasingSubsequence(nums);
    return {
        length: sequence.length,
        sequence: sequence
    };
}

// Example usage
const testArrays = [
    [10, 9, 2, 5, 3, 7, 101, 18],
    [0, 1, 0, 3, 2, 3],
    [7, 7, 7, 7, 7, 7, 7],
    [1, 3, 6, 7, 9, 4, 10, 5, 6]
];

testArrays.forEach((arr, index) => {
    const result = findLongestIncreasingSubsequence(arr);
    console.log(`Array ${index + 1}: [${arr.join(', ')}]`);
    console.log(`Longest Increasing Subsequence: [${result.sequence.join(', ')}]`);
    console.log(`Length: ${result.length}`);
    console.log('---');
});
function lisLength(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    const tails: number[] = [];
    
    for (const num of nums) {
        const pos = binarySearch(tails, num);
        if (pos === tails.length) {
            tails.push(num);
        } else {
            tails[pos] = num;
        }
    }
    
    return tails.length;
}
// Test with large array
function generateLargeArray(size: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
}

const largeArray = generateLargeArray(10000);

console.time('DP Approach');
const dpResult = longestIncreasingSubsequenceDP(largeArray);
console.timeEnd('DP Approach');

console.time('Efficient Approach');
const efficientResult = longestIncreasingSubsequence(largeArray);
console.timeEnd('Efficient Approach');

console.log(`DP length: ${dpResult.length}`);
console.log(`Efficient length: ${efficientResult.length}`);
