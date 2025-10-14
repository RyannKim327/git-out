function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const m = nums1.length;
    const n = nums2.length;
    
    // Ensure nums1 is the smaller array
    if (m > n) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    const totalLength = m + n;
    const half = Math.floor((totalLength + 1) / 2);
    
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const i = Math.floor((left + right) / 2); // Partition point for nums1
        const j = half - i; // Partition point for nums2
        
        const nums1Left = i === 0 ? -Infinity : nums1[i - 1];
        const nums1Right = i === m ? Infinity : nums1[i];
        const nums2Left = j === 0 ? -Infinity : nums2[j - 1];
        const nums2Right = j === n ? Infinity : nums2[j];
        
        if (nums1Left <= nums2Right && nums2Left <= nums1Right) {
            // Found correct partition
            if (totalLength % 2 === 1) {
                return Math.max(nums1Left, nums2Left);
            } else {
                return (Math.max(nums1Left, nums2Left) + Math.min(nums1Right, nums2Right)) / 2;
            }
        } else if (nums1Left > nums2Right) {
            right = i - 1;
        } else {
            left = i + 1;
        }
    }
    
    throw new Error("Input arrays are not sorted");
}

// Example usage
const arr1 = [1, 3];
const arr2 = [2];
console.log(findMedianSortedArrays(arr1, arr2)); // Output: 2

const arr3 = [1, 2];
const arr4 = [3, 4];
console.log(findMedianSortedArrays(arr3, arr4)); // Output: 2.5
function findMedianSortedArraysSimple(nums1: number[], nums2: number[]): number {
    const merged: number[] = [];
    let i = 0, j = 0;
    
    // Merge the two arrays
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] < nums2[j]) {
            merged.push(nums1[i++]);
        } else {
            merged.push(nums2[j++]);
        }
    }
    
    // Add remaining elements
    while (i < nums1.length) merged.push(nums1[i++]);
    while (j < nums2.length) merged.push(nums2[j++]);
    
    const length = merged.length;
    const mid = Math.floor(length / 2);
    
    if (length % 2 === 0) {
        return (merged[mid - 1] + merged[mid]) / 2;
    } else {
        return merged[mid];
    }
}

// Example usage
console.log(findMedianSortedArraysSimple([1, 3], [2])); // Output: 2
console.log(findMedianSortedArraysSimple([1, 2], [3, 4])); // Output: 2.5
function findMedianSortedArrays(
    nums1: number[], 
    nums2: number[]
): number {
    // Implementation from Method 1
    // ...
}

// Optional: Add input validation
function findMedianSortedArraysWithValidation(
    nums1: number[], 
    nums2: number[]
): number {
    if (!Array.isArray(nums1) || !Array.isArray(nums2)) {
        throw new Error("Both inputs must be arrays");
    }
    
    if (nums1.some(isNaN) || nums2.some(isNaN)) {
        throw new Error("Arrays must contain only numbers");
    }
    
    return findMedianSortedArrays(nums1, nums2);
}
