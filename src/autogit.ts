function longestIncreasingSubsequenceDP(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const dp: number[] = new Array(nums.length).fill(1);
    const sequences: number[][] = new Array(nums.length);
    
    // Initialize each position with its own value
    for (let i = 0; i < nums.length; i++) {
        sequences[i] = [nums[i]];
    }
    
    // Build DP table and track sequences
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                sequences[i] = [...sequences[j], nums[i]];
            }
        }
    }
    
    // Find the longest sequence
    const maxLength = Math.max(...dp);
    const maxIndex = dp.findIndex(length => length === maxLength);
    
    return sequences[maxIndex];
}

// Example usage
const arr = [10, 22, 9, 33, 21, 50, 41, 60, 80];
console.log(longestIncreasingSubsequenceDP(arr)); // [10, 22, 33, 50, 60, 80]
function longestIncreasingSubsequenceOptimal(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const tails: number[] = [];
    const sequences: number[][] = [];
    
    for (const num of nums) {
        // Binary search to find where to place the current number
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
        
        // Update tails array
        if (left === tails.length) {
            tails.push(num);
            // Build the sequence
            if (left === 0) {
                sequences.push([num]);
            } else {
                sequences.push([...sequences[left - 1], num]);
            }
        } else {
            tails[left] = num;
            if (left === 0) {
                sequences[left] = [num];
            } else {
                sequences[left] = [...sequences[left - 1], num];
            }
        }
    }
    
    return sequences[tails.length - 1];
}
function lisLength(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    const dp: number[] = new Array(nums.length).fill(1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}
interface LISResult {
    length: number;
    sequence: number[];
    indices: number[];
}

function longestIncreasingSubsequenceDetailed(nums: number[]): LISResult {
    if (nums.length === 0) {
        return { length: 0, sequence: [], indices: [] };
    }
    
    const dp: number[] = new Array(nums.length).fill(1);
    const parent: number[] = new Array(nums.length).fill(-1);
    const sequences: number[][] = new Array(nums.length);
    
    for (let i = 0; i < nums.length; i++) {
        sequences[i] = [nums[i]];
    }
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
                sequences[i] = [...sequences[j], nums[i]];
            }
        }
    }
    
    const maxLength = Math.max(...dp);
    const maxIndex = dp.findIndex(length => length === maxLength);
    
    // Reconstruct indices
    const indices: number[] = [];
    let current = maxIndex;
    while (current !== -1) {
        indices.unshift(current);
        current = parent[current];
    }
    
    return {
        length: maxLength,
        sequence: sequences[maxIndex],
        indices
    };
}
function testLIS() {
    const testCases = [
        { input: [10, 22, 9, 33, 21, 50, 41, 60, 80], expected: [10, 22, 33, 50, 60, 80] },
        { input: [3, 2, 6, 4, 5, 1], expected: [2, 4, 5] },
        { input: [0, 8, 4, 12, 2, 10, 6, 14, 1, 9], expected: [0, 4, 6, 9] },
        { input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
        { input: [5, 4, 3, 2, 1], expected: [5] }
    ];
    
    testCases.forEach((testCase, index) => {
        const result = longestIncreasingSubsequenceDP(testCase.input);
        console.log(`Test ${index + 1}:`);
        console.log(`Input: [${testCase.input}]`);
        console.log(`Expected: [${testCase.expected}]`);
        console.log(`Got: [${result}]`);
        console.log(`Pass: ${JSON.stringify(result) === JSON.stringify(testCase.expected)}`);
        console.log('---');
    });
}

testLIS();
