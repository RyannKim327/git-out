function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Ensure nums1 is the smaller array
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    const total = m + n;
    const half = Math.floor((total + 1) / 2);
    
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const i = Math.floor((left + right) / 2);
        const j = half - i;
        
        const nums1Left = i === 0 ? -Infinity : nums1[i - 1];
        const nums1Right = i === m ? Infinity : nums1[i];
        const nums2Left = j === 0 ? -Infinity : nums2[j - 1];
        const nums2Right = j === n ? Infinity : nums2[j];
        
        if (nums1Left <= nums2Right && nums2Left <= nums1Right) {
            // Partition is correct
            if (total % 2 === 0) {
                // Even total length
                return (Math.max(nums1Left, nums2Left) + Math.min(nums1Right, nums2Right)) / 2;
            } else {
                // Odd total length
                return Math.max(nums1Left, nums2Left);
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
const arr1 = [1, 3, 5];
const arr2 = [2, 4, 6];
console.log(findMedianSortedArrays(arr1, arr2)); // Output: 3.5
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
    
    // Find median
    const n = merged.length;
    if (n % 2 === 0) {
        return (merged[n / 2 - 1] + merged[n / 2]) / 2;
    } else {
        return merged[Math.floor(n / 2)];
    }
}

// Example usage
console.log(findMedianSortedArraysSimple(arr1, arr2)); // Output: 3.5
function findMedianSortedArraysOptimized(nums1: number[], nums2: number[]): number {
    const totalLength = nums1.length + nums2.length;
    const medianIndex = Math.floor(totalLength / 2);
    let isEven = totalLength % 2 === 0;
    
    let i = 0, j = 0;
    let current = 0, prev = 0;
    
    for (let count = 0; count <= medianIndex; count++) {
        prev = current;
        
        if (i < nums1.length && (j >= nums2.length || nums1[i] < nums2[j])) {
            current = nums1[i++];
        } else {
            current = nums2[j++];
        }
    }
    
    return isEven ? (prev + current) / 2 : current;
}

// Example usage
console.log(findMedianSortedArraysOptimized(arr1, arr2)); // Output: 3.5
function findMedianSortedArraysSafe(
    nums1: number[], 
    nums2: number[]
): number {
    // Input validation
    if (!Array.isArray(nums1) || !Array.isArray(nums2)) {
        throw new Error('Both inputs must be arrays');
    }
    
    if (nums1.some(isNaN) || nums2.some(isNaN)) {
        throw new Error('Arrays must contain only numbers');
    }
    
    // Handle empty arrays
    if (nums1.length === 0 && nums2.length === 0) {
        return 0;
    }
    
    // Use the efficient algorithm
    return findMedianSortedArrays(nums1, nums2);
}

// Test cases
const testCases = [
    { arr1: [1, 3], arr2: [2], expected: 2 },
    { arr1: [1, 2], arr2: [3, 4], expected: 2.5 },
    { arr1: [0, 0], arr2: [0, 0], expected: 0 },
    { arr1: [], arr2: [1], expected: 1 },
    { arr1: [2], arr2: [], expected: 2 }
];

testCases.forEach((test, i) => {
    const result = findMedianSortedArraysSafe(test.arr1, test.arr2);
    console.log(`Test ${i + 1}: ${result} (expected: ${test.expected})`);
});
