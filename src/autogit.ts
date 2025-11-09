function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Ensure nums1 is the smaller array
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    const totalLength = nums1.length + nums2.length;
    const halfLength = Math.floor((totalLength + 1) / 2);

    let low = 0;
    let high = nums1.length;

    while (low <= high) {
        const partitionX = Math.floor((low + high) / 2);
        const partitionY = halfLength - partitionX;

        const maxLeftX = (partitionX === 0) ? -Infinity : nums1[partitionX - 1];
        const minRightX = (partitionX === nums1.length) ? Infinity : nums1[partitionX];

        const maxLeftY = (partitionY === 0) ? -Infinity : nums2[partitionY - 1];
        const minRightY = (partitionY === nums2.length) ? Infinity : nums2[partitionY];

        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if (totalLength % 2 === 1) {
                return Math.max(maxLeftX, maxLeftY);
            } else {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            }
        } else if (maxLeftX > minRightY) {
            high = partitionX - 1;
        } else {
            low = partitionX + 1;
        }
    }

    throw new Error("Input arrays are not sorted or invalid.");
}

// Example usage:
// console.log(findMedianSortedArrays([1, 3], [2]));       // 2
// console.log(findMedianSortedArrays([1, 2], [3, 4]));    // 2.5
