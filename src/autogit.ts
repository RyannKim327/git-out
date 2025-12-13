function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Ensure nums1 is the smaller array for optimization
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    const totalLength = m + n;
    const isEven = totalLength % 2 === 0;
    
    let low = 0;
    let high = m;
    
    while (low <= high) {
        const partition1 = Math.floor((low + high) / 2);
        const partition2 = Math.floor((totalLength + 1) / 2) - partition1;
        
        // Handle edge cases for boundaries
        const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
        const minRight1 = partition1 === m ? Infinity : nums1[partition1];
        
        const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
        const minRight2 = partition2 === n ? Infinity : nums2[partition2];
        
        // Check if we found the correct partition
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if (isEven) {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            } else {
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            high = partition1 - 1;
        } else {
            low = partition1 + 1;
        }
    }
    
    throw new Error("Input arrays are not sorted");
}

// Example usage:
const nums1 = [1, 3];
const nums2 = [2];
console.log(findMedianSortedArrays(nums1, nums2)); // Output: 2

const nums3 = [1, 2];
const nums4 = [3, 4];
console.log(findMedianSortedArrays(nums3, nums4)); // Output: 2.5
function findMedianSortedArraysSimple(nums1: number[], nums2: number[]): number {
    const merged: number[] = [];
    let i = 0, j = 0;
    
    // Merge the two sorted arrays
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] < nums2[j]) {
            merged.push(nums1[i]);
            i++;
        } else {
            merged.push(nums2[j]);
            j++;
        }
    }
    
    // Add remaining elements
    while (i < nums1.length) {
        merged.push(nums1[i]);
        i++;
    }
    
    while (j < nums2.length) {
        merged.push(nums2[j]);
        j++;
    }
    
    // Find median
    const mid = Math.floor(merged.length / 2);
    
    if (merged.length % 2 === 0) {
        return (merged[mid - 1] + merged[mid]) / 2;
    } else {
        return merged[mid];
    }
}
