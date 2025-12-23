function maxSubarraySum(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Either extend the existing subarray or start a new one
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// Example usage
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubarraySum(arr)); // Output: 6 (subarray [4, -1, 2, 1])
function maxSubarrayWithIndices(nums: number[]): { sum: number; start: number; end: number } {
    if (nums.length === 0) return { sum: 0, start: 0, end: 0 };
    
    let maxSum = nums[0];
    let currentSum = nums[0];
    let start = 0, end = 0;
    let tempStart = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > currentSum + nums[i]) {
            currentSum = nums[i];
            tempStart = i;
        } else {
            currentSum += nums[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    return { sum: maxSum, start, end };
}

// Example usage
const result = maxSubarrayWithIndices([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log(result); // { sum: 6, start: 3, end: 6 }
function maxSubarraySumBruteForce(nums: number[]): number {
    let maxSum = -Infinity;
    
    for (let i = 1; i <= nums.length; i++) {
        for (let j = 0; j <= nums.length - i; j++) {
            let currentSum = 0;
            for (let k = j; k < j + i; k++) {
                currentSum += nums[k];
            }
            maxSum = Math.max(maxSum, currentSum);
        }
    }
    
    return maxSum;
}
interface SubarrayResult {
    sum: number;
    subarray: number[];
    indices: [number, number];
}

function findMaxSubarray(nums: number[]): SubarrayResult {
    if (!Array.isArray(nums)) {
        throw new Error('Input must be an array');
    }
    
    if (nums.length === 0) {
        return { sum: 0, subarray: [], indices: [0, 0] };
    }
    
    let maxSum = nums[0];
    let currentSum = nums[0];
    let start = 0, end = 0;
    let tempStart = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > currentSum + nums[i]) {
            currentSum = nums[i];
            tempStart = i;
        } else {
            currentSum += nums[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    const subarray = nums.slice(start, end + 1);
    
    return {
        sum: maxSum,
        subarray,
        indices: [start, end]
    };
}

// Example usage
const result = findMaxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log(result);
// Output: { sum: 6, subarray: [4, -1, 2, 1], indices: [3, 6] }
// Test with different scenarios
console.log(findMaxSubarray([])); // Empty array
console.log(findMaxSubarray([-1, -2, -3])); // All negative numbers
console.log(findMaxSubarray([5])); // Single element
console.log(findMaxSubarray([1, 2, 3, 4, 5])); // All positive numbers
