function majorityElement(nums: number[]): number {
    nums.sort((a, b) => a - b);
    return nums[Math.floor(nums.length / 2)];
}

// Example usage
const arr = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(arr)); // Output: 2
function majorityElement(nums: number[]): number {
    let count = 0;
    let candidate = 0;
    
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }
    
    return candidate;
}

// Example usage
const arr = [3, 2, 3];
console.log(majorityElement(arr)); // Output: 3
function majorityElement(nums: number[]): number {
    const frequencyMap: Map<number, number> = new Map();
    
    for (const num of nums) {
        const count = frequencyMap.get(num) || 0;
        frequencyMap.set(num, count + 1);
        
        if (count + 1 > nums.length / 2) {
            return num;
        }
    }
    
    return -1; // No majority element exists
}

// Example usage
const arr = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(arr)); // Output: 2
function findMajorityElement(nums: number[]): number | null {
    // Using Boyer-Moore algorithm
    let count = 0;
    let candidate = 0;
    
    // Phase 1: Find candidate
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }
    
    // Phase 2: Verify candidate is actually majority
    count = 0;
    for (const num of nums) {
        if (num === candidate) {
            count++;
        }
    }
    
    return count > nums.length / 2 ? candidate : null;
}

// Example usage
const testArrays = [
    [3, 2, 3],
    [2, 2, 1, 1, 1, 2, 2],
    [1, 2, 3, 4, 5]
];

testArrays.forEach(arr => {
    const result = findMajorityElement(arr);
    console.log(`Array: [${arr}] -> Majority element: ${result}`);
});
