function maxSubarraySum(arr: number[]): number {
    if (arr.length === 0) return 0;
    
    let maxCurrent = arr[0];
    let maxGlobal = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        maxCurrent = Math.max(arr[i], maxCurrent + arr[i]);
        if (maxCurrent > maxGlobal) {
            maxGlobal = maxCurrent;
        }
    }
    
    return maxGlobal;
}

// Example usage
const numbers = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubarraySum(numbers)); // Output: 6
interface MaxSubarrayResult {
    sum: number;
    startIndex: number;
    endIndex: number;
    subarray: number[];
}

function maxSubarray(arr: number[]): MaxSubarrayResult {
    if (arr.length === 0) {
        return { sum: 0, startIndex: -1, endIndex: -1, subarray: [] };
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
        sum: maxGlobal,
        startIndex: start,
        endIndex: end,
        subarray: subarray
    };
}

// Example usage
const numbers = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = maxSubarray(numbers);
console.log(result);
// Output: { sum: 6, startIndex: 3, endIndex: 6, subarray: [4, -1, 2, 1] }
function maxSubarraySumSafe(arr: number[]): number {
    if (arr.length === 0) return 0;
    
    // Handle case where all numbers are negative
    const allNegative = arr.every(num => num < 0);
    if (allNegative) {
        return Math.max(...arr);
    }
    
    let maxCurrent = 0;
    let maxGlobal = 0;
    
    for (const num of arr) {
        maxCurrent = Math.max(0, maxCurrent + num);
        maxGlobal = Math.max(maxGlobal, maxCurrent);
    }
    
    return maxGlobal;
}

// Example usage
console.log(maxSubarraySumSafe([-1, -2, -3])); // Output: -1
console.log(maxSubarraySumSafe([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6
function maxSubarraySumFunctional(arr: number[]): number {
    if (arr.length === 0) return 0;
    
    let maxCurrent = arr[0];
    
    return arr.slice(1).reduce((maxGlobal, current) => {
        maxCurrent = Math.max(current, maxCurrent + current);
        return Math.max(maxGlobal, maxCurrent);
    }, arr[0]);
}
// Test cases
const testCases = [
    [-2, 1, -3, 4, -1, 2, 1, -5, 4], // Expected: 6
    [1, 2, 3, 4, 5],                  // Expected: 15
    [-1, -2, -3],                     // Expected: -1
    [],                                // Expected: 0
    [5, -2, 3, -1, 2]                 // Expected: 7
];

testCases.forEach((testCase, index) => {
    console.log(`Test ${index + 1}:`, maxSubarraySum(testCase));
});
