function findMajorityElement(nums: number[]): number | null {
    // Edge case: Empty array
    if (nums.length === 0) return null;

    let candidate: number | null = null;
    let count = 0;

    // First pass: Find potential candidate
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    // Second pass: Validate candidate
    count = 0;
    for (const num of nums) {
        if (num === candidate) {
            count++;
        }
    }

    // Check if candidate is majority element
    return (count > nums.length / 2) ? candidate : null;
}
console.log(findMajorityElement([3, 2, 3]));          // Output: 3
console.log(findMajorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2
console.log(findMajorityElement([1, 2, 3]));          // Output: null
