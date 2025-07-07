function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const len1 = nums1.length;
    const len2 = nums2.length;

    // Ensure nums1 is the smaller array
    if (len1 > len2) {
        [nums1, nums2] = [nums2, nums1];
    }

    const totalLen = len1 + len2;
    let left = 0;
    let right = len1;

    while (left <= right) {
        const partition1 = Math.floor((left + right) / 2);
        const partition2 = Math.floor((totalLen + 1) / 2) - partition1;

        const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
        const minRight1 = partition1 === len1 ? Infinity : nums1[partition1];

        const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
        const minRight2 = partition2 === len2 ? Infinity : nums2[partition2];

        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            // We have partitioned the arrays correctly
            if (totalLen % 2 === 0) {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            } else {
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            // Move towards the left in nums1
            right = partition1 - 1;
        } else {
            // Move towards the right in nums1
            left = partition1 + 1;
        }
    }

    throw new Error("Input arrays are not sorted.");
}

// Example usage:
const nums1 = [1, 3];
const nums2 = [2];
console.log(findMedianSortedArrays(nums1, nums2)); // Output: 2

const nums3 = [1, 2];
const nums4 = [3, 4];
console.log(findMedianSortedArrays(nums3, nums4)); // Output: 2.5
