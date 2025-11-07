function maxSubArray(nums: number[]): number {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];

    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    return maxSoFar;
}

// Example usage:
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(arr)); // Output: 6 (subarray: [4, -1, 2, 1])
function maxSubArrayWithIndices(nums: number[]): { sum: number; subarray: number[] } {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    let start = 0, end = 0, tempStart = 0;

    for (let i = 1; i < nums.length; i++) {
        if (maxEndingHere + nums[i] < nums[i]) {
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

    return {
        sum: maxSoFar,
        subarray: nums.slice(start, end + 1),
    };
}

// Example usage:
const result = maxSubArrayWithIndices([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log(result); // { sum: 6, subarray: [4, -1, 2, 1] }
