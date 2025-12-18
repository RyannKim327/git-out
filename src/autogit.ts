function majorityElement(nums: number[]): number | null {
    let candidate: number | null = null;
    let count = 0;

    // Step 1: Find candidate
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    // Step 2: Verify candidate
    if (candidate === null) return null;

    let actualCount = 0;
    for (const num of nums) {
        if (num === candidate) actualCount++;
    }

    return actualCount > Math.floor(nums.length / 2) ? candidate : null;
}

// Example usage:
const arr = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(arr)); // Output: 2
