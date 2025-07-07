function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Ensure nums1 is the smaller array
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    const x = nums1.length;
    const y = nums2.length;
    let low = 0;
    let high = x;

    while (low <= high) {
        const partitionX = Math.floor((low + high) / 2);
        const partitionY = Math.floor((x + y + 1) / 2) - partitionX;

        // If partitionX is 0 it means nothing is there on left side. Use -Infinity for maxLeftX
        // If partitionX is length of input then there is nothing on right side. Use +Infinity for minRightX
        const maxLeftX = partitionX === 0 ? Number.NEGATIVE_INFINITY : nums1[partitionX - 1];
        const minRightX = partitionX === x ? Number.POSITIVE_INFINITY : nums1[partitionX];

        const maxLeftY = partitionY === 0 ? Number.NEGATIVE_INFINITY : nums2[partitionY - 1];
        const minRightY = partitionY === y ? Number.POSITIVE_INFINITY : nums2[partitionY];

        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            // We have partitioned array at the correct place
            if ((x + y) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            // We are too far on right side for partitionX. Go on left side.
            high = partitionX - 1;
        } else {
            // We are too far on left side for partitionX. Go on right side.
            low = partitionX + 1;
        }
    }

    throw new Error("Input arrays are not sorted or invalid.");
}

// Example usage
const nums1 = [1, 3];
const nums2 = [2];
console.log(findMedianSortedArrays(nums1, nums2)); // Output: 2

const nums3 = [1, 2];
const nums4 = [3, 4];
console.log(findMedianSortedArrays(nums3, nums4)); // Output: 2.5
