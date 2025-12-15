function longestIncreasingSubsequence(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const n = nums.length;
    const tails: number[] = [];  // Stores the smallest tail of all increasing subsequences
    const prev: number[] = new Array(n).fill(-1);  // For reconstructing the sequence
    const indices: number[] = [];  // Stores indices for tails
    
    for (let i = 0; i < n; i++) {
        const num = nums[i];
        
        // Binary search for the position to insert/replace
        let left = 0;
        let right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[tails[mid]] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === tails.length) {
            tails.push(i);
            if (tails.length > 1) {
                prev[i] = tails[tails.length - 2];
            }
        } else {
            tails[left] = i;
            if (left > 0) {
                prev[i] = tails[left - 1];
            }
        }
    }
    
    // Reconstruct the actual sequence
    const result: number[] = [];
    let current = tails[tails.length - 1];
    
    while (current !== -1) {
        result.push(nums[current]);
        current = prev[current];
    }
    
    return result.reverse();
}

// Example usage:
const arr = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(longestIncreasingSubsequence(arr)); // Output: [2, 3, 7, 18]
function longestIncreasingSubsequenceDP(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const n = nums.length;
    const dp: number[] = new Array(n).fill(1);  // Length of LIS ending at each index
    const prev: number[] = new Array(n).fill(-1);  // Previous index in the sequence
    
    let maxLength = 1;
    let endIndex = 0;
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
                
                if (dp[i] > maxLength) {
                    maxLength = dp[i];
                    endIndex = i;
                }
            }
        }
    }
    
    // Reconstruct the sequence
    const result: number[] = [];
    let current = endIndex;
    
    while (current !== -1) {
        result.push(nums[current]);
        current = prev[current];
    }
    
    return result.reverse();
}

// Example usage:
console.log(longestIncreasingSubsequenceDP(arr)); // Output: [2, 3, 7, 18]
function lisLength(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    const dp: number[] = new Array(nums.length).fill(1);
    let maxLength = 1;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLength = Math.max(maxLength, dp[i]);
    }
    
    return maxLength;
}

// Example usage:
console.log(lisLength(arr)); // Output: 4
interface LISResult<T> {
    length: number;
    sequence: T[];
}

function longestIncreasingSubsequenceGeneric<T>(
    array: T[],
    compareFn: (a: T, b: T) => boolean = (a, b) => a < b
): LISResult<T> {
    if (array.length === 0) {
        return { length: 0, sequence: [] };
    }
    
    const n = array.length;
    const tails: number[] = [];
    const prev: number[] = new Array(n).fill(-1);
    
    for (let i = 0; i < n; i++) {
        let left = 0;
        let right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (compareFn(array[tails[mid]], array[i])) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === tails.length) {
            tails.push(i);
            if (tails.length > 1) {
                prev[i] = tails[tails.length - 2];
            }
        } else {
            tails[left] = i;
            if (left > 0) {
                prev[i] = tails[left - 1];
            }
        }
    }
    
    // Reconstruct sequence
    const sequence: T[] = [];
    let current = tails[tails.length - 1];
    
    while (current !== -1) {
        sequence.push(array[current]);
        current = prev[current];
    }
    
    return {
        length: tails.length,
        sequence: sequence.reverse()
    };
}

// Example usage with custom objects:
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 20 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 22 },
    { name: "David", age: 30 }
];

const result = longestIncreasingSubsequenceGeneric(
    people,
    (a, b) => a.age < b.age
);

console.log(result);
// Output: { length: 3, sequence: [{ name: "Alice", age: 20 }, { name: "Charlie", age: 22 }, { name: "David", age: 30 }] }
// Test with large array
function generateTestData(size: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
}

const largeArray = generateTestData(10000);

console.time("O(n log n) method");
const result1 = longestIncreasingSubsequence(largeArray);
console.timeEnd("O(n log n) method");

console.time("O(n²) method");
const result2 = longestIncreasingSubsequenceDP(largeArray);
console.timeEnd("O(n²) method");

console.log("Length:", result1.length);
