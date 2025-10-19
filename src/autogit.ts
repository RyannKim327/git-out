function maxSubarraySum(arr: number[]): number {
    if (arr.length === 0) return 0;
    
    let maxCurrent = arr[0];
    let maxGlobal = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        maxCurrent = Math.max(arr[i], maxCurrent + arr[i]);
        maxGlobal = Math.max(maxGlobal, maxCurrent);
    }
    
    return maxGlobal;
}

// Example usage
const numbers = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubarraySum(numbers)); // Output: 6
function maxSubarrayWithIndices(arr: number[]): {
    maxSum: number;
    startIndex: number;
    endIndex: number;
    subarray: number[];
} {
    if (arr.length === 0) {
        return { maxSum: 0, startIndex: -1, endIndex: -1, subarray: [] };
    }
    
    let maxCurrent = arr[0];
    let maxGlobal = arr[0];
    let start = 0;
    let tempStart = 0;
    let end = 0;
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxCurrent + arr[i]) {
            maxCurrent = arr[i];
            tempStart = i;
        } else {
            maxCurrent += arr[i];
        }
        
        if (maxCurrent > maxGlobal) {
            maxGlobal = maxCurrent;
            start = tempStart;
            end = i;
        }
    }
    
    const subarray = arr.slice(start, end + 1);
    
    return {
        maxSum: maxGlobal,
        startIndex: start,
        endIndex: end,
        subarray: subarray
    };
}

// Example usage
const result = maxSubarrayWithIndices(numbers);
console.log(result);
// Output: { maxSum: 6, startIndex: 3, endIndex: 6, subarray: [4, -1, 2, 1] }
function maxSubarrayBruteForce(arr: number[]): number {
    let maxSum = -Infinity;
    
    for (let i = 0; i < arr.length; i++) {
        let currentSum = 0;
        for (let j = i; j < arr.length; j++) {
            currentSum += arr[j];
            maxSum = Math.max(maxSum, currentSum);
        }
    }
    
    return maxSum;
}
function maxSubarraySumSafe(arr: number[]): number {
    if (arr.length === 0) return 0;
    
    // Handle all negative numbers
    const allNegative = arr.every(num => num < 0);
    if (allNegative) {
        return Math.max(...arr);
    }
    
    // Handle all positive numbers
    const allPositive = arr.every(num => num > 0);
    if (allPositive) {
        return arr.reduce((sum, num) => sum + num, 0);
    }
    
    // Regular Kadane's algorithm for mixed arrays
    let maxCurrent = arr[0];
    let maxGlobal = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        maxCurrent = Math.max(arr[i], maxCurrent + arr[i]);
        maxGlobal = Math.max(maxGlobal, maxCurrent);
    }
    
    return maxGlobal;
}
class MaxSubarrayFinder {
    
    // Kadane's algorithm implementation
    static findMaxSum(arr: number[]): number {
        if (arr.length === 0) return 0;
        
        let maxCurrent = arr[0];
        let maxGlobal = arr[0];
        
        for (let i = 1; i < arr.length; i++) {
            maxCurrent = Math.max(arr[i], maxCurrent + arr[i]);
            maxGlobal = Math.max(maxGlobal, maxCurrent);
        }
        
        return maxGlobal;
    }
    
    // Find maximum sum with subarray indices
    static findMaxSubarray(arr: number[]): {
        sum: number;
        subarray: number[];
        indices: [number, number];
    } {
        if (arr.length === 0) {
            return { sum: 0, subarray: [], indices: [-1, -1] };
        }
        
        let maxCurrent = arr[0];
        let maxGlobal = arr[0];
        let start = 0;
        let tempStart = 0;
        let end = 0;
        
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > maxCurrent + arr[i]) {
                maxCurrent = arr[i];
                tempStart = i;
            } else {
                maxCurrent += arr[i];
            }
            
            if (maxCurrent > maxGlobal) {
                maxGlobal = maxCurrent;
                start = tempStart;
                end = i;
            }
        }
        
        return {
            sum: maxGlobal,
            subarray: arr.slice(start, end + 1),
            indices: [start, end]
        };
    }
}

// Test cases
const testCases = [
    [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    [1, 2, 3, -2, 5],
    [-1, -2, -3, -4],
    [5, -2, 3, -1, 2],
    []
];

testCases.forEach((testCase, index) => {
    console.log(`Test case ${index + 1}:`, testCase);
    console.log('Max sum:', MaxSubarrayFinder.findMaxSum(testCase));
    console.log('Max subarray:', MaxSubarrayFinder.findMaxSubarray(testCase));
    console.log('---');
});
