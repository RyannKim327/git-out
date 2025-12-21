function majorityElement(nums: number[]): number | null {
    let candidate: number | null = null;
    let count = 0;
    
    // First pass: find candidate
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
    
    // Second pass: verify candidate
    if (candidate === null) return null;
    
    count = 0;
    for (const num of nums) {
        if (num === candidate) {
            count++;
        }
    }
    
    return count > nums.length / 2 ? candidate : null;
}

// Example usage
const arr = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(arr)); // 2

const arr2 = [3, 2, 3];
console.log(majorityElement(arr2)); // 3

const arr3 = [1, 2, 3];
console.log(majorityElement(arr3)); // null (no majority)
function majorityElementHashMap(nums: number[]): number | null {
    const countMap = new Map<number, number>();
    const majorityThreshold = nums.length / 2;
    
    // Count occurrences
    for (const num of nums) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    }
    
    // Find majority element
    for (const [num, count] of countMap) {
        if (count > majorityThreshold) {
            return num;
        }
    }
    
    return null;
}
function majorityElementSorting(nums: number[]): number | null {
    const sorted = [...nums].sort((a, b) => a - b);
    const candidate = sorted[Math.floor(nums.length / 2)];
    
    // Verify the candidate
    const count = sorted.filter(num => num === candidate).length;
    return count > nums.length / 2 ? candidate : null;
}
function majorityElementGeneric<T>(nums: T[]): T | null {
    let candidate: T | null = null;
    let count = 0;
    
    // First pass: find candidate
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
    
    // Second pass: verify candidate
    if (candidate === null) return null;
    
    count = 0;
    for (const num of nums) {
        if (num === candidate) {
            count++;
        }
    }
    
    return count > nums.length / 2 ? candidate : null;
}

// Example with strings
const stringArr = ["apple", "banana", "apple", "apple", "cherry"];
console.log(majorityElementGeneric(stringArr)); // "apple"
function majorityElements(nums: number[]): number[] {
    const result: number[] = [];
    const countMap = new Map<number, number>();
    const majorityThreshold = nums.length / 3; // For n/3 case
    
    for (const num of nums) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    }
    
    for (const [num, count] of countMap) {
        if (count > majorityThreshold) {
            result.push(num);
        }
    }
    
    return result;
}

// Example: Find elements that appear more than n/3 times
console.log(majorityElements([1, 1, 1, 3, 3, 2, 2, 2])); // [1, 2]
