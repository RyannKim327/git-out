function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Ensure nums1 is the shorter array to optimize the binary search
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    const m = nums1.length;
    const n = nums2.length;
    const totalLength = m + n;

    // Handle empty arrays edge case
    if (totalLength === 0) return 0;

    const halfLength = Math.floor((totalLength + 1) / 2); // Midpoint of combined arrays

    let low = 0;
    let high = m;

    while (low <= high) {
        const partitionA = Math.floor((low + high) / 2); // Midpoint of nums1
        const partitionB = halfLength - partitionA;      // Corresponding midpoint in nums2

        // Get boundary values, handling edge cases where partitions are at the start/end of arrays
        const maxLeftA = (partitionA === 0) ? -Infinity : nums1[partitionA - 1];
        const minRightA = (partitionA === m) ? Infinity : nums1[partitionA];
        const maxLeftB = (partitionB === 0) ? -Infinity : nums2[partitionB - 1];
        const minRightB = (partitionB === n) ? Infinity : nums2[partitionB];

        // Check if current partitions divide the combined array into two balanced halves
        if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
            if (totalLength % 2 === 1) {
                // For odd total length, median is the middle element (max of left halves)
                return Math.max(maxLeftA, maxLeftB);
            } else {
                // For even length, median is average of the two middle elements
                return (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2;
            }
        } else if (maxLeftA > minRightB) {
            // Move partition left in nums1 if left element is too large
            high = partitionA - 1;
        } else {
            // Move partition right in nums1 if left element is too small
            low = partitionA + 1;
        }
    }

    // Fallback return (should not reach here for valid inputs)
    return 0;
}
