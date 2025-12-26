function majorityElement(nums: number[]): number | null {
    let candidate: number | null = null;
    let count = 0;

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

    // Verify if candidate is actually majority
    if (candidate !== null) {
        const majorityThreshold = Math.floor(nums.length / 2);
        const candidateCount = nums.filter(n => n === candidate).length;
        
        if (candidateCount > majorityThreshold) {
            return candidate;
        }
    }

    return null;
}

// Usage
const array = [2, 2, 1, 1, 1, 2, 2];
const result = majorityElement(array);
console.log(result); // Output: 2
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
    nums.sort((a, b) => a - b);
    const majorityThreshold = Math.floor(nums.length / 2);
    const candidate = nums[majorityThreshold];
    
    // Verify candidate
    const candidateCount = nums.filter(n => n === candidate).length;
    
    if (candidateCount > majorityThreshold) {
        return candidate;
    }
    
    return null;
}
function findMajorityElement<T>(arr: T[]): T | null {
    if (arr.length === 0) return null;

    let candidate: T = arr[0];
    let count = 1;

    for (let i = 1; i < arr.length; i++) {
        if (count === 0) {
            candidate = arr[i];
            count = 1;
        } else if (arr[i] === candidate) {
            count++;
        } else {
            count--;
        }
    }

    // Verify candidate
    const majorityThreshold = Math.floor(arr.length / 2);
    const candidateCount = arr.filter(item => item === candidate).length;
    
    return candidateCount > majorityThreshold ? candidate : null;
}

// Usage examples
const numbers = [3, 2, 3];
const strings = ["a", "b", "a", "a", "c", "a"];
const noMajority = [1, 2, 3, 4, 5];

console.log(findMajorityElement(numbers)); // Output: 3
console.log(findMajorityElement(strings)); // Output: "a"
console.log(findMajorityElement(noMajority)); // Output: null
