function kthSmallest(arr: number[], k: number): number | null {
    if (k < 1 || k > arr.length || arr.length === 0) return null;
    // Create a copy to avoid mutating the original array
    const sorted = [...arr].sort((a, b) => a - b);
    return sorted[k - 1];
}

// Example usage:
const arr = [12, 3, 5, 7, 19];
const k = 2;
console.log(kthSmallest(arr, k)); // Output: 3 (2nd smallest element)
function kthSmallestQuickselect(arr: number[], k: number): number | null {
    if (k < 1 || k > arr.length || arr.length === 0) return null;

    const quickselect = (
        nums: number[], 
        left: number, 
        right: number, 
        targetIndex: number
    ): number => {
        if (left === right) return nums[left];

        // Random pivot to avoid worst-case scenarios
        const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
        
        // Partition the array and get the pivot's final position
        const finalPivotIndex = partition(nums, left, right, pivotIndex);
        
        if (finalPivotIndex === targetIndex) {
            return nums[finalPivotIndex];
        } else if (finalPivotIndex < targetIndex) {
            return quickselect(nums, finalPivotIndex + 1, right, targetIndex);
        } else {
            return quickselect(nums, left, finalPivotIndex - 1, targetIndex);
        }
    };

    // Partition helper function (Lomuto scheme)
    const partition = (
        nums: number[], 
        left: number, 
        right: number, 
        pivotIndex: number
    ): number => {
        const pivotValue = nums[pivotIndex];
        // Move pivot to the end
        [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];
        
        let i = left;
        for (let j = left; j < right; j++) {
            if (nums[j] < pivotValue) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        // Move pivot to its final position
        [nums[i], nums[right]] = [nums[right], nums[i]];
        return i;
    };

    // Start the quickselect process
    const result = quickselect([...arr], 0, arr.length - 1, k - 1);
    return result;
}

// Example usage:
console.log(kthSmallestQuickselect([12, 3, 5, 7, 19], 3)); // Output: 5 (3rd smallest)
