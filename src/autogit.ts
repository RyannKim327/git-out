function findLIS(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const tails: number[] = [];
    const parentIndices: number[] = new Array(nums.length);
    const resultIndices: number[] = [];
    
    tails.push(0); // Start with first element
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[tails[tails.length - 1]]) {
            // Extend the largest sequence
            parentIndices[i] = tails[tails.length - 1];
            tails.push(i);
        } else {
            // Find where to replace using binary search
            const pos = binarySearch(tails, nums, nums[i]);
            tails[pos] = i;
            if (pos > 0) {
                parentIndices[i] = tails[pos - 1];
            }
        }
    }
    
    // Reconstruct the LIS
    let current = tails[tails.length - 1];
    for (let i = tails.length - 1; i >= 0; i--) {
        resultIndices[i] = current;
        current = parentIndices[current];
    }
    
    return resultIndices.map(idx => nums[idx]);
}

function binarySearch(tails: number[], nums: number[], target: number): number {
    let left = 0;
    let right = tails.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[tails[mid]] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left;
}

// Usage example
const arr = [10, 9, 2, 5, 3, 7, 101, 18];
const lis = findLIS(arr);
console.log("Longest Increasing Subsequence:", lis);
// Output: [2, 3, 7, 101] or [2, 5, 7, 101] depending on the implementation
function findLISDP(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const dp: number[] = new Array(nums.length).fill(1);
    const prev: number[] = new Array(nums.length).fill(-1);
    let maxLength = 1;
    let maxIndex = 0;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
                
                if (dp[i] > maxLength) {
                    maxLength = dp[i];
                    maxIndex = i;
                }
            }
        }
    }
    
    // Reconstruct the LIS
    const result: number[] = [];
    let current = maxIndex;
    while (current !== -1) {
        result.unshift(nums[current]);
        current = prev[current];
    }
    
    return result;
}

// Usage example
const arr2 = [10, 9, 2, 5, 3, 7, 101, 18];
const lis2 = findLISDP(arr2);
console.log("Longest Increasing Subsequence (DP):", lis2);
class LongestIncreasingSubsequence {
    /**
     * Finds the longest increasing subsequence using O(n log n) algorithm
     */
    static findLIS(nums: number[]): number[] {
        if (nums.length === 0) return [];
        
        const tails: number[] = [];
        const parentIndices: number[] = new Array(nums.length);
        const resultIndices: number[] = [];
        
        tails.push(0);
        
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] > nums[tails[tails.length - 1]]) {
                parentIndices[i] = tails[tails.length - 1];
                tails.push(i);
            } else {
                const pos = this.binarySearchPosition(tails, nums, nums[i]);
                tails[pos] = i;
                if (pos > 0) {
                    parentIndices[i] = tails[pos - 1];
                }
            }
        }
        
        // Reconstruct the actual sequence
        let current = tails[tails.length - 1];
        for (let i = tails.length - 1; i >= 0; i--) {
            resultIndices[i] = current;
            current = parentIndices[current];
        }
        
        return resultIndices.map(idx => nums[idx]);
    }
    
    /**
     * Finds the longest increasing subsequence using dynamic programming (O(n²))
     */
    static findLISDP(nums: number[]): number[] {
        if (nums.length === 0) return [];
        
        const dp: number[] = new Array(nums.length).fill(1);
        const prev: number[] = new Array(nums.length).fill(-1);
        let maxLength = 1;
        let maxIndex = 0;
        
        for (let i = 1; i < nums.length; i++) {
            for (let j = 0; j < i; j++) {
                if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {
                    dp[i] = dp[j] + 1;
                    prev[i] = j;
                    
                    if (dp[i] > maxLength) {
                        maxLength = dp[i];
                        maxIndex = i;
                    }
                }
            }
        }
        
        const result: number[] = [];
        let current = maxIndex;
        while (current !== -1) {
            result.unshift(nums[current]);
            current = prev[current];
        }
        
        return result;
    }
    
    /**
     * Returns just the length of LIS (more efficient)
     */
    static lengthOfLIS(nums: number[]): number {
        const tails: number[] = [];
        
        for (const num of nums) {
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
            
            if (left === tails.length) {
                tails.push(num);
            } else {
                tails[left] = num;
            }
        }
        
        return tails.length;
    }
    
    private static binarySearchPosition(tails: number[], nums: number[], target: number): number {
        let left = 0;
        let right = tails.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[tails[mid]] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return left;
    }
}

// Test the implementation
const testArrays: number[][] = [
    [10, 9, 2, 5, 3, 7, 101, 18],
    [0, 1, 0, 3, 2, 3],
    [7, 7, 7, 7, 7, 7, 7],
    [1, 3, 6, 7, 9, 4, 10, 5, 6]
];

testArrays.forEach((arr, index) => {
    console.log(`\nTest Array ${index + 1}: [${arr}]`);
    console.log("LIS (O(n log n)):", LongestIncreasingSubsequence.findLIS(arr));
    console.log("LIS (O(n²)):", LongestIncreasingSubsequence.findLISDP(arr));
    console.log("Length of LIS:", LongestIncreasingSubsequence.lengthOfLIS(arr));
});
