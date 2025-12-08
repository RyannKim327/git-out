function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    let merged: number[] = [];
    let i = 0, j = 0;

    // Merge arrays until we've passed the median index
    while (merged.length <= (nums1.length + nums2.length) / 2) {
        if (i < nums1.length && (j >= nums2.length || nums1[i] < nums2[j])) {
            merged.push(nums1[i++]);
        } else {
            merged.push(nums2[j++]);
        }
    }

    const total = nums1.length + nums2.length;
    // If total length is odd, median is the middle element
    if (total % 2 === 1) {
        return merged[Math.floor(total / 2)];
    } else { // Even, so take average of two middle elements
        const mid1 = merged[Math.floor(total / 2) - 1];
        const mid2 = merged[Math.floor(total / 2)];
        return (mid1 + mid2) / 2;
    }
}

// Example usage:
console.log(findMedianSortedArrays([1, 3], [2])); // Output: 2
console.log(findMedianSortedArrays([1, 2], [3, 4])); // Output: 2.5
