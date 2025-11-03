function majorityElement(nums: number[]): number | null {
    let candidate = nums[0];
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

    // Verify if candidate is actually majority
    const majorityThreshold = Math.floor(nums.length / 2);
    const candidateCount = nums.filter(num => num === candidate).length;
    
    return candidateCount > majorityThreshold ? candidate : null;
}

// Usage
const array = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(array)); // Output: 2
function majorityElementHashMap(nums: number[]): number | null {
    const frequencyMap = new Map<number, number>();
    const majorityThreshold = Math.floor(nums.length / 2);

    for (const num of nums) {
        const count = (frequencyMap.get(num) || 0) + 1;
        frequencyMap.set(num, count);
        
        if (count > majorityThreshold) {
            return num;
        }
    }

    return null;
}
function majorityElementSorting(nums: number[]): number | null {
    nums.sort();
    const majorityThreshold = Math.floor(nums.length / 2);
    const candidate = nums[majorityThreshold];
    
    // Verify candidate
    const count = nums.filter(num => num === candidate).length;
    return count > majorityThreshold ? candidate : null;
}
function findMajorityElement<T>(array: T[]): T | null {
    if (array.length === 0) return null;
    
    let candidate = array[0];
    let count = 1;

    // Find potential candidate
    for (let i = 1; i < array.length; i++) {
        if (count === 0) {
            candidate = array[i];
            count = 1;
        } else if (array[i] === candidate) {
            count++;
        } else {
            count--;
        }
    }

    // Verify candidate
    const majorityThreshold = Math.floor(array.length / 2);
    const candidateCount = array.filter(item => item === candidate).length;
    
    return candidateCount > majorityThreshold ? candidate : null;
}

// Generic version with custom equality check
function findMajorityElementGeneric<T>(
    array: T[],
    equals: (a: T, b: T) => boolean = (a, b) => a === b
): T | null {
    if (array.length === 0) return null;
    
    let candidate = array[0];
    let count = 1;

    for (let i = 1; i < array.length; i++) {
        if (count === 0) {
            candidate = array[i];
            count = 1;
        } else if (equals(array[i], candidate)) {
            count++;
        } else {
            count--;
        }
    }

    // Verification
    const majorityThreshold = Math.floor(array.length / 2);
    const candidateCount = array.filter(item => equals(item, candidate)).length;
    
    return candidateCount > majorityThreshold ? candidate : null;
}
// Number array
const numbers = [3, 2, 3];
console.log(majorityElement(numbers)); // 3

// String array
const strings = ["apple", "banana", "apple", "apple"];
console.log(findMajorityElement(strings)); // "apple"

// Array with no majority
const noMajority = [1, 2, 3, 4];
console.log(majorityElement(noMajority)); // null

// Empty array
console.log(majorityElement([])); // null
