function findMajorityElement(nums: number[]): number {
    let candidate: number | null = null;
    let count = 0;
    
    // Phase 1: Find candidate
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }
    
    // Phase 2: Verify the candidate (optional if majority is guaranteed)
    count = 0;
    for (const num of nums) {
        if (num === candidate) {
            count++;
        }
    }
    
    return count > nums.length / 2 ? candidate! : -1;
}

// Example usage
const arr = [2, 2, 1, 1, 1, 2, 2];
console.log(findMajorityElement(arr)); // Output: 2
function findMajorityElementMap(nums: number[]): number {
    const countMap = new Map<number, number>();
    
    // Count frequencies
    for (const num of nums) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    }
    
    // Find majority element
    for (const [num, count] of countMap) {
        if (count > nums.length / 2) {
            return num;
        }
    }
    
    return -1; // No majority element found
}

// Example usage
const arr = [3, 2, 3];
console.log(findMajorityElementMap(arr)); // Output: 3
function findMajorityElementSort(nums: number[]): number {
    // Create a copy if you don't want to modify original array
    const sorted = [...nums].sort((a, b) => a - b);
    const candidate = sorted[Math.floor(sorted.length / 2)];
    
    // Verify (optional if majority is guaranteed)
    const count = sorted.filter(num => num === candidate).length;
    
    return count > nums.length / 2 ? candidate : -1;
}

// Example usage
const arr = [2, 2, 1, 1, 1, 2, 2];
console.log(findMajorityElementSort(arr)); // Output: 2
function findMajorityElementGeneric<T>(arr: T[]): T | null {
    if (arr.length === 0) return null;
    
    let candidate: T | null = null;
    let count = 0;
    
    // Phase 1: Find candidate
    for (const item of arr) {
        if (count === 0) {
            candidate = item;
        }
        count += (item === candidate) ? 1 : -1;
    }
    
    // Phase 2: Verify candidate
    if (candidate === null) return null;
    
    count = 0;
    for (const item of arr) {
        if (item === candidate) {
            count++;
        }
    }
    
    return count > arr.length / 2 ? candidate : null;
}

// Example usage with strings
const stringArr = ["apple", "banana", "apple", "apple", "orange"];
console.log(findMajorityElementGeneric(stringArr)); // Output: "apple"
class MajorityElementFinder {
    /**
     * Finds majority element using Boyer-Moore Voting Algorithm
     * @param nums Array of numbers
     * @returns The majority element or -1 if none exists
     */
    static findMajority(nums: number[]): number {
        if (!nums || nums.length === 0) {
            return -1;
        }
        
        // Phase 1: Find candidate
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
        
        // Phase 2: Verify candidate
        count = 0;
        for (const num of nums) {
            if (num === candidate) {
                count++;
            }
        }
        
        return count > nums.length / 2 ? candidate : -1;
    }
    
    /**
     * Checks if majority element exists
     */
    static hasMajority(nums: number[]): boolean {
        return this.findMajority(nums) !== -1;
    }
}

// Test cases
console.log(MajorityElementFinder.findMajority([3, 2, 3])); // 3
console.log(MajorityElementFinder.findMajority([2, 2, 1, 1, 1, 2, 2])); // 2
console.log(MajorityElementFinder.findMajority([1, 2, 3])); // -1 (no majority)
console.log(MajorityElementFinder.hasMajority([1, 2, 3])); // false
