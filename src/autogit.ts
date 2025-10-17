function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const merged: number[] = [];
    let i = 0, j = 0;
    
    // Merge the two sorted arrays
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            merged.push(nums1[i++]);
        } else {
            merged.push(nums2[j++]);
        }
    }
    
    // Add remaining elements
    while (i < nums1.length) merged.push(nums1[i++]);
    while (j < nums2.length) merged.push(nums2[j++]);
    
    const n = merged.length;
    
    if (n % 2 === 0) {
        return (merged[n / 2 - 1] + merged[n / 2]) / 2;
    } else {
        return merged[Math.floor(n / 2)];
    }
}
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Ensure nums1 is the smaller array
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let left = 0, right = m;
    
    while (left <= right) {
        const partition1 = Math.floor((left + right) / 2);
        const partition2 = Math.floor((m + n + 1) / 2) - partition1;
        
        const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
        const minRight1 = partition1 === m ? Infinity : nums1[partition1];
        
        const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
        const minRight2 = partition2 === n ? Infinity : nums2[partition2];
        
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            // Found the correct partition
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            } else {
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            right = partition1 - 1;
        } else {
            left = partition1 + 1;
        }
    }
    
    throw new Error("Input arrays are not sorted");
}
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const totalLength = nums1.length + nums2.length;
    const medianPos = Math.floor(totalLength / 2);
    let i = 0, j = 0;
    let current = 0, prev = 0;
    
    for (let count = 0; count <= medianPos; count++) {
        prev = current;
        
        if (i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])) {
            current = nums1[i++];
        } else {
            current = nums2[j++];
        }
    }
    
    return totalLength % 2 === 0 ? (prev + current) / 2 : current;
}
// Example usage
const nums1 = [1, 3];
const nums2 = [2];
const nums3 = [1, 2];
const nums4 = [3, 4];

console.log(findMedianSortedArrays(nums1, nums2)); // Output: 2
console.log(findMedianSortedArrays(nums3, nums4)); // Output: 2.5
