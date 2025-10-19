function maxSubarraySum(arr: number[]): number {
    if (arr.length === 0) return 0;
    
    let maxCurrent = arr[0];
    let maxGlobal = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        // Choose between extending current subarray or starting fresh
        maxCurrent = Math.max(arr[i], maxCurrent + arr[i]);
        
        // Update global maximum if current is larger
        if (maxCurrent > maxGlobal) {
            maxGlobal = maxCurrent;
        }
    }
    
    return maxGlobal;
}

// Example usage:
const numbers = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubarraySum(numbers)); // Output: 6 (subarray [4, -1, 2, 1])
function maxSubarrayWithIndices(arr: number[]): { sum: number; subarray: number[] } {
    if (arr.length === 0) return { sum: 0, subarray: [] };
    
    let maxCurrent = arr[0];
    let maxGlobal = arr[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;
    
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
    return { sum: maxGlobal, subarray };
}

// Example usage:
const result = maxSubarrayWithIndices([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log(result); // { sum: 6, subarray: [4, -1, 2, 1] }
function maxSubarraySumNonEmpty(arr: number[]): number {
    if (arr.length === 0) return 0;
    
    let maxCurrent = arr[0];
    let maxGlobal = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        maxCurrent = Math.max(arr[i], maxCurrent + arr[i]);
        maxGlobal = Math.max(maxGlobal, maxCurrent);
    }
    
    return Math.max(maxGlobal, 0); // Returns 0 if all negative
}

// Example usage:
console.log(maxSubarraySumNonEmpty([-1, -2, -3])); // Output: 0
interface MaxSubarrayResult {
    sum: number;
    subarray: number[];
    startIndex: number;
    endIndex: number;
}

function findMaxSubarray(arr: number[]): MaxSubarrayResult {
    if (arr.length === 0) {
        return { sum: 0, subarray: [], startIndex: -1, endIndex: -1 };
    }
    
    let maxCurrent = arr[0];
    let maxGlobal = arr[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;
    
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
        startIndex: start,
        endIndex: end
    };
}

// Usage example:
const testArray = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = findMaxSubarray(testArray);

console.log(`Maximum sum: ${result.sum}`);
console.log(`Subarray: [${result.subarray.join(', ')}]`);
console.log(`Indices: ${result.startIndex} to ${result.endIndex}`);
