function maxSubarraySum(arr: number[]): [number, number[]] {
    if (arr.length === 0) return [0, []];
    
    let maxEndingHere = arr[0];
    let maxSoFar = arr[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;

    for (let i = 1; i < arr.length; i++) {
        if (maxEndingHere + arr[i] < arr[i]) {
            maxEndingHere = arr[i];
            tempStart = i;
        } else {
            maxEndingHere += arr[i];
        }

        if (maxSoFar < maxEndingHere) {
            maxSoFar = maxEndingHere;
            start = tempStart;
            end = i;
        }
    }

    const subarray = arr.slice(start, end + 1);
    return [maxSoFar, subarray];
}

// Example usage
const array = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const [maxSum, subarray] = maxSubarraySum(array);

console.log("Maximum sum:", maxSum); // 6
console.log("Subarray:", subarray); // [4, -1, 2, 1]
function maxSubarraySumSimple(arr: number[]): number {
    let maxCurrent = arr[0];
    let maxGlobal = arr[0];

    for (let i = 1; i < arr.length; i++) {
        maxCurrent = Math.max(arr[i], maxCurrent + arr[i]);
        maxGlobal = Math.max(maxGlobal, maxCurrent);
    }

    return maxGlobal;
}

// Example usage
console.log("Maximum sum:", maxSubarraySumSimple(array)); // 6
function maxSubarraySumSafe(arr: number[]): [number, number[]] {
    if (arr.length === 0) {
        return [0, []];
    }
    
    if (arr.length === 1) {
        return [arr[0], [arr[0]]];
    }

    // Rest of Kadane's algorithm implementation...
    return maxSubarraySum(arr); // Reuse the first implementation
}
interface MaxSubarrayResult {
    sum: number;
    subarray: number[];
    indices: [number, number];
}

function findMaxSubarray(arr: number[]): MaxSubarrayResult {
    if (!Array.isArray(arr)) {
        throw new Error("Input must be an array");
    }

    if (arr.length === 0) {
        return { sum: 0, subarray: [], indices: [0, 0] };
    }

    let maxCurrent = arr[0];
    let maxGlobal = arr[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;

    for (let i = 1; i < arr.length; i++) {
        if (maxCurrent + arr[i] < arr[i]) {
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

// Usage example
const result = findMaxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log(result);
// Output: { sum: 6, subarray: [4, -1, 2, 1], indices: [3, 6] }
