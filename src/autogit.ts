function majorityElement(nums: number[]): number | null {
    let candidate: number | null = null;
    let count = 0;

    // First pass: find a candidate
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
    if (candidate !== null) {
        count = 0;
        for (const num of nums) {
            if (num === candidate) {
                count++;
            }
        }
        
        if (count > Math.floor(nums.length / 2)) {
            return candidate;
        }
    }

    return null; // No majority element exists
}

// Example usage
const array1 = [3, 2, 3];
const array2 = [2, 2, 1, 1, 1, 2, 2];
const array3 = [1, 2, 3];

console.log(majorityElement(array1)); // 3
console.log(majorityElement(array2)); // 2
console.log(majorityElement(array3)); // null
function majorityElementHashMap(nums: number[]): number | null {
    const frequencyMap = new Map<number, number>();
    const majorityThreshold = Math.floor(nums.length / 2);

    // Count frequencies
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
        
        // Early exit if we found majority
        if (frequencyMap.get(num)! > majorityThreshold) {
            return num;
        }
    }

    return null;
}
function majorityElementGeneric<T>(arr: T[]): T | null {
    let candidate: T | null = null;
    let count = 0;

    // First pass: find candidate
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

    // Second pass: verify candidate
    if (candidate !== null) {
        const occurrences = arr.filter(item => item === candidate).length;
        if (occurrences > Math.floor(arr.length / 2)) {
            return candidate;
        }
    }

    return null;
}

// Example with strings
const stringArray = ["apple", "banana", "apple", "apple", "cherry"];
console.log(majorityElementGeneric(stringArray)); // "apple"
function majorityElementSimple(nums: number[]): number | null {
    const frequencyMap = new Map<number, number>();
    
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    for (const [num, count] of frequencyMap) {
        if (count > Math.floor(nums.length / 2)) {
            return num;
        }
    }

    return null;
}
class MajorityElementFinder {
    /**
     * Finds majority element using Boyer-Moore algorithm (most efficient)
     * Time: O(n), Space: O(1)
     */
    static boyerMoore<T>(arr: T[]): T | null {
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

        // Verify candidate
        if (candidate !== null) {
            const occurrences = arr.filter(item => item === candidate).length;
            if (occurrences > Math.floor(arr.length / 2)) {
                return candidate;
            }
        }

        return null;
    }

    /**
     * Finds majority element using hash map
     * Time: O(n), Space: O(n)
     */
    static hashMap<T>(arr: T[]): T | null {
        const frequencyMap = new Map<T, number>();
        const threshold = Math.floor(arr.length / 2);

        for (const item of arr) {
            const count = (frequencyMap.get(item) || 0) + 1;
            frequencyMap.set(item, count);

            if (count > threshold) {
                return item;
            }
        }

        return null;
    }

    /**
     * Finds all elements that appear more than n/k times
     */
    static nOverKElements<T>(arr: T[], k: number): T[] {
        const frequencyMap = new Map<T, number>();
        const threshold = Math.floor(arr.length / k);
        const result: T[] = [];

        for (const item of arr) {
            frequencyMap.set(item, (frequencyMap.get(item) || 0) + 1);
        }

        for (const [item, count] of frequencyMap) {
            if (count > threshold) {
                result.push(item);
            }
        }

        return result;
    }
}

// Usage examples
const testArray = [1, 2, 3, 2, 2, 4, 2];

console.log(MajorityElementFinder.boyerMoore(testArray)); // 2
console.log(MajorityElementFinder.hashMap(testArray));    // 2
console.log(MajorityElementFinder.nOverKElements(testArray, 3)); // [2]
