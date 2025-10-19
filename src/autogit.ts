function maxSubArraySum(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    let maxCurrent = nums[0];
    let maxGlobal = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Either include the current element in a new subarray
        // or extend the previous subarray
        maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
        
        // Update the global maximum if current is larger
        if (maxCurrent > maxGlobal) {
            maxGlobal = maxCurrent;
        }
    }
    
    return maxGlobal;
}

// Example usage
const arr1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArraySum(arr1)); // Output: 6 (subarray [4, -1, 2, 1])

const arr2 = [1];
console.log(maxSubArraySum(arr2)); // Output: 1

const arr3 = [-1];
console.log(maxSubArraySum(arr3)); // Output: -1
interface MaxSubarrayResult {
    sum: number;
    startIndex: number;
    endIndex: number;
}

function findMaxSubarray(nums: number[]): MaxSubarrayResult {
    if (nums.length === 0) {
        return { sum: 0, startIndex: 0, endIndex: -1 };
    }
    
    let maxCurrent = nums[0];
    let maxGlobal = nums[0];
    let currentStart = 0;
    let bestStart = 0;
    let bestEnd = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > maxCurrent + nums[i]) {
            // Start a new subarray
            maxCurrent = nums[i];
            currentStart = i;
        } else {
            // Extend the current subarray
            maxCurrent += nums[i];
        }
        
        if (maxCurrent > maxGlobal) {
            maxGlobal = maxCurrent;
            bestStart = currentStart;
            bestEnd = i;
        }
    }
    
    return {
        sum: maxGlobal,
        startIndex: bestStart,
        endIndex: bestEnd
    };
}

// Example usage
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = findMaxSubarray(arr);
console.log(result); 
// Output: { sum: 6, startIndex: 3, endIndex: 6 }
// Subarray: [4, -1, 2, 1]
function maxSubArrayBruteForce(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    let maxSum = nums[0];
    
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
