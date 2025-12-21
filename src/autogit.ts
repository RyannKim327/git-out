function maxSubArray(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    let maxEndingHere = nums[0];
    let maxSoFar = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Either extend the existing subarray or start a new one
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

// Example usage:
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(arr)); // Output: 6 (subarray [4, -1, 2, 1])
function maxSubArrayWithIndices(nums: number[]): {
    maxSum: number;
    startIndex: number;
    endIndex: number;
} {
    if (nums.length === 0) {
        return { maxSum: 0, startIndex: -1, endIndex: -1 };
    }
    
    let maxEndingHere = nums[0];
    let maxSoFar = nums[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > maxEndingHere + nums[i]) {
            maxEndingHere = nums[i];
            tempStart = i;
        } else {
            maxEndingHere += nums[i];
        }
        
        if (maxEndingHere > maxSoFar) {
            maxSoFar = maxEndingHere;
            start = tempStart;
            end = i;
        }
    }
    
    return { maxSum: maxSoFar, startIndex: start, endIndex: end };
}

// Example usage:
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = maxSubArrayWithIndices(arr);
console.log(result); // { maxSum: 6, startIndex: 3, endIndex: 6 }
console.log(arr.slice(result.startIndex, result.endIndex + 1)); // [4, -1, 2, 1]
function maxSubArrayDivideConquer(nums: number[]): number {
    return maxSubArrayHelper(nums, 0, nums.length - 1);
}

function maxSubArrayHelper(nums: number[], left: number, right: number): number {
    if (left === right) return nums[left];
    
    const mid = Math.floor((left + right) / 2);
    
    // Find max subarray in left half, right half, and crossing the midpoint
    const leftMax = maxSubArrayHelper(nums, left, mid);
    const rightMax = maxSubArrayHelper(nums, mid + 1, right);
    const crossMax = maxCrossingSubarray(nums, left, mid, right);
    
    return Math.max(leftMax, rightMax, crossMax);
}

function maxCrossingSubarray(nums: number[], left: number, mid: number, right: number): number {
    let leftSum = -Infinity;
    let sum = 0;
    
    // Max sum from mid to left
    for (let i = mid; i >= left; i--) {
        sum += nums[i];
        leftSum = Math.max(leftSum, sum);
    }
    
    let rightSum = -Infinity;
    sum = 0;
    
    // Max sum from mid+1 to right
    for (let i = mid + 1; i <= right; i++) {
        sum += nums[i];
        rightSum = Math.max(rightSum, sum);
    }
    
    return leftSum + rightSum;
}
function maxSubArrayBruteForce(nums: number[]): number {
    let maxSum = -Infinity;
    
    for (let i = 0; i < nums.length; i++) {
        let currentSum = 0;
        for (let j = i; j < nums.length; j++) {
            currentSum += nums[j];
            maxSum = Math.max(maxSum, currentSum);
        }
    }
    
    return maxSum;
}
function findMaxSubarray(arr: number[]): number {
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    
    if (arr.length === 0) {
        return 0;
    }
    
    if (!arr.every(num => typeof num === 'number')) {
        throw new Error('Array must contain only numbers');
    }
    
    return maxSubArray(arr);
}
