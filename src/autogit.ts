function longestIncreasingSubsequenceDP(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const n = nums.length;
    const dp: number[] = new Array(n).fill(1);
    const prev: number[] = new Array(n).fill(-1);
    
    // Build DP table
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
    }
    
    // Find the longest sequence
    let maxLength = 0;
    let endIndex = 0;
    for (let i = 0; i < n; i++) {
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            endIndex = i;
        }
    }
    
    // Reconstruct the subsequence
    const result: number[] = [];
    let current = endIndex;
    while (current !== -1) {
        result.unshift(nums[current]);
        current = prev[current];
    }
    
    return result;
}
function longestIncreasingSubsequence(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const n = nums.length;
    const parent: number[] = new Array(n).fill(-1);
    const increasingSub: number[] = []; // stores indices
    const position: number[] = []; // stores positions
    
    for (let i = 0; i < n; i++) {
        const num = nums[i];
        let left = 0;
        let right = increasingSub.length;
        
        // Binary search to find insertion point
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[increasingSub[mid]] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === increasingSub.length) {
            increasingSub.push(i);
        } else {
            increasingSub[left] = i;
        }
        
        position.push(left);
        
        // Track parent for reconstruction
        if (left > 0) {
            parent[i] = increasingSub[left - 1];
        }
    }
    
    // Reconstruct the LIS
    const result: number[] = [];
    let current = increasingSub[increasingSub.length - 1];
    for (let i = increasingSub.length - 1; i >= 0; i--) {
        result.unshift(nums[current]);
        current = parent[current];
    }
    
    return result;
}
interface Comparable {
    valueOf(): number;
}

function longestIncreasingSubsequenceGeneric<T extends Comparable>(
    arr: T[]
): T[] {
    if (arr.length === 0) return [];
    
    const n = arr.length;
    const parent: number[] = new Array(n).fill(-1);
    const increasingSub: number[] = [];
    
    for (let i = 0; i < n; i++) {
        const current = arr[i];
        let left = 0;
        let right = increasingSub.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[increasingSub[mid]].valueOf() < current.valueOf()) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === increasingSub.length) {
            increasingSub.push(i);
        } else {
            increasingSub[left] = i;
        }
        
        if (left > 0) {
            parent[i] = increasingSub[left - 1];
        }
    }
    
    const result: T[] = [];
    let currentIdx = increasingSub[increasingSub.length - 1];
    for (let i = increasingSub.length - 1; i >= 0; i--) {
        result.unshift(arr[currentIdx]);
        currentIdx = parent[currentIdx];
    }
    
    return result;
}
// Test the functions
const testCases = [
    [10, 9, 2, 5, 3, 7, 101, 18],
    [0, 1, 0, 3, 2, 3],
    [7, 7, 7, 7, 7, 7, 7],
    [1],
    []
];

console.log("Testing LIS algorithms:");
testCases.forEach((nums, i) => {
    console.log(`Test case ${i + 1}: [${nums}]`);
    console.log("DP O(n²):", longestIncreasingSubsequenceDP(nums));
    console.log("Binary Search O(n log n):", longestIncreasingSubsequence(nums));
    console.log("---");
});

// Testing generic version with custom objects
class CustomNumber implements Comparable {
    constructor(public value: number) {}
    valueOf(): number {
        return this.value;
    }
}

const customArray = [
    new CustomNumber(10),
    new CustomNumber(9),
    new CustomNumber(2),
    new CustomNumber(5),
    new CustomNumber(3),
    new CustomNumber(7),
    new CustomNumber(101),
    new CustomNumber(18)
];

console.log("Generic version result:");
console.log(longestIncreasingSubsequenceGeneric(customArray).map(x => x.value));
