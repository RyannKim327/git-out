function maxSubArray(nums: number[]): number {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // Compare current element vs. current element + previous sum
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        
        // Update the global max
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    return maxSoFar;
}

// Example
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(arr)); // Output: 6  (from [4, -1, 2, 1])
function maxSubArrayWithIndices(nums: number[]): { sum: number, start: number, end: number } {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    let start = 0, end = 0, s = 0;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > maxEndingHere + nums[i]) {
            maxEndingHere = nums[i];
            s = i;
        } else {
            maxEndingHere += nums[i];
        }

        if (maxEndingHere > maxSoFar) {
            maxSoFar = maxEndingHere;
            start = s;
            end = i;
        }
    }

    return { sum: maxSoFar, start, end };
}

const arr2 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArrayWithIndices(arr2));
// { sum: 6, start: 3, end: 6 }
