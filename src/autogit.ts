function maxSubArray(nums: number[]): number {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Either extend the existing subarray or start a new one
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// With indices to track the subarray
function maxSubArrayWithIndices(nums: number[]): { sum: number; start: number; end: number } {
    let maxSum = nums[0];
    let currentSum = nums[0];
    let start = 0;
    let maxStart = 0;
    let maxEnd = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (currentSum + nums[i] < nums[i]) {
            // Start new subarray
            currentSum = nums[i];
            start = i;
        } else {
            // Extend current subarray
            currentSum += nums[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            maxStart = start;
            maxEnd = i;
        }
    }
    
    return { sum: maxSum, start: maxStart, end: maxEnd };
}
function maxSubArrayDivideConquer(nums: number[]): number {
    return findMaxSubArray(nums, 0, nums.length - 1);
    
    function findMaxSubArray(arr: number[], low: number, high: number): number {
        if (low === high) {
            return arr[low];
        }
        
        const mid = Math.floor((low + high) / 2);
        
        // Find maximum subarray in left half, right half, and crossing midpoint
        const leftMax = findMaxSubArray(arr, low, mid);
        const rightMax = findMaxSubArray(arr, mid + 1, high);
        const crossMax = findMaxCrossingSubArray(arr, low, mid, high);
        
        return Math.max(leftMax, rightMax, crossMax);
    }
    
    function findMaxCrossingSubArray(arr: number[], low: number, mid: number, high: number): number {
        let leftSum = -Infinity;
        let sum = 0;
        
        // Find maximum sum in left half
        for (let i = mid; i >= low; i--) {
            sum += arr[i];
            if (sum > leftSum) {
                leftSum = sum;
            }
        }
        
        let rightSum = -Infinity;
        sum = 0;
        
        // Find maximum sum in right half
        for (let i = mid + 1; i <= high; i++) {
            sum += arr[i];
            if (sum > rightSum) {
                rightSum = sum;
            }
        }
        
        return leftSum + rightSum;
    }
}
function maxSubArrayBruteForce(nums: number[]): number {
    let maxSum = -Infinity;
    
    for (let i = 0; i < nums.length; i++) {
        let currentSum = 0;
        for (let j = i; j < nums.length; j++) {
            currentSum += nums[j];
            if (currentSum > maxSum) {
                maxSum = currentSum;
            }
        }
    }
    
    return maxSum;
}
interface MaxSubArrayResult {
    sum: number;
    subarray: number[];
    indices: { start: number; end: number };
}

function findMaxSubArray(nums: number[]): MaxSubArrayResult {
    if (nums.length === 0) {
        throw new Error("Array cannot be empty");
    }
    
    let maxSum = nums[0];
    let currentSum = nums[0];
    let start = 0;
    let maxStart = 0;
    let maxEnd = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (currentSum < 0) {
            currentSum = nums[i];
            start = i;
        } else {
            currentSum += nums[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            maxStart = start;
            maxEnd = i;
        }
    }
    
    return {
        sum: maxSum,
        subarray: nums.slice(maxStart, maxEnd + 1),
        indices: { start: maxStart, end: maxEnd }
    };
}
// Example usage
const numbers = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

console.log("Kadane's Algorithm:", maxSubArray(numbers));
// Output: 6 (subarray [4, -1, 2, 1])

console.log("With indices:", maxSubArrayWithIndices(numbers));
// Output: { sum: 6, start: 3, end: 6 }

console.log("Type-safe result:", findMaxSubArray(numbers));
// Output: { sum: 6, subarray: [4, -1, 2, 1], indices: { start: 3, end: 6 } }
