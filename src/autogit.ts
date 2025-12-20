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
    
    // Verify if the candidate is indeed the majority element
    if (candidate !== null) {
        const frequency = nums.filter(x => x === candidate).length;
        if (frequency > nums.length / 2) {
            return candidate;
        }
    }
    
    return null;
}
function majorityElementHashMap(nums: number[]): number | null {
    const frequencyMap = new Map<number, number>();
    const threshold = nums.length / 2;
    
    for (const num of nums) {
        const count = (frequencyMap.get(num) || 0) + 1;
        frequencyMap.set(num, count);
        
        if (count > threshold) {
            return num;
        }
    }
    
    return null;
}
function majorityElementSorting(nums: number[]): number | null {
    nums.sort((a, b) => a - b);
    const candidate = nums[Math.floor(nums.length / 2)];
    
    // Verify the candidate
    const frequency = nums.filter(x => x === candidate).length;
    if (frequency > nums.length / 2) {
        return candidate;
    }
    
    return null;
}
function majorityElementGeneric<T>(arr: T[]): T | null {
    let candidate: T | null = null;
    let count = 0;
    
    for (const item of arr) {
        if (count === 0) {
            candidate = item;
            count = 1;
        } else if (item === candidate) {
            count++;
        } else {
            count--;
        }
    }
    
    // Verification
    if (candidate !== null) {
        const frequency = arr.filter(x => x === candidate).length;
        if (frequency > arr.length / 2) {
            return candidate;
        }
    }
    
    return null;
}
// Test cases
const testArray1 = [3, 2, 3];
const testArray2 = [2, 2, 1, 1, 1, 2, 2];
const testArray3 = [1, 2, 3]; // No majority element

console.log(majorityElement(testArray1)); // Output: 3
console.log(majorityElement(testArray2)); // Output: 2
console.log(majorityElement(testArray3)); // Output: null

// Using generic version
const stringArray = ["a", "b", "a", "a", "c", "a"];
console.log(majorityElementGeneric(stringArray)); // Output: "a"
