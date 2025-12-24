function maxSubarraySum(arr: number[]): { maxSum: number; subarray: number[] } {
    if (arr.length === 0) {
        return { maxSum: 0, subarray: [] };
    }

    let maxSum = arr[0];
    let currentSum = arr[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;

    for (let i = 1; i < arr.length; i++) {
        if (currentSum + arr[i] < arr[i]) {
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

    const subarray = arr.slice(start, end + 1);
    return { maxSum, subarray };
}

// Example usage:
const array = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = maxSubarraySum(array);
console.log(`Maximum sum: ${result.maxSum}`);
console.log(`Subarray: [${result.subarray.join(', ')}]`);
function maxSubarraySumSimple(arr: number[]): number {
    if (arr.length === 0) return 0;
    
    let maxSum = arr[0];
    let currentSum = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// Example usage:
const array2 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(`Maximum sum: ${maxSubarraySumSimple(array2)}`);
function maxSubarraySumBruteForce(arr: number[]): { maxSum: number; subarray: number[] } {
    if (arr.length === 0) {
        return { maxSum: 0, subarray: [] };
    }

    let maxSum = -Infinity;
    let startIndex = 0;
    let endIndex = 0;

    for (let i = 0; i < arr.length; i++) {
        let currentSum = 0;
        for (let j = i; j < arr.length; j++) {
            currentSum += arr[j];
            if (currentSum > maxSum) {
                maxSum = currentSum;
                startIndex = i;
                endIndex = j;
            }
        }
    }

    const subarray = arr.slice(startIndex, endIndex + 1);
    return { maxSum, subarray };
}

// Example usage:
const array3 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result3 = maxSubarraySumBruteForce(array3);
console.log(`Maximum sum: ${result3.maxSum}`);
console.log(`Subarray: [${result3.subarray.join(', ')}]`);
interface MaxSubarrayResult {
    maxSum: number;
    subarray: number[];
    startIndex: number;
    endIndex: number;
}

function maxSubarraySumWithInterface(arr: number[]): MaxSubarrayResult {
    if (arr.length === 0) {
        return { maxSum: 0, subarray: [], startIndex: -1, endIndex: -1 };
    }

    let maxSum = arr[0];
    let currentSum = arr[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;

    for (let i = 1; i < arr.length; i++) {
        if (currentSum + arr[i] < arr[i]) {
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

    const subarray = arr.slice(start, end + 1);
    return { maxSum, subarray, startIndex: start, endIndex: end };
}
Maximum sum: 6
Subarray: [4, -1, 2, 1]
