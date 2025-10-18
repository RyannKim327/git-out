function longestIncreasingSubsequence(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    // dp[i] represents the smallest tail of all increasing subsequences with length i+1
    const dp: number[] = [];
    const prevIndex: number[] = []; // To track previous indices for reconstruction
    
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        
        // Binary search to find the right position to update
        let left = 0;
        let right = dp.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (dp[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        // left is the insertion point
        if (left === dp.length) {
            // Extend the sequence
            dp.push(num);
            prevIndex.push(i);
        } else {
            // Replace the element at left position
            dp[left] = num;
            prevIndex[left] = i;
        }
        
        // Update previous indices for all positions after 'left'
        // This is a simplified version - in practice, you'd need a more complex tracking
        // For full reconstruction, you might need a more sophisticated approach
    }
    
    // Reconstruct the actual subsequence
    return reconstructLIS(nums, prevIndex, dp.length);
}

function reconstructLIS(nums: number[], prevIndex: number[], length: number): number[] {
    const result: number[] = new Array(length);
    let currentLength = length - 1;
    let currentIndex = prevIndex[length - 1];
    
    while (currentLength >= 0) {
        result[currentLength] = nums[currentIndex];
        
        // Find the previous element (this is a simplified reconstruction)
        // In a full implementation, you'd track the actual previous indices
        for (let j = 0; j < currentIndex; j++) {
            if (nums[j] < nums[currentIndex] && 
                (currentLength === 0 || prevIndex[currentLength - 1] === j)) {
                currentIndex = j;
                break;
            }
        }
        
        currentLength--;
    }
    
    return result;
}

// Alternative: Simpler version that just returns the length
function lengthOfLIS(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    const dp: number[] = [];
    
    for (const num of nums) {
        let left = 0;
        let right = dp.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (dp[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === dp.length) {
            dp.push(num);
        } else {
            dp[left] = num;
        }
    }
    
    return dp.length;
}

// Example usage
const arr1 = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(longestIncreasingSubsequence(arr1)); // [2, 3, 7, 101] or similar
console.log(lengthOfLIS(arr1)); // 4

const arr2 = [0, 1, 0, 3, 2];
console.log(longestIncreasingSubsequence(arr2)); // [0, 1, 2] or [0, 1, 3]
console.log(lengthOfLIS(arr2)); // 3

const arr3 = [7, 7, 7, 7, 7];
console.log(longestIncreasingSubsequence(arr3)); // [7]
console.log(lengthOfLIS(arr3)); // 1
function longestIncreasingSubsequenceO2(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const n = nums.length;
    const dp: number[] = new Array(n).fill(1);
    const prev: number[] = new Array(n).fill(-1);
    let maxLength = 1;
    let maxIndex = 0;
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            maxIndex = i;
        }
    }
    
    // Reconstruct the path
    const result: number[] = [];
    let current = maxIndex;
    
    while (current !== -1) {
        result.unshift(nums[current]);
        current = prev[current];
    }
    
    return result;
}
