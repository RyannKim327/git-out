function lengthOfLIS(nums: number[]): number {
    if (nums.length === 0) return 0;

    const dp: number[] = []; // This will store the smallest tail of all increasing subsequences

    for (const num of nums) {
        // Use binary search to find the insertion point of num in dp
        let left = 0;
        let right = dp.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (dp[mid] < num) {
                left = mid + 1; // Move right
            } else {
                right = mid; // Move left
            }
        }

        // If left is equal to the length of dp, it means num is greater than all elements in dp
        if (left === dp.length) {
            dp.push(num); // Extend the size of dp
        } else {
            dp[left] = num; // Replace the existing value
        }
    }

    return dp.length; // The length of dp is the length of the longest increasing subsequence
}

// Example usage:
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums)); // Output: 4
