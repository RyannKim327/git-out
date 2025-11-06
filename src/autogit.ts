function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Ensure nums1 is the shorter array to optimize the binary search range
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1]; // Swap arrays
    }

    const m = nums1.length;
    const n = nums2.length;
    const totalLength = m + n;

    // We need 'halfLen' elements in the left partition (combined from both arrays)
    // The '+1' ensures that for odd totalLength, halfLen points to the median element.
    const halfLen = Math.floor((totalLength + 1) / 2);

    let low = 0;
    let high = m; // Binary search range for partitionX (number of elements taken from nums1)

    while (low <= high) {
        // partitionX is the cut point for nums1
        // It means 'partitionX' elements are taken from nums1 for the left partition.
        const partitionX = Math.floor((low + high) / 2);

        // partitionY is the cut point for nums2
        // It means 'partitionY' elements are taken from nums2 for the left partition.
        const partitionY = halfLen - partitionX;

        // Determine the values at the boundaries of the partitions
        // If a partition is empty (partitionX or partitionY is 0), use -Infinity for maxLeft
        // If a partition includes all elements (partitionX or partitionY is m or n), use Infinity for minRight
        const maxLeftX = (partitionX === 0) ? -Infinity : nums1[partitionX - 1];
        const minRightX = (partitionX === m) ? Infinity : nums1[partitionX];

        const maxLeftY = (partitionY === 0) ? -Infinity : nums2[partitionY - 1];
        const minRightY = (partitionY === n) ? Infinity : nums2[partitionY];

        // Check if we found the correct partition
        // Conditions:
        // 1. maxLeftX <= minRightY (Largest element in nums1's left part <= Smallest in nums2's right part)
        // 2. maxLeftY <= minRightX (Largest element in nums2's left part <= Smallest in nums1's right part)
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            // Correct partition found!
            if (totalLength % 2 === 1) {
                // Odd number of elements, the median is the maximum of the left partition
                return Math.max(maxLeftX, maxLeftY);
            } else {
                // Even number of elements, the median is the average of the maximum of the left partition
                // and the minimum of the right partition.
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            }
        } else if (maxLeftX > minRightY) {
            // maxLeftX is too large, meaning partitionX (cut in nums1) is too far to the right.
            // We need to move partitionX to the left.
            high = partitionX - 1;
        } else { // maxLeftY > minRightX
            // maxLeftY is too large, meaning partitionX (cut in nums1) is too far to the left.
            // We need to move partitionX to the right.
            low = partitionX + 1;
        }
    }

    // This line should theoretically not be reached if inputs are valid sorted arrays.
    // It's a safeguard for type-checking completeness or unexpected scenarios.
    throw new Error("Could not find median. Ensure arrays are sorted and valid.");
}

// --- Test Cases ---
console.log(findMedianSortedArrays([1, 3], [2])); // Expected: 2.0
console.log(findMedianSortedArrays([1, 2], [3, 4])); // Expected: 2.5
console.log(findMedianSortedArrays([0, 0], [0, 0])); // Expected: 0.0
console.log(findMedianSortedArrays([], [1])); // Expected: 1.0
console.log(findMedianSortedArrays([1], [])); // Expected: 1.0
console.log(findMedianSortedArrays([2], [])); // Expected: 2.0
console.log(findMedianSortedArrays([], [2,3])); // Expected: 2.5
console.log(findMedianSortedArrays([1, 5, 8, 10, 18], [2, 3, 6, 7])); // Expected: 6.0
console.log(findMedianSortedArrays([1,2,3,4,5], [6,7,8,9,10,11])); // Expected: 6.0
function findMedianSortedArraysLinear(nums1: number[], nums2: number[]): number {
    const totalLength = nums1.length + nums2.length;
    
    // We need to find the element(s) at these positions (0-indexed)
    const medianPos1 = Math.floor((totalLength - 1) / 2);
    const medianPos2 = Math.floor(totalLength / 2);

    let i = 0; // Pointer for nums1
    let j = 0; // Pointer for nums2
    let count = 0; // Current element count
    let medianVal1 = 0; // Value at medianPos1
    let medianVal2 = 0; // Value at medianPos2

    while (count <= medianPos2) {
        let currentNum: number;

        if (i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])) {
            currentNum = nums1[i];
            i++;
        } else {
            currentNum = nums2[j];
            j++;
        }

        if (count === medianPos1) {
            medianVal1 = currentNum;
        }
        if (count === medianPos2) {
            medianVal2 = currentNum;
        }

        count++;
    }

    // If totalLength is odd, medianPos1 and medianPos2 are the same.
    // If totalLength is even, median is average of elements at medianPos1 and medianPos2.
    return (medianVal1 + medianVal2) / 2;
}

// --- Test Cases ---
console.log("\n--- Linear Scan Solution ---");
console.log(findMedianSortedArraysLinear([1, 3], [2])); // Expected: 2.0
console.log(findMedianSortedArraysLinear([1, 2], [3, 4])); // Expected: 2.5
console.log(findMedianSortedArraysLinear([0, 0], [0, 0])); // Expected: 0.0
console.log(findMedianSortedArraysLinear([], [1])); // Expected: 1.0
console.log(findMedianSortedArraysLinear([1], [])); // Expected: 1.0
console.log(findMedianSortedArraysLinear([2], [])); // Expected: 2.0
console.log(findMedianSortedArraysLinear([], [2,3])); // Expected: 2.5
console.log(findMedianSortedArraysLinear([1, 5, 8, 10, 18], [2, 3, 6, 7])); // Expected: 6.0
console.log(findMedianSortedArraysLinear([1,2,3,4,5], [6,7,8,9,10,11])); // Expected: 6.0
