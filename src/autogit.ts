function majorityElement(nums: number[]): number | null {
    let count = 0;
    let candidate: number | null = null;

    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    // Verify if candidate is actually majority element
    if (candidate !== null) {
        const majorityCount = nums.filter(n => n === candidate).length;
        if (majorityCount > nums.length / 2) {
            return candidate;
        }
    }
    
    return null;
}

// Usage
const arr = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(arr)); // Output: 2
function majorityElementHashMap(nums: number[]): number | null {
    const frequencyMap = new Map<number, number>();
    
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
        
        if (frequencyMap.get(num)! > nums.length / 2) {
            return num;
        }
    }
    
    return null;
}
function majorityElementSorting(nums: number[]): number | null {
    nums.sort();
    const candidate = nums[Math.floor(nums.length / 2)];
    
    // Verify majority
    const count = nums.filter(n => n === candidate).length;
    return count > nums.length / 2 ? candidate : null;
}
interface MajorityElementResult {
    element: number | null;
    count: number;
    isMajority: boolean;
}

function findMajorityElement(nums: number[]): MajorityElementResult {
    if (nums.length === 0) {
        return { element: null, count: 0, isMajority: false };
    }

    // Boyer-Moore Algorithm
    let count = 0;
    let candidate: number = nums[0];

    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    // Count occurrences
    const candidateCount = nums.filter(n => n === candidate).length;
    const isMajority = candidateCount > nums.length / 2;

    return {
        element: isMajority ? candidate : null,
        count: candidateCount,
        isMajority
    };
}

// Usage examples
const testCases = [
    [3, 2, 3],
    [2, 2, 1, 1, 1, 2, 2],
    [1, 2, 3],
    []
];

testCases.forEach(arr => {
    const result = findMajorityElement(arr);
    console.log(`Array: [${arr}]`);
    console.log(`Majority Element: ${result.element}`);
    console.log(`Count: ${result.count}`);
    console.log(`Is Majority: ${result.isMajority}`);
    console.log('---');
});
function majorityElementGeneric<T>(arr: T[]): T | null {
    if (arr.length === 0) return null;
    
    let count = 0;
    let candidate: T = arr[0];

    for (const item of arr) {
        if (count === 0) {
            candidate = item;
        }
        count += (item === candidate) ? 1 : -1;
    }

    // Verify majority
    const candidateCount = arr.filter(item => item === candidate).length;
    return candidateCount > arr.length / 2 ? candidate : null;
}

// Usage with different types
const numbers = [2, 2, 1, 1, 2, 2];
const strings = ["a", "b", "a", "a", "c", "a"];
const booleans = [true, false, true, true];

console.log(majorityElementGeneric(numbers)); // 2
console.log(majorityElementGeneric(strings)); // "a"
console.log(majorityElementGeneric(booleans)); // true
