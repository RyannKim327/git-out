function maxSubarraySum(arr: number[]): { maxSum: number; subarray: number[] } {
    if (arr.length === 0) {
        return { maxSum: 0, subarray: [] };
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
            maxEndingHere += arr[i];
        }

        if (maxEndingHere > maxSoFar) {
            maxSoFar = maxEndingHere;
            start = tempStart;
            end = i;
        }
    }

    const subarray = arr.slice(start, end + 1);
    return { maxSum: maxSoFar, subarray };
}

// Example usage
const array = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = maxSubarraySum(array);
console.log(`Maximum sum: ${result.maxSum}`);
console.log(`Subarray: [${result.subarray.join(', ')}]`);
function maxSubarraySumSimple(arr: number[]): number {
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
console.log(`Maximum subarray sum: ${maxSubarraySumSimple(numbers)}`); // Output: 6
function maxSubarraySumBruteForce(arr: number[]): { maxSum: number; subarray: number[] } {
    if (arr.length === 0) {
        return { maxSum: 0, subarray: [] };
    }

    let maxSum = -Infinity;
    let bestStart = 0;
    let bestEnd = 0;

    for (let i = 0; i < arr.length; i++) {
        let currentSum = 0;
        for (let j = i; j < arr.length; j++) {
            currentSum += arr[j];
            if (currentSum > maxSum) {
                maxSum = currentSum;
                bestStart = i;
                bestEnd = j;
            }
        }
    }

    const subarray = arr.slice(bestStart, bestEnd + 1);
    return { maxSum, subarray };
}
