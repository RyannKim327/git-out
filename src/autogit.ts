function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Ensure nums1 is the smaller array
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let left = 0;
    let right = m;
    
    // We need to find the partition such that:
    // left part of nums1 + left part of nums2 = right part of nums1 + right part of nums2
    // And max(left) <= min(right)
    
    while (left <= right) {
        const partitionX = Math.floor((left + right) / 2);
        const partitionY = Math.floor((m + n + 1) / 2) - partitionX;
        
        // Get the rightmost element of left part and leftmost of right part
        const maxLeftX = partitionX === 0 ? Number.NEGATIVE_INFINITY : nums1[partitionX - 1];
        const minRightX = partitionX === m ? Number.POSITIVE_INFINITY : nums1[partitionX];
        
        const maxLeftY = partitionY === 0 ? Number.NEGATIVE_INFINITY : nums2[partitionY - 1];
        const minRightY = partitionY === n ? Number.POSITIVE_INFINITY : nums2[partitionY];
        
        // Check if we found the correct partition
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            // If total length is even, median is average of two middle elements
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            } else {
                // If total length is odd, median is the middle element
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            // Move partition X to the left
            right = partitionX - 1;
        } else {
            // Move partition X to the right
            left = partitionX + 1;
        }
    }
    
    throw new Error("Input arrays are not sorted");
}

// Example usage and tests
console.log(findMedianSortedArrays([1, 3], [2])); // 2.0
console.log(findMedianSortedArrays([1, 2], [3, 4])); // 2.5
console.log(findMedianSortedArrays([0, 0], [0, 0])); // 0.0
console.log(findMedianSortedArrays([], [1])); // 1.0
console.log(findMedianSortedArrays([2], [])); // 2.0
function findMedianSortedArraysSimple(nums1: number[], nums2: number[]): number {
    const merged = [...nums1, ...nums2].sort((a, b) => a - b);
    const totalLength = merged.length;
    const mid = Math.floor(totalLength / 2);
    
    if (totalLength % 2 === 0) {
        return (merged[mid - 1] + merged[mid]) / 2;
    }
    
    return merged[mid];
}
