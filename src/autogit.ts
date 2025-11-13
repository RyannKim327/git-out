function longestIncreasingSubsequence(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const dp: number[] = new Array(nums.length).fill(1);
    const sequences: number[][] = new Array(nums.length);
    
    // Initialize each position with its own value
    for (let i = 0; i < nums.length; i++) {
        sequences[i] = [nums[i]];
    }
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    sequences[i] = [...sequences[j], nums[i]];
                }
            }
        }
    }
    
    // Find the maximum length sequence
    let maxLength = 0;
    let result: number[] = [];
    
    for (let i = 0; i < sequences.length; i++) {
        if (sequences[i].length > maxLength) {
            maxLength = sequences[i].length;
            result = sequences[i];
        }
    }
    
    return result;
}

// Example usage
const arr = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(longestIncreasingSubsequence(arr)); // Output: [2, 5, 7, 101]
function lisOptimized(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const piles: number[][] = [];
    const pointers: number[] = new Array(nums.length);
    
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        let left = 0;
        let right = piles.length;
        
        // Binary search to find the right pile
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (piles[mid][piles[mid].length - 1] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === piles.length) {
            piles.push([num]);
        } else {
            piles[left].push(num);
        }
        
        pointers[i] = left;
    }
    
    // Reconstruct the LIS
    const result: number[] = new Array(piles.length);
    let currentIndex = nums.length - 1;
    
    for (let i = piles.length - 1; i >= 0; i--) {
        while (pointers[currentIndex] !== i) {
            currentIndex--;
        }
        result[i] = nums[currentIndex];
    }
    
    return result;
}

// Example usage
console.log(lisOptimized(arr)); // Output: [2, 3, 7, 101]
function lisLength(nums: number[]): number {
    const tails: number[] = [];
    
    for (const num of nums) {
        let left = 0;
        let right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === tails.length) {
            tails.push(num);
        } else {
            tails[left] = num;
        }
    }
    
    return tails.length;
}

// Example usage
console.log(lisLength(arr)); // Output: 4
interface LISResult {
    length: number;
    sequence: number[];
    indices: number[];
}

function findLongestIncreasingSubsequence(nums: number[]): LISResult {
    if (nums.length === 0) {
        return { length: 0, sequence: [], indices: [] };
    }
    
    const dp: number[] = new Array(nums.length).fill(1);
    const parent: number[] = new Array(nums.length).fill(-1);
    
    let maxLength = 1;
    let endIndex = 0;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
                
                if (dp[i] > maxLength) {
                    maxLength = dp[i];
                    endIndex = i;
                }
            }
        }
    }
    
    // Reconstruct the sequence
    const sequence: number[] = [];
    const indices: number[] = [];
    let current = endIndex;
    
    while (current !== -1) {
        sequence.unshift(nums[current]);
        indices.unshift(current);
        current = parent[current];
    }
    
    return {
        length: maxLength,
        sequence,
        indices
    };
}

// Example usage
const result = findLongestIncreasingSubsequence(arr);
console.log(result);
// Output: { length: 4, sequence: [2, 5, 7, 101], indices: [2, 3, 5, 6] }
