function secondLargestSort(arr: number[]): number {
    if (arr.length < 2) {
        throw new Error("Array must have at least 2 elements");
    }
    
    // Sort in descending order and get the second element
    const sorted = [...arr].sort((a, b) => b - a);
    return sorted[1];
}

// Usage
const numbers = [10, 5, 8, 20, 15];
console.log(secondLargestSort(numbers)); // Output: 15
function secondLargestSinglePass(arr: number[]): number {
    if (arr.length < 2) {
        throw new Error("Array must have at least 2 elements");
    }
    
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
    
    if (secondLargest === -Infinity) {
        throw new Error("All elements are equal or invalid input");
    }
    
    return secondLargest;
}

// Usage
const numbers = [10, 5, 8, 20, 15];
console.log(secondLargestSinglePass(numbers)); // Output: 15
function secondLargestWithSet(arr: number[]): number {
    if (arr.length < 2) {
        throw new Error("Array must have at least 2 elements");
    }
    
    // Remove duplicates and sort
    const uniqueSorted = [...new Set(arr)].sort((a, b) => b - a);
    
    if (uniqueSorted.length < 2) {
        throw new Error("Array has only unique values or all elements are equal");
    }
    
    return uniqueSorted[1];
}

// Usage
const numbers = [10, 10, 5, 8, 20, 15, 20];
console.log(secondLargestWithSet(numbers)); // Output: 15
function findSecondLargest(arr: number[]): number | null {
    // Input validation
    if (!Array.isArray(arr) || arr.length < 2) {
        return null;
    }
    
    // Handle invalid numbers
    if (arr.some(num => typeof num !== 'number' || isNaN(num))) {
        return null;
    }
    
    let largest = -Infinity;
    let secondLargest = -Infinity;
    
    for (const num of arr) {
        if (num > largest) {
            secondLargest = largest;
            largest = num;
        } else if (num > secondLargest && num !== largest) {
            secondLargest = num;
        }
    }
    
    // Check if second largest was found
    return secondLargest === -Infinity ? null : secondLargest;
}

// Usage examples
console.log(findSecondLargest([10, 5, 8, 20, 15])); // 15
console.log(findSecondLargest([5, 5, 5, 5]));      // null (all equal)
console.log(findSecondLargest([1]));               // null (too short)
