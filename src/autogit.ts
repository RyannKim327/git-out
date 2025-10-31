function findSecondLargest(arr: number[]): number | null {
    if (arr.length < 2) return null;
    
    const sorted = [...arr].sort((a, b) => b - a);
    return sorted[1];
}

// Example usage
const numbers = [10, 5, 8, 20, 15];
console.log(findSecondLargest(numbers)); // Output: 15
function findSecondLargestSinglePass(arr: number[]): number | null {
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

// Example usage
const numbers = [10, 5, 8, 20, 15];
console.log(findSecondLargestSinglePass(numbers)); // Output: 15
function findSecondLargestNoDuplicates(arr: number[]): number | null {
    if (arr.length < 2) return null;
    
    const uniqueNumbers = [...new Set(arr)];
    if (uniqueNumbers.length < 2) return null;
    
    uniqueNumbers.sort((a, b) => b - a);
    return uniqueNumbers[1];
}

// Example with duplicates
const numbers = [10, 10, 5, 8, 20, 20, 15];
console.log(findSecondLargestNoDuplicates(numbers)); // Output: 15
function findSecondLargestReduce(arr: number[]): number | null {
    if (arr.length < 2) return null;
    
    const result = arr.reduce((acc, num) => {
        if (num > acc.largest) {
            acc.secondLargest = acc.largest;
            acc.largest = num;
        } else if (num > acc.secondLargest && num < acc.largest) {
            acc.secondLargest = num;
        }
        return acc;
    }, { largest: -Infinity, secondLargest: -Infinity });
    
    return result.secondLargest !== -Infinity ? result.secondLargest : null;
}

// Example usage
const numbers = [10, 5, 8, 20, 15];
console.log(findSecondLargestReduce(numbers)); // Output: 15
function findSecondLargestComplete(arr: number[]): number | null {
    // Handle edge cases
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    
    if (arr.length < 2) {
        return null;
    }
    
    // Filter out non-numeric values
    const numericArray = arr.filter(item => typeof item === 'number' && !isNaN(item));
    
    if (numericArray.length < 2) {
        return null;
    }
    
    // Use single pass approach for efficiency
    let largest = -Infinity;
    let secondLargest = -Infinity;
    
    for (const num of numericArray) {
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
console.log(findSecondLargestComplete([10, 5, 8, 20, 15])); // 15
console.log(findSecondLargestComplete([1, 1, 1, 1])); // null
console.log(findSecondLargestComplete([5])); // null
console.log(findSecondLargestComplete([20, 10])); // 10
console.log(findSecondLargestComplete([3, 3, 2, 1])); // 2
