function maxSubArray(nums: number[]): number {
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

// Example usage:
const arr1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(arr1)); // Output: 6 (subarray [4,-1,2,1])
interface MaxSubarrayResult {
    maxSum: number;
    startIndex: number;
    endIndex: number;
    subarray: number[];
}

function maxSubArrayWithIndices(nums: number[]): MaxSubarrayResult {
    if (nums.length === 0) {
        return { maxSum: 0, startIndex: -1, endIndex: -1, subarray: [] };
    }
    
    let maxSum = nums[0];
    let currentSum = nums[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (currentSum + nums[i] < nums[i]) {
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
    return { maxSum, startIndex: start, endIndex: end, subarray };
}

// Example usage:
const arr2 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = maxSubArrayWithIndices(arr2);
console.log(result);
// Output: { maxSum: 6, startIndex: 3, endIndex: 6, subarray: [4, -1, 2, 1] }
function maxSubArrayDivideAndConquer(nums: number[]): number {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    const mid = Math.floor(nums.length / 2);
    const left = nums.slice(0, mid);
    const right = nums.slice(mid);
    
    const leftMax = maxSubArrayDivideAndConquer(left);
    const rightMax = maxSubArrayDivideAndConquer(right);
    const crossMax = maxCrossingSubArray(nums, mid);
    
    return Math.max(leftMax, rightMax, crossMax);
}

function maxCrossingSubArray(nums: number[], mid: number): number {
    let leftSum = -Infinity;
    let sum = 0;
    
    // Find max sum in left half including mid element
    for (let i = mid - 1; i >= 0; i--) {
        sum += nums[i];
        leftSum = Math.max(leftSum, sum);
    }
    
    let rightSum = -Infinity;
    sum = 0;
    
    // Find max sum in right half starting from mid+1
    for (let i = mid; i < nums.length; i++) {
        sum += nums[i];
        rightSum = Math.max(rightSum, sum);
    }
    
    return leftSum + rightSum;
}
function maxSubArrayRobust(nums: number[]): number {
    if (!nums || nums.length === 0) {
        throw new Error("Array must not be empty");
    }
    
    if (nums.length === 1) {
        return nums[0];
    }
    
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Reset if current number is larger than current sum + current number
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}
function maxSubArrayGeneric<T extends number>(arr: T[]): number {
    if (arr.length === 0) return 0;
    
    let maxSum = arr[0];
    let currentSum = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}
