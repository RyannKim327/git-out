function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Ensure nums1 is the shorter array to minimize binary search steps
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    const m = nums1.length;
    const n = nums2.length;
    const totalLength = m + n;
    const half = Math.floor((totalLength + 1) / 2); // Midpoint for left partition

    let low = 0;
    let high = m;

    while (low <= high) {
        const i = Math.floor((low + high) / 2); // Partition index in nums1
        const j = half - i; // Corresponding partition index in nums2

        // Handle edge cases where partition is at the start/end of arrays
        const aLeft = i === 0 ? -Infinity : nums1[i - 1];
        const aRight = i === m ? Infinity : nums1[i];
        const bLeft = j === 0 ? -Infinity : nums2[j - 1];
        const bRight = j === n ? Infinity : nums2[j];

        if (aLeft <= bRight && bLeft <= aRight) {
            // Correct partition found
            if (totalLength % 2 === 0) {
                // Even length: average of max left and min right
                const maxLeft = Math.max(aLeft, bLeft);
                const minRight = Math.min(aRight, bRight);
                return (maxLeft + minRight) / 2;
            } else {
                // Odd length: max of left partitions
                return Math.max(aLeft, bLeft);
            }
        } else if (aLeft > bRight) {
            // Move partition left in nums1
            high = i - 1;
        } else {
            // Move partition right in nums1
            low = i + 1;
        }
    }

    // Input arrays are sorted, so median always exists
    throw new Error("No solution found");
}
