function majorityElement(nums: number[]): number {
    let count = 0;
    let candidate: number | null = null;

    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    return candidate!;
}

// Example:
console.log(majorityElement([2,2,1,1,1,2,2])); // Output: 2
function majorityElementSafe(nums: number[]): number | null {
    let count = 0;
    let candidate: number | null = null;

    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    // Verify
    count = nums.filter(n => n === candidate).length;
    return count > nums.length / 2 ? candidate : null;
}

console.log(majorityElementSafe([3,3,4])); // null
