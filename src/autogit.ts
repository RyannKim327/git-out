function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Ensure nums1 is the smaller array
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let low = 0;
    let high = m;

    while (low <= high) {
        const i = Math.floor((low + high) / 2); // Partition in nums1
        const j = Math.floor((m + n + 1) / 2) - i; // Partition in nums2

        const nums1LeftMax = i === 0 ? -Infinity : nums1[i - 1];
        const nums1RightMin = i === m ? Infinity : nums1[i];
        const nums2LeftMax = j === 0 ? -Infinity : nums2[j - 1];
        const nums2RightMin = j === n ? Infinity : nums2[j];

        if (nums1LeftMax <= nums2RightMin && nums2LeftMax <= nums1RightMin) {
            // Correct partition found
            if ((m + n) % 2 === 0) {
                // Even total length
                return (
                    Math.max(nums1LeftMax, nums2LeftMax) +
                    Math.min(nums1RightMin, nums2RightMin)
                ) / 2;
            } else {
                // Odd total length
                return Math.max(nums1LeftMax, nums2LeftMax);
            }
        } else if (nums1LeftMax > nums2RightMin) {
            high = i - 1; // Move partition in nums1 left
        } else {
            low = i + 1; // Move partition in nums1 right
        }
    }
    
    throw new Error("Input arrays are not sorted or invalid");
}

// Example usage:
const arr1 = [1, 3, 8];
const arr2 = [7, 9, 10, 11];

console.log(findMedianSortedArrays(arr1, arr2)); // Output: 8
