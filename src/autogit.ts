function maxSubArray(nums: number[]): number {
    if (nums.length === 0) return 0;

    let maxCurrent = nums[0];
    let maxGlobal = nums[0];

    for (let i = 1; i < nums.length; i++) {
        maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
        maxGlobal = Math.max(maxGlobal, maxCurrent);
    }

    return maxGlobal;
}

// Example usage:
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(arr)); // Output: 6 (subarray: [4, -1, 2, 1])
function maxSubArrayWithIndices(nums: number[]): { sum: number; subarray: number[] } {
    if (nums.length === 0) return { sum: 0, subarray: [] };

    let maxCurrent = nums[0];
    let maxGlobal = nums[0];
    let start = 0, end = 0, tempStart = 0;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > maxCurrent + nums[i]) {
            maxCurrent = nums[i];
            tempStart = i;
        } else {
            maxCurrent += nums[i];
        }

        if (maxCurrent > maxGlobal) {
            maxGlobal = maxCurrent;
            start = tempStart;
            end = i;
        }
    }

    return {
        sum: maxGlobal,
        subarray: nums.slice(start, end + 1),
    };
}

// Example usage:
const result = maxSubArrayWithIndices([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log(result); // { sum: 6, subarray: [4, -1, 2, 1] }
