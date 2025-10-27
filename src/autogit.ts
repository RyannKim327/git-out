function majorityElement(nums: number[]): number | null {
    let candidate: number | null = null;
    let count = 0;

    // First pass: find potential candidate
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
            count = 1;
        } else if (num === candidate) {
            count++;
        } else {
            count--;
        }
    }

    // Second pass: verify the candidate
    if (candidate === null) return null;
    
    const frequency = nums.filter(num => num === candidate).length;
    
    if (frequency > nums.length / 2) {
        return candidate;
    }
    
    return null;
}

// Example usage
const arr = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(arr)); // Output: 2
function majorityElementHashMap(nums: number[]): number | null {
    const frequencyMap = new Map<number, number>();
    const majorityThreshold = nums.length / 2;

    // Count frequencies
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
        
        // Early return if we find majority element
        if (frequencyMap.get(num)! > majorityThreshold) {
            return num;
        }
    }

    return null;
}

// Example usage
console.log(majorityElementHashMap([3, 2, 3])); // Output: 3
function majorityElementSorting(nums: number[]): number | null {
    nums.sort((a, b) => a - b);
    const candidate = nums[Math.floor(nums.length / 2)];
    
    // Verify the candidate
    const frequency = nums.filter(num => num === candidate).length;
    
    if (frequency > nums.length / 2) {
        return candidate;
    }
    
    return null;
}

// Example usage
console.log(majorityElementSorting([1, 2, 2, 2, 3])); // Output: 2
interface MajorityElementResult {
    element: number | null;
    frequency: number;
    isMajority: boolean;
}

function findMajorityElement(nums: number[]): MajorityElementResult {
    if (nums.length === 0) {
        return { element: null, frequency: 0, isMajority: false };
    }

    // Boyer-Moore algorithm
    let candidate: number = nums[0];
    let count = 1;

    for (let i = 1; i < nums.length; i++) {
        if (count === 0) {
            candidate = nums[i];
            count = 1;
        } else if (nums[i] === candidate) {
            count++;
        } else {
            count--;
        }
    }

    // Verify candidate
    const frequency = nums.filter(num => num === candidate).length;
    const isMajority = frequency > nums.length / 2;

    return {
        element: isMajority ? candidate : null,
        frequency,
        isMajority
    };
}

// Example usage
const testCases = [
    [2, 2, 1, 1, 1, 2, 2],
    [3, 2, 3],
    [1, 2, 3, 4, 5],
    [1],
    []
];

testCases.forEach((testCase, index) => {
    const result = findMajorityElement(testCase);
    console.log(`Test case ${index + 1}:`, result);
});
