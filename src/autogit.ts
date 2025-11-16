function maxSubarraySum(arr: number[]): number {
    if (arr.length === 0) return 0;
    
    let maxEndingHere = arr[0];
    let maxSoFar = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        // Either extend the existing subarray or start a new one
        maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
        // Update the global maximum
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

// Example usage
const numbers = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubarraySum(numbers)); // Output: 6
interface SubarrayResult {
    start: number;
    end: number;
    sum: number;
    subarray: number[];
}

function maxSubarrayWithDetails(arr: number[]): SubarrayResult {
    if (arr.length === 0) {
        return { start: -1, end: -1, sum: 0, subarray: [] };
    }
    
    let maxEndingHere = arr[0];
    let maxSoFar = arr[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxEndingHere + arr[i]) {
            maxEndingHere = arr[i];
            tempStart = i;
        } else {
            maxEndingHere = maxEndingHere + arr[i];
        }
        
        if (maxEndingHere > maxSoFar) {
            maxSoFar = maxEndingHere;
            start = tempStart;
            end = i;
        }
    }
    
    return {
        start,
        end,
        sum: maxSoFar,
        subarray: arr.slice(start, end + 1)
    };
}

// Example usage
const numbers = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = maxSubarrayWithDetails(numbers);
console.log(result);
// Output: { start: 3, end: 6, sum: 6, subarray: [4, -1, 2, 1] }
function maxCrossingSum(arr: number[], left: number, mid: number, right: number): number {
    // Include elements on left of mid
    let sum = 0;
    let leftSum = -Infinity;
    for (let i = mid; i >= left; i--) {
        sum += arr[i];
        if (sum > leftSum) leftSum = sum;
    }
    
    // Include elements on right of mid
    sum = 0;
    let rightSum = -Infinity;
    for (let i = mid + 1; i <= right; i++) {
        sum += arr[i];
        if (sum > rightSum) rightSum = sum;
    }
    
    return leftSum + rightSum;
}

function maxSubarrayDivideConquer(arr: number[], left: number = 0, right: number = arr.length - 1): number {
    if (left === right) return arr[left];
    
    const mid = Math.floor((left + right) / 2);
    
    return Math.max(
        maxSubarrayDivideConquer(arr, left, mid),
        maxSubarrayDivideConquer(arr, mid + 1, right),
        maxCrossingSum(arr, left, mid, right)
    );
}

// Example usage
const numbers = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubarrayDivideConquer(numbers)); // Output: 6
function maxSubarrayBruteForce(arr: number[]): number {
    if (arr.length === 0) return 0;
    
    let maxSum = -Infinity;
    
    for (let i = 0; i < arr.length; i++) {
        let currentSum = 0;
        for (let j = i; j < arr.length; j++) {
            currentSum += arr[j];
            if (currentSum > maxSum) {
                maxSum = currentSum;
            }
        }
    }
    
    return maxSum;
}

// Example usage
const numbers = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubarrayBruteForce(numbers)); // Output: 6
class MaxSubarray {
    static find(arr: number[]): { sum: number; subarray: number[] } {
        if (arr.length === 0) {
            return { sum: 0, subarray: [] };
        }
        
        let maxSum = arr[0];
        let currentSum = arr[0];
        let start = 0;
        let tempStart = 0;
        let end = 0;
        
        for (let i = 1; i < arr.length; i++) {
            if (currentSum < 0) {
                currentSum = arr[i];
                tempStart = i;
            } else {
                currentSum += arr[i];
            }
            
            if (currentSum > maxSum) {
                maxSum = currentSum;
                start = tempStart;
                end = i;
            }
        }
        
        return {
            sum: maxSum,
            subarray: arr.slice(start, end + 1)
        };
    }
}

// Example usage
const testCases: number[][] = [
    [-2, 1, -3, 4, -1, 2, 1],
    [1, 2, 3],
    [-1, -2, -3],
    [5, -3, 4, -1, 2],
    []
];

testCases.forEach((testCase, index) => {
    const result = MaxSubarray.find(testCase);
    console.log(`Test ${index + 1}:`, result);
});
