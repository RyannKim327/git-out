function majorityElement(nums: number[]): number {
    let candidate: number | null = null;
    let count = 0;

    // Phase 1: Find a candidate
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    // Phase 2: Verify the candidate
    count = 0;
    for (const num of nums) {
        if (num === candidate) {
            count++;
        }
    }

    // Check if the candidate is indeed the majority element
    if (count > nums.length / 2) {
        return candidate!;
    } else {
        throw new Error("No majority element found");
    }
}

// Example usage:
const nums = [3, 2, 3];
console.log(majorityElement(nums)); // Output: 3
