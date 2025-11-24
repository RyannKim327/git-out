function findMedianSortedArraysBruteForce(nums1: number[], nums2: number[]): number {
    const m = nums1.length;
    const n = nums2.length;
    const merged: number[] = [];
    let i = 0; // Pointer for nums1
    let j = 0; // Pointer for nums2

    // Merge the two arrays
    while (i < m && j < n) {
        if (nums1[i] <= nums2[j]) {
            merged.push(nums1[i]);
            i++;
        } else {
            merged.push(nums2[j]);
            j++;
        }
    }

    // Add remaining elements from nums1
    while (i < m) {
        merged.push(nums1[i]);
        i++;
    }

    // Add remaining elements from nums2
    while (j < n) {
        merged.push(nums2[j]);
        j++;
    }

    const totalLength = merged.length;
    if (totalLength % 2 === 1) {
        // Odd number of elements
        return merged[Math.floor(totalLength / 2)];
    } else {
        // Even number of elements
        const mid1 = totalLength / 2 - 1;
        const mid2 = totalLength / 2;
        return (merged[mid1] + merged[mid2]) / 2;
    }
}

// Example Usage:
console.log("Brute Force:");
console.log(findMedianSortedArraysBruteForce([1, 3], [2]));       // Output: 2.0
console.log(findMedianSortedArraysBruteForce([1, 2], [3, 4]));     // Output: 2.5
console.log(findMedianSortedArraysBruteForce([], [1]));           // Output: 1.0
console.log(findMedianSortedArraysBruteForce([1], []));           // Output: 1.0
console.log(findMedianSortedArraysBruteForce([2, 2, 4, 4], [2, 2, 4, 4])); // Output: 3.0
function findMedianSortedArraysOptimizedSpace(nums1: number[], nums2: number[]): number {
    const m = nums1.length;
    const n = nums2.length;
    const totalLength = m + n;

    // We need to find the element(s) at these indices
    const medianIndex1 = Math.floor((totalLength - 1) / 2); // For odd totalLength, this is the median index
    const medianIndex2 = Math.floor(totalLength / 2);       // For even totalLength, this is the second median index

    let i = 0; // Pointer for nums1
    let j = 0; // Pointer for nums2
    let count = 0; // Current element count in the virtual merged array
    let median1 = 0; // Stores the element at medianIndex1
    let median2 = 0; // Stores the element at medianIndex2

    while (count <= medianIndex2) {
        let currentElement: number;

        if (i < m && (j >= n || nums1[i] <= nums2[j])) {
            currentElement = nums1[i];
            i++;
        } else {
            currentElement = nums2[j];
            j++;
        }

        if (count === medianIndex1) {
            median1 = currentElement;
        }
        if (count === medianIndex2) {
            median2 = currentElement;
        }
        count++;
    }

    if (totalLength % 2 === 1) {
        return median1; // Odd length, median is median1
    } else {
        return (median1 + median2) / 2; // Even length, average of median1 and median2
    }
}

// Example Usage:
console.log("\nOptimized Space:");
console.log(findMedianSortedArraysOptimizedSpace([1, 3], [2]));       // Output: 2.0
console.log(findMedianSortedArraysOptimizedSpace([1, 2], [3, 4]));     // Output: 2.5
console.log(findMedianSortedArraysOptimizedSpace([], [1]));           // Output: 1.0
console.log(findMedianSortedArraysOptimizedSpace([1], []));           // Output: 1.0
console.log(findMedianSortedArraysOptimizedSpace([2, 2, 4, 4], [2, 2, 4, 4])); // Output: 3.0
function findMedianSortedArraysOptimal(nums1: number[], nums2: number[]): number {
    // Ensure nums1 is the shorter array to optimize binary search range
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1]; // Swap arrays
    }

    const m = nums1.length;
    const n = nums2.length;
    let low = 0;
    let high = m; // Binary search range for partitionX (number of elements to the left of the cut in nums1)

    // halfLen represents the total number of elements in the left partition of the combined sorted array
    // The +1 handles both odd and even total lengths correctly for the left partition size.
    const halfLen = Math.floor((m + n + 1) / 2);

    while (low <= high) {
        const partitionX = Math.floor((low + high) / 2); // Cut point in nums1
        const partitionY = halfLen - partitionX;         // Cut point in nums2

        // Determine the values around the partitions:
        // - maxLeftX: largest element in the left part of nums1
        // - minRightX: smallest element in the right part of nums1
        // (Similar for Y in nums2)

        // Use Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER as sentinels
        // if a partition is at the beginning or end of an array.
        const maxLeftX = (partitionX === 0) ? Number.MIN_SAFE_INTEGER : nums1[partitionX - 1];
        const minRightX = (partitionX === m) ? Number.MAX_SAFE_INTEGER : nums1[partitionX];

        const maxLeftY = (partitionY === 0) ? Number.MIN_SAFE_INTEGER : nums2[partitionY - 1];
        const minRightY = (partitionY === n) ? Number.MAX_SAFE_INTEGER : nums2[partitionY];

        // Check if we found the correct partition:
        // (maxLeft of X <= minRight of Y) AND (maxLeft of Y <= minRight of X)
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            // Correct partition found!
            if ((m + n) % 2 === 1) {
                // Odd total length: median is the maximum of the left partition's largest elements
                return Math.max(maxLeftX, maxLeftY);
            } else {
                // Even total length: median is the average of the two middle elements
                // (max of left partition + min of right partition) / 2
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            }
        } else if (maxLeftX > minRightY) {
            // partitionX is too far right, move left in nums1
            high = partitionX - 1;
        } else { // maxLeftY > minRightX
            // partitionX is too far left, move right in nums1
            low = partitionX + 1;
        }
    }

    // This line should technically not be reached if inputs are valid sorted arrays,
    // as a solution always exists.
    throw new Error("Input arrays are not sorted or invalid state encountered.");
}

// Example Usage:
console.log("\nOptimal (Binary Search):");
console.log(findMedianSortedArraysOptimal([1, 3], [2]));       // Output: 2.0
console.log(findMedianSortedArraysOptimal([1, 2], [3, 4]));     // Output: 2.5
console.log(findMedianSortedArraysOptimal([], [1]));           // Output: 1.0
console.log(findMedianSortedArraysOptimal([1], []));           // Output: 1.0
console.log(findMedianSortedArraysOptimal([2, 2, 4, 4], [2, 2, 4, 4])); // Output: 3.0
console.log(findMedianSortedArraysOptimal([1, 3, 5, 7, 9], [2, 4, 6, 8, 10])); // Output: 5.5
console.log(findMedianSortedArraysOptimal([1, 2, 3], [4, 5, 6, 7])); // Output: 4.0
