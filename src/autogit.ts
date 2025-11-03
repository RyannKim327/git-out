function findSecondLargest(arr: number[]): number | null {
    if (arr.length < 2) return null;
    
    const uniqueSorted = [...new Set(arr)].sort((a, b) => b - a);
    return uniqueSorted[1] || null;
}

// Usage
const numbers = [12, 35, 1, 10, 34, 1];
console.log(findSecondLargest(numbers)); // 34
function findSecondLargestOptimized(arr: number[]): number | null {
    if (arr.length < 2) return null;
    
    let largest = -Infinity;
    let secondLargest = -Infinity;
    
    for (const num of arr) {
        if (num > largest) {
            secondLargest = largest;
            largest = num;
        } else if (num > secondLargest && num < largest) {
            secondLargest = num;
        }
    }
    
    return secondLargest !== -Infinity ? secondLargest : null;
}

// Usage
const numbers = [12, 35, 1, 10, 34, 1];
console.log(findSecondLargestOptimized(numbers)); // 34
function findSecondLargestGeneric<T>(arr: T[]): T | null {
    if (arr.length < 2) return null;
    
    const sorted = [...arr].sort((a: any, b: any) => {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    });
    
    return sorted[1] || null;
}

// Usage with different types
const numbers = [12, 35, 1, 10, 34, 1];
const strings = ['apple', 'banana', 'cherry', 'date'];
console.log(findSecondLargestGeneric(numbers)); // 34
console.log(findSecondLargestGeneric(strings)); // 'cherry'
const findSecondLargestShort = (arr: number[]): number | undefined => {
    return [...new Set(arr)].sort((a, b) => b - a)[1];
};

// Usage
const numbers = [12, 35, 1, 10, 34, 1];
console.log(findSecondLargestShort(numbers)); // 34
function findSecondLargestWithValidation(arr: number[]): number | null {
    // Input validation
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    
    if (arr.length < 2) {
        return null;
    }
    
    // Filter out non-numbers and handle edge cases
    const validNumbers = arr.filter(num => typeof num === 'number' && !isNaN(num));
    
    if (validNumbers.length < 2) {
        return null;
    }
    
    // Single pass approach
    let largest = -Infinity;
    let secondLargest = -Infinity;
    
    for (const num of validNumbers) {
        if (num > largest) {
            secondLargest = largest;
            largest = num;
        } else if (num > secondLargest && num < largest) {
            secondLargest = num;
        }
    }
    
    return secondLargest !== -Infinity ? secondLargest : null;
}

// Test cases
console.log(findSecondLargestWithValidation([12, 35, 1, 10, 34, 1])); // 34
console.log(findSecondLargestWithValidation([10, 10, 10])); // null
console.log(findSecondLargestWithValidation([5])); // null
console.log(findSecondLargestWithValidation([3, 2, 1])); // 2
