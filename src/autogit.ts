function majorityElement(nums: number[]): number | null {
    let candidate: number | null = null;
    let count = 0;

    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    // Verify if candidate is actually majority
    count = 0;
    for (const num of nums) {
        if (num === candidate) count++;
    }

    return count > nums.length / 2 ? candidate : null;
}

// Example usage:
const arr = [2, 2, 1, 1, 1, 2, 2];
const result = majorityElement(arr);
console.log(result); // Output: 2
function majorityElementHashMap(nums: number[]): number | null {
    const frequencyMap: Map<number, number> = new Map();
    
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    
    const threshold = nums.length / 2;
    for (const [num, count] of frequencyMap) {
        if (count > threshold) {
            return num;
        }
    }
    
    return null;
}
function majorityElementSorting(nums: number[]): number | null {
    nums.sort();
    const candidate = nums[Math.floor(nums.length / 2)];
    
    // Verify
    let count = 0;
    for (const num of nums) {
        if (num === candidate) count++;
    }
    
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

    // Boyer-Moore algorithm
    let candidate: number = nums[0];
    let count = 0;

    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    // Count occurrences of candidate
    const candidateCount = nums.filter(n => n === candidate).length;
    const isMajority = candidateCount > nums.length / 2;

    return {
        element: isMajority ? candidate : null,
        count: candidateCount,
        isMajority
    };
}

// Usage example
const numbers = [3, 2, 3];
const result = findMajorityElement(numbers);

if (result.isMajority) {
    console.log(`Majority element: ${result.element} (appears ${result.count} times)`);
} else {
    console.log("No majority element found");
}
// Test cases
console.log(majorityElement([])); // null
console.log(majorityElement([1])); // 1
console.log(majorityElement([1, 2, 3])); // null (no majority)
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
