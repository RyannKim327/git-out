function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
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
    
    const n = merged.length;
    
    // Find median
    if (n % 2 === 0) {
        return (merged[Math.floor(n / 2) - 1] + merged[Math.floor(n / 2)]) / 2;
    } else {
        return merged[Math.floor(n / 2)];
    }
}

// Example usage
const arr1 = [1, 3, 5];
const arr2 = [2, 4, 6];
console.log(findMedianSortedArrays(arr1, arr2)); // Output: 3.5
function findMedianSortedArraysOptimized(nums1: number[], nums2: number[]): number {
    // Ensure nums1 is the smaller array
    if (nums1.length > nums2.length) {
        return findMedianSortedArraysOptimized(nums2, nums1);
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let low = 0;
    let high = m;
    
    while (low <= high) {
        const partitionX = Math.floor((low + high) / 2);
        const partitionY = Math.floor((m + n + 1) / 2) - partitionX;
        
        const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minRightX = partitionX === m ? Infinity : nums1[partitionX];
        
        const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minRightY = partitionY === n ? Infinity : nums2[partitionY];
        
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            // Found the correct partition
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            high = partitionX - 1;
        } else {
            low = partitionX + 1;
        }
    }
    
    throw new Error("Input arrays are not sorted");
}

// Example usage
console.log(findMedianSortedArraysOptimized(arr1, arr2)); // Output: 3.5
function findMedianSortedArraysSimple(nums1: number[], nums2: number[]): number {
    const merged = [...nums1, ...nums2].sort((a, b) => a - b);
    const n = merged.length;
    
    if (n % 2 === 0) {
        return (merged[n / 2 - 1] + merged[n / 2]) / 2;
    } else {
        return merged[Math.floor(n / 2)];
    }
}
class MedianFinder {
    // Method 1: Simple merge approach
    static findMedianSortedArrays(nums1: number[], nums2: number[]): number {
        const merged: number[] = [];
        let i = 0, j = 0;
        
        while (i < nums1.length && j < nums2.length) {
            if (nums1[i] < nums2[j]) {
                merged.push(nums1[i++]);
            } else {
                merged.push(nums2[j++]);
            }
        }
        
        while (i < nums1.length) merged.push(nums1[i++]);
        while (j < nums2.length) merged.push(nums2[j++]);
        
        const n = merged.length;
        
        if (n % 2 === 0) {
            return (merged[Math.floor(n / 2) - 1] + merged[Math.floor(n / 2)]) / 2;
        } else {
            return merged[Math.floor(n / 2)];
        }
    }

    // Method 2: Optimized binary search approach
    static findMedianSortedArraysOptimized(nums1: number[], nums2: number[]): number {
        if (nums1.length > nums2.length) {
            return this.findMedianSortedArraysOptimized(nums2, nums1);
        }
        
        const m = nums1.length;
        const n = nums2.length;
        let low = 0;
        let high = m;
        
        while (low <= high) {
            const partitionX = Math.floor((low + high) / 2);
            const partitionY = Math.floor((m + n + 1) / 2) - partitionX;
            
            const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
            const minRightX = partitionX === m ? Infinity : nums1[partitionX];
            
            const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
            const minRightY = partitionY === n ? Infinity : nums2[partitionY];
            
            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                if ((m + n) % 2 === 0) {
                    return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
                } else {
                    return Math.max(maxLeftX, maxLeftY);
                }
            } else if (maxLeftX > minRightY) {
                high = partitionX - 1;
            } else {
                low = partitionX + 1;
            }
        }
        
        throw new Error("Input arrays are not sorted");
    }
}

// Test cases
const testCases: [number[], number[], number][] = [
    [[1, 3], [2], 2],
    [[1, 2], [3, 4], 2.5],
    [[0, 0], [0, 0], 0],
    [[], [1], 1],
    [[2], [], 2],
    [[1, 3, 5], [2, 4, 6], 3.5]
];

// Run tests
testCases.forEach(([arr1, arr2, expected], index) => {
    const result1 = MedianFinder.findMedianSortedArrays(arr1, arr2);
    const result2 = MedianFinder.findMedianSortedArraysOptimized(arr1, arr2);
    
    console.log(`Test ${index + 1}:`);
    console.log(`Array 1: [${arr1}], Array 2: [${arr2}]`);
    console.log(`Expected: ${expected}`);
    console.log(`Method 1: ${result1}, ${result1 === expected ? '✓' : '✗'}`);
    console.log(`Method 2: ${result2}, ${result2 === expected ? '✓' : '✗'}`);
    console.log('---');
});
