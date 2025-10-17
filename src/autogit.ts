function longestIncreasingSubsequence(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const n = nums.length;
    const dp: number[] = new Array(n).fill(1);
    const prev: number[] = new Array(n).fill(-1);
    
    let maxLength = 1;
    let maxIndex = 0;
    
    // Build DP table
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
                
                if (dp[i] > maxLength) {
                    maxLength = dp[i];
                    maxIndex = i;
                }
            }
        }
    }
    
    // Reconstruct the sequence
    const sequence: number[] = [];
    let current = maxIndex;
    
    while (current !== -1) {
        sequence.unshift(nums[current]);
        current = prev[current];
    }
    
    return sequence;
}

// Example usage
const arr = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(longestIncreasingSubsequence(arr)); // [2, 5, 7, 101] or [2, 3, 7, 101]
function longestIncreasingSubsequenceBS(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const piles: number[][] = [];
    const predecessors: number[] = new Array(nums.length).fill(-1);
    
    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        let left = 0;
        let right = piles.length;
        
        // Binary search to find the leftmost pile where current can be placed
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (piles[mid][piles[mid].length - 1] >= current) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        if (left === piles.length) {
            // Create new pile
            piles.push([current]);
        } else {
            // Add to existing pile
            piles[left].push(current);
        }
        
        // Record predecessor (for reconstruction)
        if (left > 0) {
            predecessors[i] = piles[left - 1][piles[left - 1].length - 1];
        }
    }
    
    // Reconstruct the sequence from the piles
    const result: number[] = [];
    let current = piles[piles.length - 1][0];
    
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] === current) {
            result.unshift(current);
            // Find the predecessor
            if (piles.length > 1) {
                const pileIndex = piles.findIndex(pile => pile.includes(current));
                if (pileIndex > 0) {
                    current = piles[pileIndex - 1][piles[pileIndex - 1].length - 1];
                }
            }
        }
    }
    
    return result;
}
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
interface LISResult {
    length: number;
    sequence: number[];
    indices: number[];
}

function findLongestIncreasingSubsequence(nums: number[]): LISResult {
    if (nums.length === 0) {
        return { length: 0, sequence: [], indices: [] };
    }
    
    const n = nums.length;
    const dp: number[] = new Array(n).fill(1);
    const prev: number[] = new Array(n).fill(-1);
    
    let maxLength = 1;
    let maxIndex = 0;
    
    // Build DP table
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
                
                if (dp[i] > maxLength) {
                    maxLength = dp[i];
                    maxIndex = i;
                }
            }
        }
    }
    
    // Reconstruct sequence and indices
    const sequence: number[] = [];
    const indices: number[] = [];
    let current: number | null = maxIndex;
    
    while (current !== -1 && current !== null) {
        sequence.unshift(nums[current]);
        indices.unshift(current);
        current = prev[current];
    }
    
    return {
        length: maxLength,
        sequence,
        indices
    };
}

// Test the function
const testArray = [10, 9, 2, 5, 3, 7, 101, 18];
const result = findLongestIncreasingSubsequence(testArray);

console.log('Array:', testArray);
console.log('LIS length:', result.length);
console.log('LIS sequence:', result.sequence);
console.log('LIS indices:', result.indices);
// Test with different arrays
const arrays = [
    [1, 3, 2, 4, 5],
    [5, 4, 3, 2, 1],
    [1],
    [],
    [3, 4, -1, 0, 6, 2, 3]
];

arrays.forEach(arr => {
    const result = findLongestIncreasingSubsequence(arr);
    console.log(`Array: ${arr}`);
    console.log(`LIS: ${result.sequence}`);
    console.log('---');
});
